import { SHORT_MOVIE_DURATION } from './constants.js';

function filterShortMovies(movies) {
  return movies.filter(item => {
    return item.duration <= SHORT_MOVIE_DURATION;
  });
}

function filterMovies(movies, query, isShortMovieFilter) {
  const moviesByUserQuery = movies.filter(item => {
    return item.nameRU && item.nameRU.toLowerCase().indexOf(query) >= 0;
  });

  if (isShortMovieFilter) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

function getMoviesFromLocal() {
  const movies = localStorage.getItem('movies');
  if (localStorage.getItem('movies')) {
    return JSON.parse(movies);
  } else {
    return [];
  }
}

function getIsShortMovieFilterFromLocal() {
  return localStorage.getItem('isShortMovieFilter') === 'true';
}

function getQueryFromLocal() {
  return localStorage.getItem('query');
}

function setMoviesToLocal(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
}

function setIsShortMovieFilterToLocal(isShortMovieFilter) {
  localStorage.setItem('isShortMovieFilter', isShortMovieFilter);
}

function setQueryToLocal(query) {
  localStorage.setItem('query', query);
}

function isMoviesPage() {
  return (window.location.pathname === '/movies');
}

function setToken(token) {
  localStorage.setItem('jwt', token);
}

function getToken() {
  return localStorage.getItem('jwt');
}

export {
  filterShortMovies,
  filterMovies,
  getMoviesFromLocal,
  getIsShortMovieFilterFromLocal,
  getQueryFromLocal,
  setMoviesToLocal,
  setIsShortMovieFilterToLocal,
  setQueryToLocal,
  isMoviesPage,
  setToken,
  getToken
}