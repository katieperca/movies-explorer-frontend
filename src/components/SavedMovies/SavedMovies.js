import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { CurrentUserContext }  from '../../contexts/CurrentUserContext.js';
import { filterMovies, filterShortMovies } from '../../utils/utils.js';

function SavedMovies({savedMovies, onCardDelete, setInfoTooltip}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isShortMovieFilter, setIsShortMovieFilter] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [showedMovies, setShowedMovies] = React.useState([]);

  React.useEffect(() => {
    setShowedMovies(savedMovies);
    setFilteredMovies(savedMovies);
  }, [currentUser, savedMovies]);

  function onSearch(query) {
    const resultMovies = filterMovies(savedMovies, query, isShortMovieFilter);
    if (resultMovies.length === 0) {
      setInfoTooltip({
        isOpen: true,
        message: 'Ничего не найдено',
      });
    } else {
      setFilteredMovies(resultMovies);
      setShowedMovies(resultMovies);
    }
  }

  function onIsShortFilms () {
    const newFilterVal = !isShortMovieFilter;
    setIsShortMovieFilter(newFilterVal);
    if (newFilterVal) {
      setShowedMovies(filterShortMovies(filteredMovies));
    } else {
      setShowedMovies(filteredMovies);
    }
  }

  return (
    <main>
      <section className='savedmovies'>
        <SearchForm
          onSearch={onSearch}
          onIsShortFilms={onIsShortFilms}
          isShortMovieFilter={isShortMovieFilter}
        />
        <MoviesCardList
          onCardDelete={onCardDelete}
          cards={showedMovies}
          savedMode={true}
          savedMovies={savedMovies}
        />
      </section>
    </main>
  )
}

export default SavedMovies;