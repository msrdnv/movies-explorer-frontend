import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import logo from '../../images/logo.svg'

export default function Login() {
  return (
    <main className='login'>
      <section className='login__container'>
        <Link className='login__nav-logo' to='/'>
          <img className='login__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form'>
          <label className='login__label' htmlFor='login-email-input'>E-mail</label>
          <input className='login__input' type='email' placeholder='Введите адрес электронной почты' name='login-email-input' id='login-email-input' required/>
          <span className='login__error'></span>
          <label className='login__label' htmlFor='login-password-input'>Пароль</label>
          <input className='login__input' type='password' placeholder='Введите пароль' name='login-password-input' id='login-password-input' minLength='2' maxLength='30' required/>
          <span className='login__error'></span>
          <button className='login__submit-button' type='submit'>Войти</button>
        </form>
        <p className='login__caption'>Ещё не зарегистрированы?&nbsp;<Link to='/signup' className='login__caption-link'>&nbsp;Регистрация</Link></p>
      </section>
    </main>
  );
}
