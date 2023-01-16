import React from 'react';
import './SearchForm.css';
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import moviesHelper from '../../utils/MoviesHelper.js';

function SearchForm({onSearch, savedMode = false}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = React.useState('');  
  const {values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();
  const [isShortMovieFilter,  setIsShortMovieFilter] = React.useState(false);
  const mount = React.useRef(false);

  React.useEffect(() => {
    if (!savedMode && moviesHelper.getSavedQuery()) {
      values.query = moviesHelper.getSavedQuery();
      setIsValid(true);
      if (!savedMode) {
        setIsShortMovieFilter(moviesHelper.getSavedIsShortMovieFilter());
      } else {
        setIsShortMovieFilter(false);
      }
      // onSearch(values.query.toLowerCase().trim(), isShortMovieFilter);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else if (values.query != '' || savedMode) {
      onSearch(values.query, isShortMovieFilter);
    }
  }, [isShortMovieFilter]);

  function onShortFilmSearch(e) {
    setIsShortMovieFilter(e.target.checked);
  }

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    if (!isValid && !savedMode) {
      setErrorMessage('Нужно ввести ключевое слово.');
    } else if (values.query) {
      onSearch(values.query.toLowerCase().trim(), isShortMovieFilter);
      setErrorMessage('');
    }
  }

  return (
    <section className='searchform'>
      <div className='searchform__container'>
        <form className='searchform__form' noValidate>
          <div className='searchform__search'>
            <input 
              onChange={handleChange} 
              className={`searchform__input ${errors.name ? 'searchform__input_error' : ''}`}
              name='query'
              value={values.query ?? ''}
              id='query'
              placeholder='Фильм'
              required
            />
            <span id="searchform-error" className="searchform__error">{errorMessage}</span>
            <button onClick={handleSubmit} className='searchform__button' type='submit' aria-label='search films' />
          </div>
          <label className='searchform__toggle'>
            <span>
              <input 
                onChange={onShortFilmSearch}
                checked={isShortMovieFilter}
                className='searchform__checkbox' 
                type='checkbox' 
              />
              <span className='searchform__slider' />
            </span>
            <span className='searchform__label'>Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;