import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    props.onLogIn(values);
  }
  return (
    <section className='login'>
      <form onSubmit={handleSubmit} className='login__form'>
        <h1 className='login__title'>Рады видеть!</h1>
        <div className='login__field'>
          <label className='login__label'>E-mail</label>
          <input 
            onChange={handleChange} 
            className={`login__input ${errors.name ? 'login__input_error' : ''}`}
            type='email' 
            name="email"
            value={values.email ??  ''}
            id="email"
            placeholder='pochta@yandex.ru'
            required
          ></input>
          <span id="email-error" className={`login__error email-error ${errors.name ? 'login__error_active' : ''}`}></span>
        </div>
        <div className='login__field'>
          <label className='login__label'>Пароль</label>
          <input 
            onChange={handleChange}
            className={`login__input ${errors.name ? 'login__input_error' : ''}`}
            type='password'
            name="password" 
            value={values.password ??  ''}
            id="password"
            required
          ></input>
          <span id="password-error" className={`login__error password-error ${errors.name ? 'login__error_active' : ''}`}></span>
        </div>
        <p className="register__submit-error">{props.loginError}</p>
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