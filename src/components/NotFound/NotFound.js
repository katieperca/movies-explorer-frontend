import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound({ setIs404, goBack }) {
  React.useEffect(() => {
    setIs404(true);
  }, []);

  return (
    <section className='notfound'>
      <div className='notfound__container'>
        <div className='notfound__text-block'>
          <h1 className='notfound__title'>404</h1>
          <p className='notfound__text'>Страница не найдена</p>
        </div>
        <Link to="/" onClick={goBack} className='notfound__link'>
          Назад
        </Link>
      </div>
    </section>
  )
}

export default NotFound;