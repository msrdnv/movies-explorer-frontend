import React from 'react'
import './Profile.css'
import Header from '../Header/Header'
import { mainApi } from '../../utils/MainApi'
import { emailRegex, nameRegex } from '../../utils/constants'
import { handleEmailConflictError, disableApiConflictErrors } from '../../utils/utils'
import { useForm } from '../../hooks/useForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Profile({ onLogout }) {

  const { currentUser, setCurrentUser } = React.useContext( CurrentUserContext );
  const { values, handleChange } = useForm({ name: currentUser.name, email: currentUser.email });

  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const [isApiError, setIsApiError] = React.useState(false);
  const [isEmailConflictError, setIsEmailConflictError] = React.useState(false);

  React.useEffect(() => {
    disableApiConflictErrors(setIsApiError, setIsEmailConflictError);
    (values.name && values.email) && (isNameValid & isEmailValid) && (values.name !== currentUser.name || values.email !== currentUser.email)
    ? setIsFormValid(true)
    : setIsFormValid(false)
  }, [isNameValid, isEmailValid, currentUser.email, currentUser.name, values])

  React.useEffect(() => {
    nameRegex.test(values.name) && values.name.length > 2 && values.name.length <= 30
    ? setIsNameValid(true)
    : setIsNameValid(false)
  }, [values.name])

  React.useEffect(() => {
    emailRegex.test(values.email)
    ? setIsEmailValid(true)
    : setIsEmailValid(false)
  }, [values.email])

  const handleEditProfile = ({ name, email }) => {
    disableApiConflictErrors(setIsApiError, setIsEmailConflictError)
    mainApi.editCurrentUser({ name, email }, localStorage.getItem('token'))
    .then((data) => setCurrentUser(data))
    .catch((err) => handleEmailConflictError(err, setIsApiError, setIsEmailConflictError))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditProfile({
      email: values.email,
      name: values.name,
    });
  }

  return (
    <>
      <Header/>
      <main className='profile'>
        <section className='profile__container'>
          <h1 className='profile__title'>Привет, {currentUser.name || 'Виталий'}!</h1>
          <form className='profile__form' onSubmit={handleSubmit} noValidate>
            <div className='profile__inputs'>
              <label className='profile__label' htmlFor='profile-name'>Имя</label>
              <input
                className='profile__input'
                defaultValue={currentUser.name || ''}
                type='text'
                placeholder='Имя'
                name='name'
                minLength={2}
                maxLength={30}
                onChange={handleChange}
                id='profile-name'
              />
            </div>
            <div className='profile__inputs profile__inputs_place-under-bar'>
              <label className='profile__label' htmlFor='profile-email'>E-mail</label>
              <input
                className='profile__input'
                defaultValue={currentUser.email || ''}
                type='email' placeholder='E-mail'
                name='email'
                onChange={handleChange}
                id='profile-email'
              />
            </div>
            <span className='profile__error'>
              {isApiError
              ? (isEmailConflictError ? 'Пользователь с таким email уже существует.' : 'При обновлении профиля произошла ошибка.')
              : ''
            }</span>
            <button className={isFormValid ? 'profile__update-button' : 'profile__update-button profile__update-button_disabled'} type='submit' disabled={!isFormValid}>
              Редактировать
            </button>
          </form>
          <button className='profile__logout-button' type='button' onClick={onLogout}>Выйти из аккаунта</button>
        </section>
      </main>
    </>
  );
}
