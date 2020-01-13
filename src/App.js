import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactGA from "react-ga";

import { Home, Quote, Searchbar } from './components';
import { PrequelMemes, Franchise, withTracker } from './routes';

import './App.scss';
import movies from './movies/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={withTracker(Franchise)} />
        <Route path="/mcuverse" component={withTracker(Main)} />
        <Route path="/starwars" component={withTracker(PrequelMemes)} />
      </Router>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    let linkQuote;
    try {
      let queryParams = new URLSearchParams(props.location.search);
      let indexFromUrl = parseInt(queryParams.get("quoteIndex"));
      let movieFromUrl = queryParams.get("movie");
      if (movieFromUrl && indexFromUrl) {
        let movie = movies.find(movie => movie.id === movieFromUrl);
        if (movie) {
          linkQuote = {
            movie: movie,
            sub: movie.subs[indexFromUrl],
            index: indexFromUrl,
          }
        }
      }
    } catch (e) { } // lol Janik what is this!?!?!

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.buildContext = this.buildContext.bind(this);
    this.buildQuote = this.buildQuote.bind(this);

    this.state = {
      alert: false,
      search: '',
      linkQuote,
    };

    this.searchTimeout = null;
  }

  componentDidMount() {
    document.title = 'MCU Bible Verse - Search Movie Quotes';
  }

  handleAlert(show) {
    this.setState({ alert: show });
  }

  handleSearchChange(event) {
    if (event.target.value.length <= 1 && this.state.search.length > 1) {
      clearTimeout(this.searchTimeout);
      ReactGA.event({
        category: 'mcu',
        action: 'search',
        label: this.state.search
      });
    }

    this.setState({
      search: event.target.value.toLowerCase().trim(),
      linkQuote: null
    });
    
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.state.search.length > 0) {
        ReactGA.event({
          category: 'mcu',
          action: 'search',
          label: this.state.search
        });
      }
    }, 2000); // might need to adjust this treshold
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
    let matches = [];
    movies.forEach(movie => {
      movie.subs.forEach(sub => {
        let strIndex = sub.sub.join(' ').toLowerCase().indexOf(this.state.search);
        if (strIndex >= 0) {
          matches.push(this.buildQuote(movie, sub))
        }
      });
    });
    return matches;
  }

  buildQuote(movie, sub, showModal = false) {
    return (
      <Quote
        context={this.buildContext(movie, sub.index)}
        sub={sub.sub}
        subIndex={sub.index}
        search={this.state.search} //important to trim to match the actual search because highlighting calcs are based on length
        title={movie.title}
        movieId={movie.id}
        time={sub.time}
        handle={this.handleAlert}
        showModal={showModal}
        key={`${movie.id}-${sub.index}`}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <div className="logo">
          <img src='/assets/Marvel_Studios_2016_logo.svg' alt='MCU logo' />
        </div>
        <div className="gradientHeader"></div>
        <Searchbar onSearchChange={this.handleSearchChange} placeholder='Search verse' />
        <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
        <div className="body" onTouchMove={() => document.getElementById('search').blur()}>
          {this.state.linkQuote ?
            [this.buildQuote(this.state.linkQuote.movie, this.state.linkQuote.sub, this.state.linkQuote.index, true)]
            : this.state.search.length >= 0 ? this.showSubs() : <Home movies={movies} />}
        </div>


      </div>
    );
  }
}

export default App;
