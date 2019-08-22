import React, { Component } from 'react';

import '../styles/AsyncImage.scss';

class AsyncImage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loaded: false,
    }

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({
      loaded: true
    })
  }

  render() {
    return(
      <a title="Download image" href={`https://res.cloudinary.com/searchmoviequotes/image/upload/v1566439481/${this.props.src}`} rel="noopener noreferrer" download target="_blank">
        <div className="asyncWrapper" style={this.state.loaded ? {backgroundImage: `url(/assets/${this.props.src})`} : {backgroundImage: `url(/assets/${this.props.src})`, animation: "pulse 0.7s infinite ease-in-out"}}>
          <img className="remote" onLoad={this.onLoad} style={this.state.loaded ? {opacity: 1} : {opacity: 0}} src={`https://res.cloudinary.com/searchmoviequotes/image/upload/v1566439481/${this.props.src}`} alt={this.props.text.join(' ')}/>
        </div>
      </a>
    )
  }
}

export { AsyncImage };