import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesHelper from '../../utils/MoviesHelper.js';

function SavedMovies({movies, onCardDelete, setInfoTooltip}) {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    moviesHelper.init(true);
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

  React.useEffect(() => {
    moviesHelper.savedMoviesLibrary = movies;
    moviesHelper.filterMovies('', false);
  }, [movies]);  

  function onSearch(queryString = '', isShortMovieFilter =  false) {
    moviesHelper.filterMovies(queryString.toLowerCase().trim(), isShortMovieFilter);
  }

  function deleteMovie(e) {
    onCardDelete(e);
    moviesHelper.filterMovies();
  }

  return (
    <main>
      <section className='savedmovies'>
        <SearchForm
          onSearch={onSearch}
          savedMode={true}
        />
          <MoviesCardList
            onCardDelete={deleteMovie}
            cards={cards}
            savedMode={true}
          />
      </section>
    </main>
  )
}

export default SavedMovies;