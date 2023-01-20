import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { 
  filterMovies,
  getMoviesFromLocal, 
  getIsShortMovieFilterFromLocal, 
  filterShortMovies,
  setIsShortMovieFilterToLocal,
  setQueryToLocal,
  setMoviesToLocal
} from '../../utils/utils.js';

function Movies({ onCardLike, onCardDelete, savedMovies, setInfoTooltip }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [previousFilteredMovies, setPreviousFilteredMovies] = React.useState([]);
  const [moviesSource, setMoviesSource] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);  
  const [isShortMovieFilter, setIsShortMovieFilter] = React.useState(false);

  React.useEffect(() => {
    setIsShortMovieFilter(getIsShortMovieFilterFromLocal());
  }, [currentUser]);

  React.useEffect(() => {
    const movies = getMoviesFromLocal();
    if (movies) {
      setPreviousFilteredMovies(movies);
      if (getIsShortMovieFilterFromLocal()) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  function setFiltredMovies(movies, query, shortMovieFilter) {
    const resultMovies = filterMovies(movies, query, shortMovieFilter);
    if (resultMovies.length === 0) {
      setInfoTooltip({
        isOpen: true,
        message: 'Ничего не найдено',
      });
    }
    setPreviousFilteredMovies(resultMovies);
    setFilteredMovies(resultMovies);
    setMoviesToLocal(resultMovies);
  }

  function onSearch(query) {
    setIsShortMovieFilterToLocal(isShortMovieFilter);
    setQueryToLocal(query);

    if (moviesSource.length === 0) {
      setIsPreloaderActive(true);
      moviesApi.getMovies()
      .then((res) => {
        if (res) {
          setMoviesSource(res);
          setFiltredMovies(res, query, isShortMovieFilter);
        }
      })
      .catch((e) => {
        setInfoTooltip({
          isOpen: true,
          message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        });
      })
      .finally(() => {
        setIsPreloaderActive(false);
      });
    } else {
      setFiltredMovies(moviesSource, query, isShortMovieFilter);
    }
  }

  function onIsShortFilms () {
    const newFilterVal = !isShortMovieFilter;
    setIsShortMovieFilter(newFilterVal);
    if (newFilterVal) {
      setFilteredMovies(filterShortMovies(previousFilteredMovies));
    } else {
      setFilteredMovies(previousFilteredMovies);
    }
    setIsShortMovieFilterToLocal(newFilterVal);
  }

  return (
    <main>
      <section className='movies'>
        <SearchForm
          onSearch={onSearch}
          onIsShortFilms={onIsShortFilms}
          isShortMovieFilter={isShortMovieFilter}
        />
        { isPreloaderActive ? (
            <Preloader/>
          ) : ( 
            <MoviesCardList
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cards={filteredMovies}
              savedMovies={savedMovies}
          />
          )
        }
      </section>
    </main>
  )
}

export default Movies;