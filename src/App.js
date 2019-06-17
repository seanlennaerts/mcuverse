import React, { Component } from 'react';
import { Home, Quote, Searchbar } from './components';
import './App.scss';
import movies from './movies/index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { search: '', alert: false };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.buildContext = this.buildContext.bind(this);
  }

  handleAlert(show) {
    this.setState({ alert: show });
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  buildContext(movie, index) {
    const start = index - 10 >= 0 ? index - 10 : 0;
    const end = index + 10 >= movie.subs.length ? movie.subs.length : index + 10;

    return {
      prev: movie.subs.slice(start, index),
      post: movie.subs.slice(index + 1, end + 1),
    }
  }

  showSubs() {
    var matches = []
    movies.forEach(movie => {
      movie.subs.forEach((sub, index) => {
        let strIndex = sub.sub.join(' ').toLowerCase().indexOf(this.state.search.toLowerCase().trim());
        if (strIndex >= 0) {
          matches.push(
            <Quote
              context={this.buildContext(movie, index)}
              sub={sub.sub}
              search={this.state.search.toLowerCase().trim()} //important to trim to match the actual search because highlighting calcs are based on length
              title={movie.title}
              time={sub.time}
              handle={this.handleAlert}
              index={strIndex}
            />
          )
        }
      });
    });
    return matches;
  }

  render() {
    return (
      <div className="App">
        <Searchbar value={this.state.search} onSearchChange={this.handleSearchChange} />
        <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
        <div className="body">
          {this.state.search.length >= 3 ? this.showSubs() : <Home movies={movies}/>}
        </div>
      </div>
    );
  }
}

export default App;
