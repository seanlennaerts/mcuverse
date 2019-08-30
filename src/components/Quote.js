import React, { Component } from 'react';
import { Modal } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';

import ReactGA from "react-ga";

import '../styles/Quote.scss';
import * as clipboard from "clipboard-polyfill";

class Quote extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickModal = this.handleClickModal.bind(this);

    this.state = {
      showModal: props.showModal,
    };
  }

  handleClick(purpose) {
    const buildCopyTextFor = (purpose) => {
      const quote = this.props.sub.join(' ');
      switch(purpose) {
        case "reddit":
          ReactGA.event({
            category: 'mcu',
            action: 'share reddit',
            label: `${this.props.movieId}-${this.props.subIndex}`
          });
          return `${quote} [(*${this.props.title} ${this.props.time}*)](https://${window.location.hostname}/mcuverse/?movie=${this.props.movieId}&quoteIndex=${this.props.subIndex})`;
        default:
          ReactGA.event({
            category: 'mcu',
            action: 'share default',
            label: `${this.props.movieId}-${this.props.subIndex}` 
          });
          return `${quote} (${this.props.title} ${this.props.time})`;
      }
    };

    clipboard.writeText(buildCopyTextFor(purpose));
    this.props.handle(true);
    setTimeout(() => {
      this.props.handle(false);
    }, 1500);
    this.setState({
      showModal: false,
    });
  }

  handleClickModal() {
    if (!this.state.showModal) { // protect from double firing
      ReactGA.event({
        category: 'mcu',
        action: 'open modal',
        label: `${this.props.movieId}-${this.props.subIndex}` 
      });
    }
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    const {
      sub,
      context,
      search,
      title,
      time,
    } = this.props;

    const {
      showModal,
    } = this.state;

    let jSub = sub.join(' ');
    let index = jSub.toLowerCase().indexOf(search);

    const SubWheel = (props) => {

      const buildLines = (subs) => {
        return subs.map((line, index) => {
          return <li key={index}><span>{line.sub.join(' ')}</span><span>{line.time}</span></li>
        });
      };
    
      return (
        <div className="subWheel">
          <div className="preContextWrapper">
            <ul className="preContext">
              {buildLines(props.context.prev)}
            </ul>
          </div>
          <p className="quoteModal" onClick={props.onClick}>
            <span>{props.quote.join(' ')}</span>
            <span>— <i>{props.title} {props.timestamp}</i></span>
          </p>
          <div className="postContextWrapper">
            <ul className="postContext">
              {buildLines(props.context.post)}
            </ul>
          </div>
    
        </div>
    
      );
    };

    const ShareBar = () => {   
      return (
        <div className={"shareBar"}>
          <div className={"shareButton"} id={"textCopy"} onClick={() => this.handleClick()} title='copy to clipboard'><FontAwesomeIcon icon={faCopy} size="2x"/></div>
          <div className={"shareButton"} id={"redditCopy"} onClick={() => this.handleClick("reddit")} title='copy with reddit markdown'><FontAwesomeIcon icon={faReddit} size="2x"/></div>
        </div> 
      )
    };

    return (
      <div className="sub"
        onClick={this.handleClickModal}
        onKeyPress={this.handleEsc}>
        <p>
          {jSub.substring(0, index)}
          <span className="highlight">{jSub.substring(index, index + search.length)}</span>
          {jSub.substring(index + search.length)}
          &nbsp;(<i>{title} {time}</i>)
        </p>
        <Modal show={showModal} onClose={this.handleClickModal}>
          <SubWheel
            title={title}
            context={context}
            timestamp={time}
            quote={sub}
            onClick={this.handleClick}
          />
          <ShareBar />
        </Modal>

      </div>
    );
  }
}

export { Quote };
