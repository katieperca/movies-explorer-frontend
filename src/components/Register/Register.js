import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <section className='register'>
      <form className='register__form'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <div className='register__field'>
          <label className='register__label'>Имя</label>
          <input className='register__input' type='text' minLength="2" maxLength="40" placeholder='Виталий' required></input>
          <span id="name-error" className="register__error name-error"></span>
        </div>
        <div className='register__field'>
          <label className='register__label'>E-mail</label>
          <input className='register__input' type='email' placeholder='pochta@yandex.ru' required></input>
          <span id="email-error" className="register__error email-error"></span>
        </div>
        <div className='register__field'>
          <label className='register__label'>Пароль</label>
          <input className='register__input register__input_error' type='password'required></input>
          <span id="password-error" className="register__error register__error_active password-error">Что-то пошло не так...</span>
        </div>
        <button className='register__submit-button' type='submit'>Зарегистрироваться</button>
      </form>
      <p className='register__login-text'>Уже зарегистрированы?&nbsp;
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </p>
    </section>
  )
}

export default Register;