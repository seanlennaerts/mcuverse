import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home, Quote, Searchbar } from './components';
import { PrequelMemes, Franchise } from './routes';

import './App.scss';
import movies from './movies/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Franchise} />
        <Route path="/mcuverse" component={Main} />
        <Route path="/starwars" component={PrequelMemes} />
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
    // this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      alert: false,
      search: '',
      linkQuote,
    };
  }

  componentDidMount() {
    document.title = 'MCU Bible Verse - Search Movie Quotes';
    // window.addEventListener('scroll', debounce(this.handleScroll, 100));
  }

  // handleScroll() {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //     console.log('reached bottom')
  //     this.loadMoreQuotes();
  //   }
  // }

  // loadMoreQuotes() {
  //   console.log('loading');
  //   // this.setState({ isLoading: true });
  //   this.getSubs();
  // }


  handleAlert(show) {
    this.setState({ alert: show });
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
      linkQuote: null
    });
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
      movie.subs.forEach((sub, index) => {
        let strIndex = sub.sub.join(' ').toLowerCase().indexOf(this.state.search.toLowerCase().trim());
        if (strIndex >= 0) {
          matches.push(this.buildQuote(movie, sub, index))
        }
      });
    });
    return matches;
  }

  buildQuote(movie, sub, index, showModal = false) {
    return (
      <Quote
        context={this.buildContext(movie, index)}
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
    return (
      <div className="App">
        <div className="logo">
          <img src='/assets/Marvel_Studios_2016_logo.svg' alt='MCU logo' />
        </div>
        <div className="gradientHeader"></div>
        <Searchbar value={this.state.search} onSearchChange={this.handleSearchChange} placeholder='Search verse' />
        <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
        <div className="body" onTouchMove={() => document.getElementById('search').blur()}>
          {this.state.linkQuote ?
            [this.buildQuote(this.state.linkQuote.movie, this.state.linkQuote.sub, this.state.linkQuote.index, true)]
            : this.state.search.length >= 3 ? this.showSubs() : <Home movies={movies} />}
        </div>


      </div>
    );
  }
}

export default App;
