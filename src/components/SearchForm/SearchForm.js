import React from 'react';
import './SearchForm.css';
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { isMoviesPage, getQueryFromLocal } from '../../utils/utils.js';

function SearchForm({onSearch, savedMode, isShortMovieFilter, onIsShortFilms}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = React.useState('');  
  const {values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

  React.useEffect(() => {
    if (isMoviesPage() && getQueryFromLocal()) {
      values.query = getQueryFromLocal();
      setIsValid(true);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setErrorMessage('Нужно ввести ключевое слово.');
    } else {
      onSearch(values.query);
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
                onChange={onIsShortFilms}
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