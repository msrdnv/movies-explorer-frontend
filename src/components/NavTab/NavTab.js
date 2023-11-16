import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavTab.css'
import icon from '../../images/account-icon.svg'

export default function NavTab({onToggle}) {

  return (
    <div className='nav-tab'>
      <nav className='nav-tab__popup'>
        <button className='nav-tab__close-button' onClick={onToggle}/>
        <div className='nav-tab__menu-container'>
          <NavLink
            className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`}
            to='/'>
              Главная
          </NavLink>
          <NavLink
            className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`}
            to='/movies'>
              Фильмы
          </NavLink>
          <NavLink
            className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`}
            to='/saved-movies'>
              Сохранённые фильмы
          </NavLink>
          <Link className='nav-tab__account-button' to='/profile'>
            Аккаунт
            <div className='nav-tab__account-button-logo'>
              <img src={icon} alt='Иконка ссылки аккаунта'></img>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
