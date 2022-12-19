import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <section className='login'>
      <form className='login__form'>
        <h1 className='login__title'>Рады видеть!</h1>
        <div className='login__field'>
          <label className='login__label'>E-mail</label>
          <input className='login__input' type='email' placeholder='pochta@yandex.ru'></input>
          <span id="email-error" className="login__error email-error"></span>
        </div>
        <div className='login__field'>
          <label className='login__label'>Пароль</label>
          <input className='login__input' type='password'></input>
          <span id="email-error" className="login__error email-error"></span>
          <span id="password-error" className="login__error login__error_active password-error">Что-то пошло не так...</span>
        </div>
        <button className='login__submit-button' type='submit'>Войти</button>
      </form>
      <p className='login__login-text'>Ещё не зарегистрированы?&nbsp;
        <Link to="/signup" className="login__login-link">
        Регистрация
        </Link>
      </p>
    </section>
  )
}

export default Login;