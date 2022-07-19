import React, { useState } from "react";
import { Home, Quote, Searchbar } from "./components";
import "./App.scss";
import movies from "./movies/index";
import Fuse from "fuse.js";

const fuse = new Fuse(
  movies.flatMap((x) => x.subs.map((y, i) => ({ id: x.id, sub: y.sub.join(" "), i: i }))),
  {
    keys: ["sub"],
    includeMatches: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3
  }
);

export default function App() {
  let quoteFromLocation;
  try {
    const queryParams = new URLSearchParams(document.location.search);
    const indexFromUrl = parseInt(queryParams.get("quoteIndex"), 10);
    const movieFromUrl = queryParams.get("movie");
    if (movieFromUrl && indexFromUrl) {
      const movie = movies.find((movie) => movie.id === movieFromUrl);
      if (movie) {
        quoteFromLocation = {
          movie: movie,
          sub: movie.subs[indexFromUrl],
          index: indexFromUrl
        };
      }
    }
  } catch (e) {}

  const [linkQuote, setlinkQuote] = useState(quoteFromLocation);
  const [search, setSearch] = useState("");
  const [copyAlert, setCopyAlert] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
    setlinkQuote(null);
  };

  const showSubs = () => {
    const finded = fuse.search(search, { limit: 99 });
    return finded.flatMap((row) => {
      return movies.map((movie) => {
        if (movie.id === row.item.id) {
          if (row.matches[0].indices[0][1] - row.matches[0].indices[0][0] > search.length / 2) {
            const matched = row.matches[0].value.substring(
              row.matches[0].indices[0][0],
              row.matches[0].indices[0][1] + 1
            );
            return (
              <Quote
                key={movie.id + row.item.i}
                subIndex={row.item.i}
                search={matched}
                movie={movie}
                handle={setCopyAlert}
                startingShowModal={false}
              />
            );
          }
        }
      });
    });
  };
  let body = <Home movies={movies} />;
  if (linkQuote) {
    body = (
      <Quote
        key={linkQuote.movie.id + linkQuote.index}
        subIndex={linkQuote.index}
        search=""
        movie={linkQuote.movie}
        handle={setCopyAlert}
        startingShowModal={true}
      />
    );
  } else if (search.length >= 3) {
    body = showSubs();
  }
  return (
    <div className="App">
      <Searchbar value={search} onSearchChange={handleSearchChange} />
      <div className={`alert ${copyAlert ? "alert-show" : "alert-hide"}`}>Copied to clipboard</div>
      <div className="body">{body}</div>
    </div>
  );
}
