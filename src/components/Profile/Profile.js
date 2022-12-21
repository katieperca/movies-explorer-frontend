import React from 'react';
import './Profile.css';

function Profile() {
  const userInfo = {
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  };

  const [name, setName] = React.useState(userInfo.name);
  const [email, setEmail] = React.useState(userInfo.email);
  const [isEditButtonActive, setIsEditButtonActive] = React.useState(true);
  const [isSaveButtonActive, setIsSaveButtonActive] = React.useState(false);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleEdit() {
    setIsEditButtonActive(!isEditButtonActive);
    setIsSaveButtonActive(!isSaveButtonActive);
  }

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <ul className='profile__form-list'>
          <li className='profile__field'>
            <label className='profile__label'>Имя</label>
            <input onChange={handleChangeName} className='profile__input' type='text' value={name}></input>
          </li>
          <li className='profile__field'>
            <label className='profile__label'>E-mail</label>
            <input onChange={handleChangeEmail} className='profile__input' type='email' value={email}></input>
          </li>
        </ul>
        <div className={`profile__edit ${!isEditButtonActive ? 'profile__edit_disabled' : ''}`}>
          <button onClick={handleEdit} className='profile__button profile__button_type_edit' type='button'>Редактировать</button>
          <button className='profile__button profile__button_type_logout'>Выйти из аккаунта</button>
        </div>
        <div className={`profile__save-changes ${isSaveButtonActive ? 'profile__save-changes_active' : ''}`}>
          <span className='profile__error' >При обновлении профиля произошла ошибка.</span>
          <button className='profile__button profile__button_type_save'>Сохранить</button>
        </div>
      </form>
    </section>
  )
}

export default Profile;