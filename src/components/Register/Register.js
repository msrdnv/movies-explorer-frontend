import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import logo from '../../images/logo.svg'
import { errorMsgRegisterName, errorMsgEmail, emailRegex, nameRegex } from '../../utils/constants';

export default function Register({ onSubmit }) {

  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  const validateName = (evt) => {
    const {value} = evt.target;
    if (nameRegex.test(value)) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const validateEmail = (evt) => {
    const {value} = evt.target;
    if (emailRegex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <main className='register'>
      <section className='register__container'>
        <Link className='register__nav-logo' to='/'>
          <img className='register__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' noValidate onSubmit={onSubmit}>
          <label className='register__label' htmlFor='register-name-input'>Имя</label>
          <input
            className='register__input'
            type='text'
            placeholder='Введите имя пользователя'
            name='register-name-input'
            id='register-name-input'
            onChange={validateName}
            minLength='2'
            maxLength='30'
            required
          />
          <span className='register__error' id='register-name-input-error'>{isNameValid ? '' : errorMsgRegisterName}</span>
          <label className='register__label' htmlFor='register-email-input'>E-mail</label>
          <input
            className='register__input'
            type='email'
            placeholder='Введите адрес электронной почты'
            name='register-email-input'
            id='register-email-input'
            onChange={validateEmail}
            required
          />
          <span className='register__error' id='register-email-input-error'>{isEmailValid ? '' : errorMsgEmail}</span>
          <label className='register__label' htmlFor='register-password-input'>Пароль</label>
          <input
            className='register__input'
            type='password'
            placeholder='Введите пароль'
            name='register-password-input'
            id='register-password-input'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='register__error' id='register-password-input-error'></span>
          <button className='register__submit-button' type='submit'>Зарегистрироваться</button>
        </form>
        <p className='register__caption'>Уже зарегистрированы?&nbsp;
          <Link to='/signin' className='register__caption-link'>&nbsp;Войти</Link>
        </p>
      </section>
    </main>
  );
}
