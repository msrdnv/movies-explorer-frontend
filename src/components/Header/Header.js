import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'


export default function Header() {
  return (
    <div className='header'>
      <img className='header__logo' src={logo} alt='Логотип сайта'/>
      <nav className='header__nav-menu'>
        <Link className='header__nav-link' to='/signup'>Регистрация</Link>
        <Link className='header__nav-link' to='/signin'>
          <button className='header__nav-button'>Войти</button>
        </Link>
      </nav>
    </div>
  );
}
