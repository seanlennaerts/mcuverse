import React, { Component } from 'react';
import './App.css';
import * as clipboard from "clipboard-polyfill";
import movies from './movies/index';

function Sub(props) {

  const { sub, search, title, time, handle } = props;
  let jSub = sub.join(' ');

  const handleClick = () => {
    clipboard.writeText(`${jSub} (*${title} ${time}*)`);
    handle(true);
    setTimeout(() => {
      handle(false);
    }, 1500);
  }
  let index = jSub.toLowerCase().indexOf(search);
  return (
    <div className="sub"
      onClick={handleClick}
      title="click to copy to clipboard">
      <p>
        {jSub.substring(0, index)}
        <span className="highlight">{jSub.substring(index, index + search.length)}</span>
        {jSub.substring(index + search.length)}
        &nbsp;(<i>{title} {time}</i>)
      </p>
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    let rMovie = movies[this.getRandomInt(movies.length)];
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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { search: '', alert: false };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleAlert(show) {
    this.setState({ alert: show });
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value.toLowerCase().trim() });
  }

  showSubs() {
    var matches = []
    movies.forEach(movie => {
      movie.subs.forEach(sub => {
        if (sub.sub.join(' ').toLowerCase().includes(this.state.search)) {
          matches.push(<Sub
            sub={sub.sub}
            search={this.state.search}
            title={movie.title}
            time={sub.time}
            handle={this.handleAlert}
          />)
        }
      });
    });
    return matches;
  }

  render() {
    return (
      <div className="App">
        <div className="searchContainer">
          <input
            type="search"
            value={this.state.value}
            onChange={this.handleSearchChange}
            placeholder="Search verse"
            autoFocus
          ></input>
        </div>
        <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
        <div className="body">
          {this.state.search.length >= 3 ? this.showSubs() : <Home />}
        </div>
      </div>
    );
  }
}

export default App;
