import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'
import icon from '../../images/account-icon.svg'
import NavTab from '../NavTab/NavTab'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Header() {

  const user = React.useContext(CurrentUserContext);
  const location = useLocation();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  function toggleBurgerMenu() {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  return (
    <header className='header'>
      <Link className='header__nav-logo' to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта'/>
      </Link>
      {user.isLoggedIn
      ? (<>
          <nav className='header__nav-menu header__nav-menu_logged'>
            <NavLink className={({isActive}) => `header__nav-link header__nav-link_logged ${isActive ? 'header__nav-link_active' : ''}`} to='/movies'>Фильмы</NavLink>
            <NavLink className={({isActive}) => `header__nav-link header__nav-link_logged ${isActive ? 'header__nav-link_active' : ''}`} to='/saved-movies'>Сохранённые фильмы</NavLink>
            <Link className='header__account-button' to='/profile'>Аккаунт
              <div className={location.pathname==='/' ? 'header__account-button-logo-container' : 'header__account-button-logo-container header__account-button-logo-container_theme-dark'}>
                <img src={icon} alt='Иконка ссылки аккаунта'></img>
              </div>
            </Link>
          </nav>
          <button className={isBurgerMenuOpened ? 'header__burger-menu-button header__burger-menu-button_active' : 'header__burger-menu-button'} type='button' onClick={toggleBurgerMenu}/>
          {isBurgerMenuOpened ? <NavTab onToggle={toggleBurgerMenu}/> : ''}
        </>)
      : (<nav className='header__nav-menu'>
          <Link className='header__nav-link' to='/signup'>Регистрация</Link>
          <Link className='header__nav-button' to='/signin'>Войти</Link>
        </nav>)
      }
    </header>
  );
}
