import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import logo from '../../images/logo.svg'

export default function Login() {
  return (
    <div className='login'>
      <div className='login__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form'>
          <label className='login__label' htmlFor='login-email-input'>E-mail</label>
          <input className='login__input' type='email' name='login-email-input' id='login-email-input' required/>
          <span className='login__error'></span>
          <label className='login__label' htmlFor='login-password-input'>Пароль</label>
          <input className='login__input' type='password' name='login-password-input' id='login-password-input' required/>
          <span className='login__error'>Что-то пошло не так...</span>
          <button className='login__submit-button' type='submit'>Войти</button>
        </form>
        <p className='login__caption'>Ещё не зарегистрированы? <Link to='/signup' className='login__caption-link'>Регистрация</Link></p>
      </div>
    </div>
  );
}
