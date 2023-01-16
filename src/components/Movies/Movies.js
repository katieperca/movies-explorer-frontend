import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
import moviesHelper from '../../utils/MoviesHelper.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Movies({ onCardLike, onCardDelete, savedMovies, setInfoTooltip }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);  

  React.useEffect(() => {
    const movies = localStorage.getItem('movies');
    if (movies) {
      moviesHelper.moviesLibrary = JSON.parse(movies);
    }
  }, [currentUser]);

  React.useEffect(() => {
    moviesHelper.init();
    moviesHelper.prepareEvents({setInfoTooltip, setCards});
    moviesHelper.resizeWindow();
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      clearTimeout(window.resized);
      window.resized = setTimeout(function() {
        moviesHelper.resizeWindow();
      }, 250);
    });
  }, []);  

  function onSearch(queryString = '', isShortMovieFilter = false) {
    if (queryString || isShortMovieFilter) {
      if (moviesHelper.moviesLibrary.length <= 0) {
        setIsPreloaderActive(true);
        moviesApi.getMovies()
        .then((res) => {
          if (res) {
            moviesHelper.moviesLibrary = res;
            localStorage.setItem('movies', JSON.stringify(moviesHelper.moviesLibrary));
            moviesHelper.filterMovies(queryString.toLowerCase().trim(), isShortMovieFilter);
            setIsPreloaderActive(false);
          }
        })
        .catch((e) => {
          setInfoTooltip({
            isOpen: true,
            message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          });
        });
      } else {
        moviesHelper.filterMovies(queryString, isShortMovieFilter);
      }
    }
  }

  return (
    <main>
      <section className='movies'>
        <SearchForm
          onSearch={onSearch}
          moviesLibrary={moviesHelper.moviesLibrary}
        />
        { isPreloaderActive ? (
            <Preloader/>
          ) : ( 
            <MoviesCardList
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cards={cards}
              savedMovies={savedMovies}
          />
          )
        }
        <button onClick={moviesHelper.moreCards} className={`movies__button ${!moviesHelper.isMoreButtonShowed ? 'movies__button_hidden': ''}`} aria-label='more films'>Ещё</button>
      </section>
    </main>
  )
}

export default Movies;