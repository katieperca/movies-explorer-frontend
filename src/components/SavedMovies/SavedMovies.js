import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesHelper from '../../utils/MoviesHelper.js';

function SavedMovies({movies, onCardDelete, setInfoTooltip}) {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    moviesHelper.init(true);
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
    moviesHelper.moviesLibrary = movies;
    moviesHelper.filterMovies();
  }, [movies]);  

  function onSearch(queryString, isShortMovieFilter) {
    moviesHelper.filterMovies(queryString, isShortMovieFilter);
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