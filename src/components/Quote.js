import React, { Component } from 'react';
import Modal from './Modal';
import '../styles/Quote.scss';
import * as clipboard from "clipboard-polyfill";

class Quote extends Component {


  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickModal = this.handleClickModal.bind(this);

    this.state = {
      showModal: false,
    };
  }

  handleClick() {
    clipboard.writeText(`${this.props.sub} (*${this.props.title} ${this.props.time}*)`);
    this.props.handle(true);
    setTimeout(() => {
      this.props.handle(false);
    }, 1500);
    this.setState({
      showModal: false,
    });
  }

  handleClickModal() {
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

    return (
      <div className="sub"
        onClick={this.handleClickModal}
        title="click to copy to clipboard"
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
        </Modal>

      </div>
    );
  }
}


const SubWheel = (props) => {

  const buildLines = (subs) => {
    return subs.map((line, index) => {
      return <li key={index}><span>{line.sub.join(' ')}</span><span>{line.time}</span></li>
    });
  };

  return (
    <div className="subWheel">
      <div className="ulWrapper">
        <ul className="preContext">
          {buildLines(props.context.prev)}
        </ul>
      </div>


      <p className="quoteModal" onClick={props.onClick}>
        <span>{props.quote.join(' ')}</span>
        <span>— <i>{props.title} {props.timestamp}</i></span>
      </p>
      <div className="ulWrapper">
        <ul className="postContext">
          {buildLines(props.context.post)}
        </ul>
      </div>

    </div>

  );
}

export { Quote };
