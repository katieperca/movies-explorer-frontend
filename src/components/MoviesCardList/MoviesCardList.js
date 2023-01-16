import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isPreloaderActive, cards, onCardLike, onCardDelete, savedMode, savedMovies }) {
  if (!isPreloaderActive) {
    return (
      <section className='moviescardlist'>
        <ul className='moviescardlist__list'>
          { cards && cards.map((card) => {
            return (
              <MoviesCard
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={card.id ?? card._id}
                card={card}
                savedMode={(savedMode)}
                savedMovies={savedMovies}
              />
            )
          })}
        </ul>
      </section>
    )
  }
}

export default MoviesCardList;