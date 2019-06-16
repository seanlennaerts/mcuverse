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
    this.setState({ search: event.target.value.toLowerCase().trim() });
  }

  showSubs() {
    var matches = []
    movies.forEach(movie => {
      movie.subs.forEach(sub => {
        if (sub.sub.join(' ').toLowerCase().includes(this.state.search)) {
          matches.push(
            <Quote
              sub={sub.sub}
              search={this.state.search}
              title={movie.title}
              time={sub.time}
              handle={this.handleAlert}
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
          {this.state.search.length >= 3 ? this.showSubs() : <Home />}
        </div>
      </div>
    );
  }
}

export default App;
