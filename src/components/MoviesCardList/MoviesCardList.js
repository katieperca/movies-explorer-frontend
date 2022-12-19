import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(params) {
  let cards = [];
  const count = (params.count) ? params.count : 12;
  for (let i=0; i < count; i++) {
    cards.push(<MoviesCard key={i} saved={params.saved}/>);
  }

  return (
    <section className='moviescardlist'>
      <ul className='moviescardlist__list'>
        {cards}
      </ul>
    </section>
  )
}

export default MoviesCardList;