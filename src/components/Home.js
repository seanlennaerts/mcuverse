import React, { Component } from 'react';
import '../styles/Home.scss';

class Home extends Component {

  getRandomQuote(movies) {
    let randMovie = movies[this.getRandomInt(movies.length)];
    let randQuote = randMovie.subs[this.getRandomInt(randMovie.subs.length)];
    return {title: randMovie.title, line: randQuote.sub.join(' '), time: randQuote.time}
  }

  constructor(props) {
    super(props);
    const { movies } = props;

    let randQuote = this.getRandomQuote(movies);
    while (randQuote.line.split(' ').length <= 4 || randQuote.line.substring(0,1) !== randQuote.line.substring(0,1).toUpperCase()) {
        randQuote = this.getRandomQuote(movies);
    }
    this.state = { quote: { title: randQuote.title, line: randQuote.line, time: randQuote.time } };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div className="home">
        <div className="randomQuote">
          <p>{this.state.quote.line} <i>({this.state.quote.title} {this.state.quote.time})</i></p>
        </div>
        <div className="credits">
          <a href="https://github.com/seanlennaerts/">made by Sean Lennaerts</a>
          </div>
      </div>
    );
  }
}

export { Home };