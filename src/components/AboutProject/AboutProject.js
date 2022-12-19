import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='aboutproject' id='about_project'>
      <h2 className='aboutproject__title'>О проекте</h2>
      <ul className='aboutproject__list'>
        <li className='aboutproject__item'>
          <h3 className='aboutproject__heading'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutproject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='aboutproject__item'>
          <h3 className='aboutproject__heading'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutproject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='aboutproject__timeline'>
        <div className='aboutproject__timeline-column'>
          <p className='aboutproject__timeline-row aboutproject__timeline-row_small'>1 неделя</p>
          <p className='aboutproject__timeline-row aboutproject__timeline-row_description'>Back-end</p>
        </div>
        <div className='aboutproject__timeline-column'>
          <p className='aboutproject__timeline-row aboutproject__timeline-row_big'>4 недели</p>
          <p className='aboutproject__timeline-row aboutproject__timeline-row_description'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;