import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Quote, Searchbar } from './components';
import './App.scss';
import moviesEN from './movies/en/index';
import moviesPL from './movies/pl/index';

const strings = {
  searchPlaceholder: {
    en: "Search verse",
    pl: "Znajdź wers"
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:locale" component={Main} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}
class Main extends React.Component {
  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
      linkQuote: null
    });
  }

  lowerMovies = null;

  changeLocale = (newLocale) => {
    console.log(`changing locale to "${newLocale}"`);
    this.setState({locale: newLocale || "en"});
    let movies;
    switch (newLocale) {
      case "pl":
        movies = moviesPL;
        break;
      default:
        movies = moviesEN;
    }
    console.log("new movies:", movies);
    this.setState({movies: movies});
    this.lowerMovies = movies.map(sub => {
      let subCopy = Object.assign({}, sub);
      subCopy.subs = subCopy.subs.map(sub => {
        let subCopy = Object.assign({}, sub);
        subCopy.sub = subCopy.sub.join(' ').toLowerCase();
        return subCopy;
      });
      return subCopy;
    });
    return movies;
  };


  constructor(props) {
    super(props);
    console.log("loaded");

    let linkQuote;
    try {
      let queryParams = new URLSearchParams(props.location.search);
      let indexFromUrl = parseInt(queryParams.get("quoteIndex"));
      let movieFromUrl = queryParams.get("movie");
      if (movieFromUrl && indexFromUrl) {
        let movie = this.state.movies.find(movie => movie.id === movieFromUrl);
        if (movie) {
          linkQuote = {
            movie: movie,
            sub: movie.subs[indexFromUrl],
            index: indexFromUrl,
          }
        }
      }
    } catch (e) {}

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    Main.buildContext = Main.buildContext.bind(this);
    this.buildQuote = this.buildQuote.bind(this);

    this.state = {
      alert: false,
      search: '',
      linkQuote,
      locale: props.match.params.locale || 'en',
      movies: this.changeLocale(props.match.params.locale)
    };

  }

  handleAlert(show) {
    this.setState({ alert: show });
  }

  static buildContext(movie, index) {
    const start = index - 10 >= 0 ? index - 10 : 0;
    const end = index + 10 >= movie.subs.length ? movie.subs.length : index + 10;

    return {
      prev: movie.subs.slice(start, index),
      post: movie.subs.slice(index + 1, end + 1),
    }
  }

  showSubs() {
    let matches = [];
    this.lowerMovies.forEach((movie, movieIndex) => {
      movie.subs.forEach((sub, index) => {
        let strIndex = sub.sub.indexOf(this.state.search.toLowerCase().trim());
        if (strIndex >= 0) {
          matches.push(this.buildQuote(movie, this.state.movies[movieIndex].subs[index], index))
        }
      });
    });
    return matches;
  }

  buildQuote(movie, sub, index, showModal = false) {
    return (
      <Quote
      context={Main.buildContext(movie, index)}
      sub={sub.sub}
      subIndex={index}
      search={this.state.search.toLowerCase().trim()} //important to trim to match the actual search because highlighting calcs are based on length
      title={movie.title}
      movieId={movie.id}
      time={sub.time}
      handle={this.handleAlert}
      index={index}
      showModal={showModal}
    />
    )
  }

  render() {
    return(
    <div className="App">
      <Searchbar
          value={this.state.search}
          onSearchChange={this.handleSearchChange}
          onLocaleChange={this.changeLocale}
          placeholder={strings.searchPlaceholder[this.state.locale]}
      />
      <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
      <div className="body">
        { this.state.linkQuote ?
         [this.buildQuote(this.state.linkQuote.movie, this.state.linkQuote.sub, this.state.linkQuote.index, true)]
         : this.state.search.length >= 3 ? this.showSubs() : <Home movies={this.state.movies}/>}
      </div>
      </div>
    );
  }
}

export default App;
