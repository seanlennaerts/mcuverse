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
  }

  handleAlert(show) {
    this.setState({ alert: show });
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  showSubs() {
    var matches = []
    movies.forEach(movie => {
      movie.subs.forEach(sub => {
        let index = sub.sub.join(' ').toLowerCase().indexOf(this.state.search.toLowerCase().trim());
        if (index >= 0) {
          matches.push(
            <Quote
              sub={sub.sub}
              search={this.state.search.trim()} //important to trim to match the actual search because highlighting calcs are based on length
              title={movie.title}
              time={sub.time}
              handle={this.handleAlert}
              index={index}
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
