import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://ya.ru/' target='_blank' rel='noreferrer'>
            Статичный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://ya.ru/' target='_blank' rel='noreferrer'>
            Адаптивный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://ya.ru/' target='_blank' rel='noreferrer'>
            Одностраничное приложение
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;