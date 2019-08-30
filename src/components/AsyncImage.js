import React, { Component } from 'react';
import ReactGA from "react-ga";

import '../styles/AsyncImage.scss';

class AsyncImage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loadedSmall: false,
      loadedLarge: false,
    }

    this.onLoadSmall = this.onLoadSmall.bind(this);
    this.onLoadLarge = this.onLoadLarge.bind(this);
    this.trackClick = this.trackClick.bind(this);

    this.small = new Image();
    this.small.onload = () => this.onLoadSmall();
    this.small.src = `/assets/${this.props.src.split('.')[0]}-small.png`;

    this.large = new Image();
    this.large.onload = () => this.onLoadLarge();
    this.large.src = `/assets/${this.props.src.split('.')[0]}-large.png`;
  }

  onLoadSmall() {
      this.setState({
        loadedSmall: true
      });
  }

  onLoadLarge() {
    this.setState({
      loadedLarge: true
    });
  }

  trackClick() {
    ReactGA.event({
      category: 'starwars',
      action: 'download',
      label: this.props.track
    });
  }

  componentWillUnmount() {
    this.small.onload = () => {};
    this.large.onload = () => {};
  }

  render() {
    return(
      <a onClick={this.trackClick} title="Download image" href={`/assets/${this.props.src.split('.')[0]}-large.png`} rel="noopener noreferrer" download target="_blank">
        <div className={`asyncWrapper ${this.state.loadedLarge ? '' : 'pulse'}`} style={this.state.loadedSmall ? {backgroundImage: `url(/assets/${this.props.src.split('.')[0]}-small.png`} : {}}>
          <img className="remote" style={this.state.loadedLarge ? {opacity: 1} : {opacity: 0}} src={`/assets/${this.props.src.split('.')[0]}-large.png`} alt={this.props.text.join(' ')}/>
        </div>
      </a>
    )
  }
}

export { AsyncImage };