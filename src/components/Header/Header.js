import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'
import icon from '../../images/account-icon.svg'
import { AppContext } from '../../contexts/AppContext.js'

export default function Header() {

  const app = React.useContext(AppContext);
  const location = useLocation();

  return (
    <div className='header'>
      <Link className='header__nav-logo' to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта'/>
      </Link>
      {app.isLoggedIn
      ? (<nav className='header__nav-menu header__nav-menu_state-logged'>
          <Link className='header__nav-link header__nav-link_state-logged' to='/movies'>Фильмы</Link>
          <Link className='header__nav-link header__nav-link_state-logged' to='/saved-movies'>Сохранённые фильмы</Link>
          <Link className='header__nav-link header__nav-link_state-logged' to='/profile'>
            <button className='header__nav-button-state-logged'>Аккаунт
              <div className={location.pathname==='/' ? 'header__nav-button-logo-container' : 'header__nav-button-logo-container header__nav-button-logo-container_theme-dark'}>
                <img src={icon} alt='Иконка ссылки аккаунта'></img>
              </div>
            </button>
          </Link>
        </nav>)
      : (<nav className='header__nav-menu'>
          <Link className='header__nav-link' to='/signup'>Регистрация</Link>
          <Link className='header__nav-link' to='/signin'>
            <button className='header__nav-button'>Войти</button>
          </Link>
        </nav>)}
    </div>
  );
}
