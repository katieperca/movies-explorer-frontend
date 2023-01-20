import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';
import { isMoviesPage } from '../../utils/utils.js';
import useWindowSize from '../../hooks/useWindowSize.js';

function MoviesCardList({ cards, onCardLike, onCardDelete, savedMovies, savedMode }) {
  const windowWidth = useWindowSize();
  const [cardsListProperties, setCardsListProperties] = React.useState({ total: 12, more: 3});
  const [showedCards, setShowedCards] = React.useState([]);

  React.useEffect(() => {
    if (isMoviesPage()) {
      if (windowWidth <= 480) {
        setCardsListProperties({total: 5, more: 2});
      } else if (windowWidth <= 768) {
        setCardsListProperties({total: 8, more: 2});
      } else {
        setCardsListProperties({total: 12, more: 3});
      }
    }
  }, [windowWidth]);

  React.useEffect(() => {
    setShowedCards(cards.slice(0, cardsListProperties.total));
  }, [cards, cardsListProperties.total]);

  function onMore() {
    let newCardsCount = cardsListProperties.total + cardsListProperties.more;
    if (newCardsCount > cards.length) {
      newCardsCount = cards.length;
    }
    setCardsListProperties({ 
      total: newCardsCount, more: cardsListProperties.more
    });
  }

  return (
    <div>
      <section className='moviescardlist'>
        <ul className='moviescardlist__list'>
          { showedCards && showedCards.map((card) => {
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
      { 
        isMoviesPage() 
        && showedCards 
        && showedCards.length < cards.length 
        && (
        <button onClick={onMore} className='movies__button' aria-label='more films'>Ещё</button>
        )
      }
    </div>
  )
}

export default MoviesCardList;