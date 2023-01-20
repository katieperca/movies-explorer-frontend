import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Register({onRegister, registerError}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    onRegister(values);
  }

  return (
    <section className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__field">
          <label className="register__label">Имя</label>
          <input 
            onChange={handleChange} 
            minLength="2"
            maxLength="40" 
            className={`register__input ${errors.name ? 'register__input_error' : ''}`}
            type="text" 
            name="name"
            value={values.name ??  ''}
            id="name"
            placeholder="Виталий"
            required
          ></input>
          <span id="name-error" className={`register__error name-error ${errors.name ? 'register__error_active' : ''}`}>{errors.name}</span>
        </div>
        <div className="register__field">
          <label className="register__label">E-mail</label>
          <input 
            onChange={handleChange} 
            className={`register__input ${errors.email ? 'register__input_error' : ''}`}
            type="email" 
            name="email"
            value={values.email ??  ''}
            id="email"
            placeholder="pochta@yandex.ru"
            required
          ></input>
          <span id="email-error" className={`register__error email-error ${errors.email ? 'register__error_active' : ''}`}>{errors.email}</span>
        </div>
        <div className="register__field">
          <label className="register__label">Пароль</label>
          <input 
            onChange={handleChange} 
            className={`register__input ${errors.password ? 'register__input_error' : ''}`}
            type="password" 
            name="password" 
            value={values.password ??  ''}
            id="password"
            required
          ></input>
          <span id="password-error" className={`register__error password-error ${errors.password ? 'register__error_active' : ''}`}>{errors.password}</span>
        </div>
        <p className="register__submit-error">{registerError}</p>
        <button disabled={!isValid} className="register__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__login-text">Уже зарегистрированы?&nbsp;
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </p>
    </section>
  )
}

export default Register;