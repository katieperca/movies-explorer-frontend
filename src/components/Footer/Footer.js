import React from 'react';
import './Footer.css';

function Footer(params) {
  const pagesWithFooter = [
    '/',
    '/movies',
    '/saved-movies'
  ];
  if (pagesWithFooter.includes(params.page)) {
    return (
      <footer className='footer'>
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__info'>
          <p className="footer__copyright">© { new Date().getFullYear() }</p>
          <nav className='footer__navigation'>
            <ul className='footer__navigation-list'>
              <li className='footer__navigation-item'>
                <a className='footer__navigation-link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
              </li>
              <li className='footer__navigation-item'>
                <a className='footer__navigation-link' href='https://github.com/katieperca' target='_blank' rel='noreferrer'>Github</a>
              </li>
            </ul>
          </nav>
          
        </div>
      </footer>
    )
  } else {
    return
  }
}

export default Footer;