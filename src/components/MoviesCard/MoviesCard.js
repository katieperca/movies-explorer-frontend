import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, savedMode, onCardDelete, onCardLike, savedMovies}) {
  let movie = card;
  prepareCard();

  React.useEffect(() => {
    movie = card;
    prepareCard();
  }, [card]);

  function isSaved(id)  {
    if (savedMovies) {
      const  savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === id);
      if (savedMovie !== undefined) {
        return savedMovie._id;
      } else  {
        return false;
      }
    }
  }

  function getDuration(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    let result = [];
    if (hours > 0) {
      result.push(`${hours}ч`);
    }
    if (minutes > 0) {
      result.push(`${minutes}м`);
    }
    return result.join(' ');
  }

  function getButtonClass() {
    if (savedMode) {
      return 'card__save-button_delete';
    } else if (isSaved(card.id)) {
      return 'card__save-button_active';
    }
    return '';
  }

  function saveMovie() {
    if (movie) {
      let savedModieId = 0;
      if (savedModieId = isSaved(movie.id)) {
        onCardDelete(savedModieId);
      } else if (savedMode) {
        onCardDelete(movie._id);
      } else {
        onCardLike(movie);
      }
    }
  }

  function prepareCard() {
    if (!savedMode) {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    }
  }

  return (
    <li className='card'>
      <div className='card__info'>
        <div className='card__description'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          <p className='card__duration'>{getDuration(movie.duration)}</p>
        </div>
        <button 
          onClick={saveMovie}
          className={`card__save-button ${getButtonClass()}`}
          type='button' 
          aria-label='Сохранить в избранное'
        ></button>
      </div>
      <a className='card__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='card__link-image' src={movie.thumbnail} alt='film poster' />
      </a>
    </li>
  )
}

export default MoviesCard;