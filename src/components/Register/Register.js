import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import logo from '../../images/logo.svg'

export default function Register() {
  return (
    <div className='register'>
      <div className='register__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form'>
          <label className='register__label' htmlFor='register-name-input'>Имя</label>
          <input className='register__input' type='text' name='register-name-input' id='register-name-input' required/>
          <span className='register__error'></span>
          <label className='register__label' htmlFor='register-email-input'>E-mail</label>
          <input className='register__input' type='email' name='register-email-input' id='register-email-input' required/>
          <span className='register__error'></span>
          <label className='register__label' htmlFor='register-password-input'>Пароль</label>
          <input className='register__input' type='password' name='register-password-input' id='register-password-input' required/>
          <span className='register__error'>Что-то пошло не так...</span>
          <button className='register__submit-button' type='submit'>Зарегистрироваться</button>
        </form>
        <p className='register__caption'>Уже зарегистрированы? <Link to='/signin' className='register__caption-link'>Войти</Link></p>
      </div>
    </div>
  );
}
