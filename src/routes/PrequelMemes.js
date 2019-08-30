import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import ReactGA from "react-ga";

import { Searchbar, AsyncImage, Button } from '../components';
import '../App.scss';
import movies from '../starwars/index';
import * as placeHolders from '../starwars/placeholder.json';

class PrequelMemes extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      search: '',
      getIndex: this.searchlimit,
    };

    this.searchlimit = (3 * 5) * 1;
    this.searchResults = 0;
    this.searchHistory = '';
  }

  componentDidMount() {
    document.title = 'Star Wars - Search Movie Quotes'
    window.addEventListener('scroll', debounce(this.handleScroll, 50));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getScrollTop () { const el = document.scrollingElement || document.documentElement; return el.scrollTop }

  handleScroll() {
    if (this.searchResults === 0 || this.state.getIndex >= this.searchResults) return;
    // console.log(`window.innerHeight: ${window.innerHeight}`);
    // console.log(`document.documentElement.scrollTop ${this.getScrollTop()}`);
    // console.log(`document.documentElement.offsetHeight ${document.documentElement.offsetHeight - window.innerHeight * 2}`);
    if (this.getScrollTop() >= document.documentElement.offsetHeight - window.innerHeight * 2) {
      this.setState({ getIndex: this.state.getIndex + this.searchlimit });
    }
  }

  handleSearchChange(event) {
    if (event.target.value.length < this.state.search.length) {
      if (this.searchHistory.length === 0) {
        this.searchHistory = this.state.search;
      }
    } else if (event.target.value.length > this.state.search.length) {
      this.searchHistory = ''; // considered a correction, will lose some search events tho
    }
    if (event.target.value.length === 0) {
      ReactGA.event({
        category: 'starwars',
        action: 'search',
        label: this.searchHistory
      });
    }
    this.setState({
      search: event.target.value.replace(/[.,!?"'-]/g, '').toLowerCase().trim(),
      getIndex: this.searchlimit,
    });
    if (event.target.value.length === 0) {
      this.searchResults = 0;
    }
    window.scrollTo(0,0);
  }

  buildGrid() {
    var imgs = [];
    let searchString = this.state.search;

    movies.forEach(movie => {
      movie.imgs.forEach(img => {
        if (img.sub.join(' ').replace(/[.,!?"'-]/g, '').toLowerCase().includes(searchString)) {
          imgs.push(<AsyncImage
            src={img.src}
            text={img.sub}
            track={`${movie.id}-${img.id}`} // can't access key so dup is necassary
            key={`${movie.id}-${img.id}`}
          />);
        }
      });
    });
    this.searchResults = imgs.length;
    return imgs.slice(0, this.state.getIndex); // todo: fix this garbage
  }

  //shitty workaround for infinite scroll when original fetch doesn't have enough content to scroll
  buildLoadMore() {
    if (this.state.getIndex < this.searchResults) {
      return (
        <div className="loadMore">
          <Button
            text="SHOW MORE"
            onClick={() => {this.setState({getIndex: this.state.getIndex + this.searchlimit})}}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.screenshot ? this.buildScreenshot() : null}
        <div className="gradientHeaderPreq"></div>
        <Searchbar onSearchChange={this.handleSearchChange} placeholder={placeHolders.default[Math.floor(Math.random() * placeHolders.default.length)]} />
        <div className="prequelBody">
          <div className="grid" onTouchMove={() => document.getElementById('search').blur()}>
            {this.state.search.length >= 1 ? this.buildGrid() : null}
          </div>
          {this.buildLoadMore()}
        </div>
      </div>
    );
  }
}

export { PrequelMemes }