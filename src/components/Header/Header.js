import React from 'react';
// import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation.js';

function Header(props) {
  if (props.is404) {
    return
  }
  const headerClass = getHeaderClass(props.page);

  function getHeaderClass(page) {
    let className = 'header';
    switch(page) {
      case '/signin':
      case '/signup':
        className += ' header_auth';
        break;
      case '/':
        className += ' header_main';
        break;
      default:
    }
    return className;
  }

  return (
    <header className={headerClass}>
      {/* <div className='header__wrapper'> */}
        <Navigation 
          loggedIn={props.loggedIn}
        />
      {/* </div> */}
    </header>
  )
}

export default Header;