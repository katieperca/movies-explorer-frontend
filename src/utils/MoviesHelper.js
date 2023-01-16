class MoviesHelper {
  constructor() {
    this.init();
  }

  init(savedMode = false) {
    this.query = '';
    this.isShortMovieFilter = false;
    this.moviesLibrary = [];
    this.filtredMovies = [];
    this.SHORT_MOVIE_DURATION = 40;
    this.showedCardsCount = 0;
    this.defaultCardsCount = 0;
    this.moreButtonCount = 0;
    this.isMoreButtonShowed = false;
    this.setInfoTooltip = false;
    this.setCards = false;
    this.savedMode = savedMode;
    this.query = (!this.savedMode) ? localStorage.getItem('query') : '';
    this.isShortMovieFilter = (!this.savedMode) ? localStorage.getItem('isShortMovieFilter') === 'true' ? true : false : false;
  }

  setFilter({query, isShortMovieFilter}) {
    this.query = query;
    this.isShortMovieFilter = isShortMovieFilter;
    if (!this.savedMode) {
      localStorage.setItem('query', query);
      localStorage.setItem('isShortMovieFilter', isShortMovieFilter);
    }
  }

  prepareEvents({setInfoTooltip, setCards}) {
    this.setInfoTooltip = setInfoTooltip;
    this.setCards = setCards;
    this.setCards([]);
  }

  filterMovies(query = '', isShortMovieFilter = false) {
    this.filtredMovies = [];
    if (query != '' || isShortMovieFilter) {
      this.setFilter({query, isShortMovieFilter});
    }
    // console.log(this.query);
    // console.log(this.isShortMovieFilter);
    // console.log(this.savedMode);
    if (this.query || this.isShortMovieFilter || this.savedMode) {
      this.filtredMovies = this.moviesLibrary.filter(item => {
        const nameFilter = item.nameRU && item.nameRU.toLowerCase().indexOf(this.query) >= 0;
        if (nameFilter && this.isShortMovieFilter) {
          return item.duration <= this.SHORT_MOVIE_DURATION;
        }
        return nameFilter;
      });
      this.makeMoviesList(!(query || isShortMovieFilter));
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
    if (this.filtredMovies.length  <= 0) {
      this.setInfoTooltip({
        isOpen: true,
        message: 'Ничего не найдено',
      });
    }
    if (this.showedCardsCount < this.defaultCardsCount) {
      this.showedCardsCount = this.defaultCardsCount;
    }
    this.isMoreButtonShowed = !(this.showedCardsCount >= this.filtredMovies.length);
    if (this.savedMode) {
      this.setCards(this.filtredMovies);
    } else {
      this.setCards(this.filtredMovies.slice(0, this.showedCardsCount));
    }
  }

  moreCards() {
    moviesHelper.showedCardsCount += moviesHelper.moreButtonCount;
    moviesHelper.makeMoviesList();
  }
}

const moviesHelper = new MoviesHelper();

export default moviesHelper;