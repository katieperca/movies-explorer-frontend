import React from 'react';
import './SearchForm.css';
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function SearchForm({onSearch, queryDefault = '', isShortMovieFilterDefault = false}) {
  const [errorMessage, setErrorMessage] = React.useState('');  
  const {values, handleChange, errors, isValid, setDefaultValues, setIsValid } = useFormWithValidation();
  const [isShortMovieFilter,  setIsShortMovieFilter]  = React.useState(false);
  const didMount = React.useRef(false);

  React.useEffect(() => {
    setDefaultValues({query: queryDefault});
    setIsShortMovieFilter(isShortMovieFilterDefault);
    if (queryDefault) {
      setIsValid(true);
    }
  }, [queryDefault, isShortMovieFilterDefault]);

  React.useEffect(() => {
    if (values.query) {
      handleSubmit();
    }
  }, []);

  React.useEffect(() => {
    if (values.query) {
      handleSubmit();
    }
  }, [isShortMovieFilter]);

  function onShortFilmSearch(e) {
    setIsShortMovieFilter(e.target.checked);
    // handleSubmit(e);
  }

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    if (!isValid) {
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
                checked={isShortMovieFilter ?? false}
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