import React, { useState } from 'react';
import { Home, Quote, Searchbar } from './components';
import './App.scss';
import movies from './movies/index';
import Fuse from 'fuse.js';

const buildContext = (movie, index) => {
    const start = index - 10 >= 0 ? index - 10 : 0;
    const end = index + 10 >= movie.subs.length ? movie.subs.length : index + 10;

    return {
      prev: movie.subs.slice(start, index),
      post: movie.subs.slice(index + 1, end + 1),
    };
};

export default function App() {
    let quoteFromLocation;
    try {
      let queryParams = new URLSearchParams(document.location.search);
      let indexFromUrl = parseInt(queryParams.get("quoteIndex"), 10);
      let movieFromUrl = queryParams.get("movie");
      if (movieFromUrl && indexFromUrl) {
        let movie = movies.find(movie => movie.id === movieFromUrl);
        if (movie) {
          quoteFromLocation = {
            movie: movie,
            sub: movie.subs[indexFromUrl],
            index: indexFromUrl,
          };
        }
      }
    } catch (e) {}

    let flatSubs = movies.map(x => x.subs.map((y,i) => ({"id": x.id, 'sub':y.sub.join(" "), 'i':i}))).flatMap(x => x);
    const fuse = new Fuse(flatSubs, {keys: ["sub"], includeMatches: true,  threshold: 0.3, ignoreLocation: true,  minMatchCharLength: 3});
    flatSubs = null; // clear memory

    const [linkQuote, setlinkQuote] = useState(quoteFromLocation);
    const [search, setSearch] = useState('');
    const [copyAlert, setCopyAlert] = useState(false);

    const handleSearchChange = (event) => {
      setSearch(event.target.value.toLowerCase());
      setlinkQuote(null);
    };

  const showSubs = () => {
    const matches = [];
    const finded = fuse.search(search, {limit: 99});
    finded.forEach(row => {
      movies.forEach(movie => {
        if (movie.id === row.item.id) {
           if (row.matches[0].indices[0][1] - row.matches[0].indices[0][0] > search.length/2) {
              const matched = row.matches[0].value.substring(row.matches[0].indices[0][0], row.matches[0].indices[0][1]+1);
              matches.push(buildQuote(movie, movie.subs[row.item.i], row.item.i, matched));
           }
        }
      })
    });
    return matches;
  };

  const buildQuote = (movie, sub, index, matched, showModal = false) => {
    return (
      <Quote
      key={movie.id + sub.index}
      context={buildContext(movie, index)}
      sub={sub.sub}
      subIndex={index}
      search={matched}
      title={movie.title}
      movieId={movie.id}
      time={sub.time}
      handle={setCopyAlert}
      startingShowModal={showModal}
    />
    )
  };

    return(
    <div className="App">
      <Searchbar value={search} onSearchChange={handleSearchChange} />
      <div className={`alert ${copyAlert ? 'alert-show' : 'alert-hide'}`}>Copied to clipboard</div>
      <div className="body">
        { linkQuote ? 
         [buildQuote(linkQuote.movie, linkQuote.sub, linkQuote.index, "", true)]
         : search.length >= 3 ? showSubs() : <Home movies={movies}/>} 
      </div>
      </div>
    );
}