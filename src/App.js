import React from 'react';
import { Home, Quote, Searchbar } from './components';
import './App.scss';
import movies from './movies/index';
import Fuse from 'fuse.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    
    let linkQuote;
    try {
      let queryParams = new URLSearchParams(document.location.search);
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
    } catch (e) {}

    const flatSubs = movies.map(x => x.subs.map((y,i) => ({"id": x['id'], 'sub':y['sub'].join(" "), 'i':i}))).flatMap(x => x);
    this.fuse = new Fuse(flatSubs, {keys: ["sub"], includeMatches: true,  threshold: 0.3, ignoreLocation: true,  minMatchCharLength: 3});
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.buildContext = this.buildContext.bind(this);
    this.buildQuote = this.buildQuote.bind(this);

    this.state = { 
      alert: false,
      search: '',
      linkQuote,
    };
  }

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
    const matches = [];
    const ss = this.state.search.toLowerCase();
    const finded = this.fuse.search(ss, {limit: 99});
    finded.forEach(row => {
      movies.forEach(movie => {
        if (movie.id === row.item.id) {
           if (row.matches[0].indices[0][1] - row.matches[0].indices[0][0] > ss.length/2) {
              const matched = row.matches[0].value.substring(row.matches[0].indices[0][0], row.matches[0].indices[0][1]+1);
              matches.push(this.buildQuote(movie, movie.subs[row.item.i], row.item.i, matched));
        }
        }
      })
    });
    return matches;
  }

  buildQuote(movie, sub, index, matched, showModal = false) {
    return (
      <Quote
      key={movie.id + sub.index}
      context={this.buildContext(movie, index)}
      sub={sub.sub}
      subIndex={index}
      search={matched}
      title={movie.title}
      movieId={movie.id}
      time={sub.time}
      handle={this.handleAlert}
      startingShowModal={showModal}
    />
    )
  }

  render() {
    return(
    <div className="App">
      <Searchbar value={this.state.search} onSearchChange={this.handleSearchChange} />
      <div className={`alert ${this.state.alert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
      <div className="body">
        { this.state.linkQuote ? 
         [this.buildQuote(this.state.linkQuote.movie, this.state.linkQuote.sub, this.state.linkQuote.index, "", true)]
         : this.state.search.length >= 3 ? this.showSubs() : <Home movies={movies}/>} 
      </div>
      </div>
    );
  }
}

export default App;

