import React from 'react';
import './AboutMe.css';
import aboutmePhoto from '../../images/about-me-photo.jpg';

function AboutMe() {
  return (
    <section className='aboutme' id='about_me'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__container'>
        <div className='aboutme__info-container'>
          <h3 className='aboutme__name'>Виталий</h3>
          <p className='aboutme__about'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutme__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <ul className='aboutme__list'>
            <li className='aboutme__item'>
              <a className='aboutme__link' href='https://www.facebook.com/' target='_blank' rel='noreferrer'>Facebook</a>
            </li>
            <li className='aboutme__item'>
              <a className='aboutme__link' href='https://github.com/' target='_blank' rel='noreferrer'>Github</a>
            </li>
          </ul>
        </div>
        <img className='aboutme__photo' src={aboutmePhoto} alt='student' />
      </div>
    </section>
  )
}

export default AboutMe;