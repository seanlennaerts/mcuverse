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
      <a title="Download image" href={`https://firebasestorage.googleapis.com/v0/b/searchmoviequotes.appspot.com/o/starwars%2F${this.props.src.split('/')[1]}%2F${this.props.src.split('/')[2]}?alt=media`} rel="noopener noreferrer" download target="_blank">
        <div className="asyncWrapper" style={this.state.loaded ? {backgroundImage: `url(/assets/${this.props.spl})`} : {backgroundImage: `url(/assets/${this.props.src})`, animation: "pulse 0.7s infinite ease-in-out"}}>
          <img className="remote" onLoad={this.onLoad} style={this.state.loaded ? {opacity: 1} : {opacity: 0}} src={`https://firebasestorage.googleapis.com/v0/b/searchmoviequotes.appspot.com/o/starwars%2F${this.props.src.split('/')[1]}%2F${this.props.src.split('/')[2]}?alt=media`} alt={this.props.text.join(' ')}/>
        </div>
      </a>
    )
  }
}

export { AsyncImage };