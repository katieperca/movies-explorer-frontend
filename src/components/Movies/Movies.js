import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
import moviesHelper from '../../utils/MoviesHelper.js';

function Movies({ onCardLike, onCardDelete, savedMovies, setInfoTooltip }) {
  const [cards, setCards] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);  

  React.useEffect(() => {
    moviesHelper.init();
    window.addEventListener('resize', () => {
      clearTimeout(window.resized);
      window.resized = setTimeout(function() {
        moviesHelper.resizeWindow();
      }, 250);
    });
    moviesHelper.resizeWindow();
    moviesHelper.prepareEvents({setInfoTooltip, setCards});
  }, []);  

  React.useEffect(() => {
    if (moviesHelper.query) {
      onSearch();
    }
  }, []);

  function onSearch(queryString = '', isShortMovieFilter = false) {
    if (moviesHelper.moviesLibrary.length <= 0) {
      setIsPreloaderActive(true);
      moviesApi.getMovies()
      .then((res) => {
        if (res) {
          moviesHelper.moviesLibrary = res;
          moviesHelper.filterMovies(queryString, isShortMovieFilter);
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

  return (
    <main>
      <section className='movies'>
        <SearchForm
          onSearch={onSearch}
          queryDefault={moviesHelper.query}
          isShortMovieFilterDefault={moviesHelper.isShortMovieFilter}
        />
        { isPreloaderActive ? (
            <Preloader/>
          ) : ( 
            <MoviesCardList
              isPreloaderActive={isPreloaderActive}
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