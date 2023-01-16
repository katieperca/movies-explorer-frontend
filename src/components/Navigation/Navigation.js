import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Navigation.css';
import headerLogo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';

function Navigation(props) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function changeBurgerStatus() {
    setIsMenuOpen(!(isMenuOpen));
  }

  const navigationClass = (isMenuOpen) ? 'navigation navigation_opened' : 'navigation';

  return (
    <nav className={navigationClass}>
      <Link to='/' className='navigation__logo'>
        <img className='navigation__logo-image logo' src={headerLogo} alt='movies explorer logo' />
      </Link>
      <Switch>
        <Route exact path='/signin'/>
        <Route exact path='/signup'/>
        <Route path='*'>
          {props.loggedIn ? (
            <div className='navigation__block-wrapper'>
              <div className='navigation__block'>
                <button onClick={changeBurgerStatus} className='navigation__button_close' aria-label='Закрыть меню'></button>
                <ul className='navigation__list navigation__list_main'>
                  <li className='navigation__item navigation__item_main navigation__item_burger'>
                    <Link to="/" onClick={changeBurgerStatus} className={`navigation__link ${location.pathname === '/' ? 'navigation__link_active' : ''}`}>
                      Главная
                    </Link>
                  </li>
                  <li className='navigation__item navigation__item_main'>
                    <Link to="/movies" onClick={changeBurgerStatus} className={`navigation__link ${location.pathname === '/movies' ? 'navigation__link_active' : ''}`}>
                      Фильмы
                    </Link>
                  </li>
                  <li className='navigation__item navigation__item_main'>
                    <Link to="/saved-movies" onClick={changeBurgerStatus} className={`navigation__link ${location.pathname === '/saved-movies' ? 'navigation__link_active' : ''}`}>
                      Сохранённые фильмы
                    </Link>
                  </li>
                </ul>
                <div className='navigation__profile-item navigation__item_profile'>
                  <Link to="/profile" onClick={changeBurgerStatus} className='navigation__link navigation__link_profile'>
                    Аккаунт
                  </Link>
                </div>
              </div>
              <button onClick={changeBurgerStatus} className='navigation__button' aria-label='Открыть меню'></button>
            </div>
            ) : (
            <ul className='navigation__list navigation__list_landing'>
              <li className='navigation__item navigation__item_landing'>
                <Link to="/signup" className='navigation__link navigation__link_landing'>
                  Регистрация
                </Link>
              </li>
              <li className='navigation__item navigation__item_landing navigation__item_singin'>
                <Link to="/signin" className='navigation__link navigation__link_landing navigation__link_singin'>
                    Войти
                </Link>
              </li>
            </ul>
          )}
        </Route>
      </Switch>
    </nav>
  )
}

export default Navigation;