import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import { Searchbar, Screenshot, AsyncImage, Button } from '../components';
import '../App.scss';
import movies from '../starwars/index';
import * as placeHolders from '../starwars/placeholder.json';

class PrequelMemes extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMemeClick = this.handleMemeClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      search: '',
      screenshot: false,
      screenshotImage: '',
      screenshotText: [],

      getIndex: this.searchlimit,
    };

    this.searchlimit = (3 * 5) * 2;
    this.searchResults = 0;
  }


  componentDidMount() {
    document.title = 'Star Wars - Search Movie Quotes'
    window.addEventListener('scroll', debounce(this.handleScroll, 100));
  }

  // componentDidUpdate() {
  //   console.log(`searchResults: ${this.searchResults}`);
  //   console.log(`getindex: ${this.state.getIndex}`);
  // }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getScrollTop () { const el = document.scrollingElement || document.documentElement; return el.scrollTop }

  handleScroll() {
    // console.log(`window.innerHeight: ${window.innerHeight}`);
    // console.log(`document.documentElement.scrollTop ${this.getScrollTop()}`);
    // console.log(window.innerHeight + this.getScrollTop());
    // console.log(`document.documentElement.offsetHeight ${document.documentElement.offsetHeight}`);
    
    if (this.searchResults === 0 || this.state.getIndex >= this.searchResults) return;
    if (window.innerHeight + this.getScrollTop() >= document.documentElement.offsetHeight) {
      // alert('reached bottom');
      this.setState({ getIndex: this.state.getIndex + this.searchlimit });
    }
  }

  buildScreenshot() {
    return (
      <Screenshot
        image={this.state.screenshotImage}
      // text = {this.state.screenshotText}
      />
    )
  }

  // handleMemeClick(image, text) {
  //   this.setState({
  //     screenshot: true,
  //     screenshotImage: image,
  //     screenshotText: text,
  //   });


  handleMemeClick(element) {
    this.setState({ screenshotImage: element });
    console.log(element);

    // console.log(image, text);
    // let img = document.createElement('img');
    // img.src = `${image}`;
    // img.style.width = '1280px';
    // p.style.position = 'absolute';
    // p.style.top = '-9999px';
    // p.style.left = '-9999px';
    // document.body.prepend(img);
    // html2canvas(p).then(canvas => {
    //   let a = document.createElement('a');
    //   a.href = canvas.toDataURL();
    //   a.download = 'test.png';
    //   a.click();
    // });
    // html2canvas(key).then(function(canvas) {
    //   console.log(canvas.toDataURL("image/jpg"));
    // });
  }

  handleSearchChange(event) {
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
          />);
        }
      });
    });
    this.searchResults = imgs.length;
    return imgs.slice(0, this.state.getIndex); // todo: fix this garbage
  }

  buildMemeModal() {

    const divStyle = { backgroundImage: `url(${this.state.modalImage})` }
    return (
      <div className="memeModalWrapper">
        <div className="memeModal">
          <div className="memeImage" style={divStyle}>
          </div>
        </div>
      </div >

    );
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