class MoviesHelper {
  constructor() {
    this.moviesLibrary = [];
    this.savedMoviesLibrary = [];
  }

  init() {
    this.filtredMovies = [];
    this.SHORT_MOVIE_DURATION = 40;
    this.showedCardsCount = 0;
    this.defaultCardsCount = 0;
    this.moreButtonCount = 0;
    this.isMoreButtonShowed = false;
    this.setInfoTooltip = false;
    this.setCards = false;
  }

  setFilter({query, isShortMovieFilter}) {
    if (this.isMovies()) {
      localStorage.setItem('query', query);
      localStorage.setItem('isShortMovieFilter', isShortMovieFilter);
    }
  }

  prepareEvents({setInfoTooltip, setCards}) {
    this.setInfoTooltip = setInfoTooltip;
    this.setCards = setCards;
  }

  filterMovies(query = '', isShortMovieFilter = false) {
    const movies = (this.isMovies()) ? this.moviesLibrary : this.savedMoviesLibrary;
    this.filtredMovies = []; 
    this.setFilter({query, isShortMovieFilter});
    if (((query || isShortMovieFilter) && movies.length > 0) || !this.isMovies()) {
      this.filtredMovies = movies;
      if (query) {
        this.filtredMovies = this.filtredMovies.filter(item => {
          return item.nameRU && item.nameRU.toLowerCase().indexOf(query) >= 0;
        });
      }
      if (isShortMovieFilter) {
        this.filtredMovies = this.filtredMovies.filter(item => {
          return item.duration <= this.SHORT_MOVIE_DURATION;
        });
      }
      this.makeMoviesList((!this.isMovies() && (!query && !isShortMovieFilter)));
    }
  }

  resizeWindow() {
    if (window.innerWidth <= 480) {
      this.defaultCardsCount = 5;
      this.moreButtonCount = 2;
    } else if (window.innerWidth <= 768) {
      this.defaultCardsCount = 8;
      this.moreButtonCount = 2;
    } else {
      this.defaultCardsCount = 12;
      this.moreButtonCount = 3;
    }
  }

  makeMoviesList(init = false) {
    if (!init && this.filtredMovies.length  <= 0) {
      this.setInfoTooltip({
        isOpen: true,
        message: 'Ничего не найдено',
      });
    }
    if (this.showedCardsCount < this.defaultCardsCount) {
      this.showedCardsCount = this.defaultCardsCount;
    }
    this.isMoreButtonShowed = !(this.showedCardsCount >= this.filtredMovies.length);
    if (this.isMovies()) {
      this.setCards(this.filtredMovies.slice(0, this.showedCardsCount));
    } else {
      this.setCards(this.filtredMovies);
    }
  }

  moreCards() {
    moviesHelper.showedCardsCount += moviesHelper.moreButtonCount;
    moviesHelper.makeMoviesList();
  }

  isMovies() {
    return (window.location.pathname === '/movies');
  }

  getSavedIsShortMovieFilter() {
    return (this.isMovies()) ? (localStorage.getItem('isShortMovieFilter') === 'true') : false;
  }

  getSavedQuery() {
    return (this.isMovies()) ? localStorage.getItem('query') : '';
  }
}

const moviesHelper = new MoviesHelper();

export default moviesHelper;