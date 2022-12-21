import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='searchform'>
      <div className='searchform__container'>
        <form className='searchform__form'>
          <div className='searchform__search'>
            <input className='searchform__input' type='search' placeholder='Фильм' />
            <button className='searchform__button' type='submit' aria-label='search films' />
          </div>
          <label className='searchform__toggle'>
            <span>
              <input className='searchform__checkbox' type='checkbox' id='short' />
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