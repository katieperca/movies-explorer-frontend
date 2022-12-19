import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies() {
  return (
    <main>
      <section className='savedmovies'>
        <SearchForm/>
        <MoviesCardList
          saved={true}
          count={3}
        />
      </section>
    </main>
  )
}

export default SavedMovies;