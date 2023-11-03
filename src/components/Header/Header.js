import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'
import icon from '../../images/account-icon.svg'
import NavTab from '../NavTab/NavTab'
import { AppContext } from '../../contexts/AppContext.js'

export default function Header() {

  const app = React.useContext(AppContext);
  const location = useLocation();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  function toggleBurgerMenu() {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
    console.log(!isBurgerMenuOpened);
  }

  return (
    <div className='header'>
      <Link className='header__nav-logo' to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта'/>
      </Link>
      {app.isLoggedIn
      ? (<>
          <nav className='header__nav-menu header__nav-menu_logged'>
            <Link className='header__nav-link header__nav-link_logged' to='/movies'>Фильмы</Link>
            <Link className='header__nav-link header__nav-link_logged' to='/saved-movies'>Сохранённые фильмы</Link>
            <Link className='header__nav-link header__nav-link_logged' to='/profile'>
              <button className='header__nav-button_logged'>Аккаунт
                <div className={location.pathname==='/' ? 'header__nav-button-logo-container' : 'header__nav-button-logo-container header__nav-button-logo-container_theme-dark'}>
                  <img src={icon} alt='Иконка ссылки аккаунта'></img>
                </div>
              </button>
            </Link>
          </nav>
          <button className={isBurgerMenuOpened ? 'header__burger-menu-button header__burger-menu-button_active' : 'header__burger-menu-button'} type='button' onClick={toggleBurgerMenu}/>
          {isBurgerMenuOpened ? <NavTab/> : ''}
        </>)
      : (<nav className='header__nav-menu'>
          <Link className='header__nav-link' to='/signup'>Регистрация</Link>
          <Link className='header__nav-link' to='/signin'>
            <button className='header__nav-button'>Войти</button>
          </Link>
        </nav>)
      }
    </div>
  );
}
