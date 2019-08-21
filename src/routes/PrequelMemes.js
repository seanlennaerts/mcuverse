import React, { Component } from 'react';

import { Searchbar, Meme, Screenshot } from '../components';
import '../App.scss';
import movies from '../starwars/index';

class PrequelMemes extends Component {

  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMemeClick = this.handleMemeClick.bind(this);

    this.state = {
      search: '',
      screenshot: false,
      screenshotImage: '',
      screenshotText: [],
    };
  }

  componentDidMount() {
    document.title = 'Star Wars - Search Movie Quotes'
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
      search: event.target.value,
    });
  }

  buildGrid() {
    var imgs = [];
    let searchString = this.state.search.toLowerCase().trim();


    movies.forEach(movie => {
      movie.imgs.forEach(img => {
        if (img.sub.join(' ').toLowerCase().includes(searchString)) {
          imgs.push(<Meme
            key={`${movie.id} ${img.id}`}
            src={img.src}
            alt={`${movie.id} ${img.id}`}
            text={img.sub}
          />);
        }
      });
    });
    return imgs;
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

  render() {
    return (
      <div className="App">
        {this.state.screenshot ? this.buildScreenshot() : null}
        <div className="gradientHeaderPreq"></div>
        <Searchbar onSearchChange={this.handleSearchChange} placeholder='Search' />
        <div className="prequelBody">
          <div className="grid">
            {this.state.search.length >= 3 ? this.buildGrid() : null}
          </div>
        </div>
      </div>
    );
  }
}

export { PrequelMemes }