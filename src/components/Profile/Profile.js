import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setDefaultValues } = useFormWithValidation();
  const [isButtonActive, setIsButtonActive] = React.useState(false);

  React.useEffect(() => {
    setDefaultValues(currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    checkValues();
  }, [values]);

  function handleEdit() {
    props.setIsEditProfileActive(true);
  }

  function checkValues() {
    setIsButtonActive((
        isValid 
        && !(
          values.name == currentUser.name
          && values.email == currentUser.email
        )
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onUpdateUser(values);
    }
  }

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <ul className='profile__form-list'>
          <li className='profile__field'>
            <span id="name-error" className={`profile__error profile__error_type_name name-error ${errors.name ? 'profile__error_active' : ''}`}>{errors.name}</span>
            <div className='profile__field-container'>
              <label className='profile__label'>Имя</label>
              <input 
                onChange={handleChange} 
                minLength="2"
                maxLength="40"
                className='profile__input' 
                type='text' 
                name="name"
                id="name"
                value={values.name ?? currentUser.name}
                disabled={!props.isEditProfileActive}
                required
              ></input>
            </div>
          </li>
          <li className='profile__field'>
            <div className='profile__field-container'>
              <label className='profile__label'>E-mail</label>
              <input 
                onChange={handleChange} 
                className='profile__input' 
                type='email' 
                name="email"
                id="email"
                value={values.email ?? currentUser.email}
                disabled={!props.isEditProfileActive}
                required
              ></input>
            </div>
            <span id="email-error" className={`profile__error profile__error_type_email email-error ${errors.email ? 'profile__error_active' : ''}`}>{errors.email}</span>
          </li>
        </ul>
        <div className={`profile__edit ${props.isEditProfileActive ? 'profile__edit_disabled' : ''}`}>
          <button onClick={handleEdit} className='profile__button profile__button_type_edit' type='button'>Редактировать</button>
          <button onClick={props.onSignOut} className='profile__button profile__button_type_logout'>Выйти из аккаунта</button>
        </div>
        <div className={`profile__save-changes ${props.isEditProfileActive ? 'profile__save-changes_active' : ''}`}>
          <span className='profile__submit-error'>{props.editProfileError}</span>
          <button onClick={handleSubmit} disabled={!isButtonActive} className={`profile__button profile__button_type_save ${!isButtonActive ? 'profile__button_disabled' : ''}`}>Сохранить</button>
        </div>
      </form>
    </section>
  )
}

export default Profile;