import subs from '../movies/index';

class MarvelApi {
  constructor() {
    this.allMovies = [];
    subs.forEach(movie => {
      this.allMovies = [...this.allMovies, ...movie.subs];
    })
  }

  getQuotes(searchString, index, limit) {
    let subs = [];
    for (let i = index; i < index + limit; i++) {
      if (this.allMovies[i].sub.join(' ').toLowerCase().includes(searchString)) {
        subs.push(this.allMovies[i])
      }  
    }
    return subs;
  }
 
}

const marvelApiInstance = new MarvelApi();
Object.freeze(marvelApiInstance);

export default marvelApiInstance;