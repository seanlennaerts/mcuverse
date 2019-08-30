import React, { Component } from 'react';

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

    let small = new Image();
    small.onload = () => this.onLoadSmall();
    small.src = `/assets/${this.props.src.split('.')[0]}-small.png`;

    let large = new Image();
    large.onload = () => this.onLoadLarge();
    large.src = `/assets/${this.props.src.split('.')[0]}-large.png`;
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

  render() {
    return(
      <a title="Download image" href={`/assets/${this.props.src.split('.')[0]}-large.png`} rel="noopener noreferrer" download target="_blank">
        <div className={`asyncWrapper ${this.state.loadedLarge ? '' : 'pulse'}`} style={this.state.loadedSmall ? {backgroundImage: `url(/assets/${this.props.src.split('.')[0]}-small.png`} : {}}>
          <img className="remote" style={this.state.loadedLarge ? {opacity: 1} : {opacity: 0}} src={`/assets/${this.props.src.split('.')[0]}-large.png`} alt={this.props.text.join(' ')}/>
        </div>
      </a>
    )
  }
}

export { AsyncImage };