import React from 'react';
import './MoviesCard.css';
import poster from '../../images/poster.jpg';

function MoviesCard(params) {
  function getButtonClass(saved) {
    if (saved) {
      return 'card__save-button_delete';
    } else {
      return (Math.floor(Math.random() * 2)) ? 'card__save-button_active' : '';
    }
  }
  return (
    <li className='card'>
      <div className='card__info'>
        <div className='card__description'>
          <h3 className='card__title'>33 слова о дизайне</h3>
          <p className='card__duration'>1ч 47м</p>
        </div>
        <button 
          className={`card__save-button ${getButtonClass(params.saved)}`}
          type='button' 
          aria-label='Сохранить в избранное'
        ></button>
      </div>
      <a className='card__link' href='https://ya.ru/'>
        <img className='card__link-image' src={poster} alt='film poster' />
      </a>
    </li>
  )
}

export default MoviesCard;