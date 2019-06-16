import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
      super(props);

      let rMovie = props.movies[this.getRandomInt(props.movies.length)];
      let rQuote = rMovie.subs[this.getRandomInt(rMovie.subs.length)];
      let rQuoteLine = rQuote.sub.join(' ');
      while (rQuote.sub.join(' ').split(' ').length <= 4 && rQuoteLine.substring(0,1) === rQuoteLine.substring(0,1).toUpperCase()) {
        rQuote = rMovie.subs[this.getRandomInt(rMovie.subs.length)];
      }
      this.state = { quote: { title: rMovie.title, line: rQuote.sub.join(' '), time: rQuote.time } };
    }
  
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  
    render() {
      return (
        <div className="flexContainer">
          <div className="randomQuote">
            <p>{this.state.quote.line} <i>({this.state.quote.title} {this.state.quote.time})</i></p>
          </div>
          <div className="credits">
            made by /u/shonnyboymushi
          </div>
        </div>
      );
    }
  }

  export { Home };