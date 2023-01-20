import React from 'react';
import './InfoTooltip.css';
import imageError from '../../images/fail.svg';
import imageSuccess from '../../images/success.svg';

function InfoTooltip(props) {
  const image = props.state.isSucceed ? imageSuccess : imageError;
  // const message = props.isRegisterSucceed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <section className={`infotooltip popup ${props.state.isOpen ? "infotooltip_opened" : ""}`}>
      <div className="infotooltip__container">
        <img className="infotooltip__icon" src={image} alt="Статус авторизации" />
        <h2 className="infotooltip__message">{props.state.message}</h2>
        <button onClick={props.onClose} className="infotooltip__close-button button button_type_close" type="button" aria-label="Закрыть"></button>
      </div>
    </section>
  )
}

export default InfoTooltip;
