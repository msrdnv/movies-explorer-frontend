import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavTab.css'
import icon from '../../images/account-icon.svg'

export default function NavTab() {

  return (
    <div className='nav-tab__popup'>
      <nav className='nav-tab'>
        <div className='nav-tab__menu-container'>
          <NavLink className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`} to='/'>Главная</NavLink>
          <NavLink className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`} to='/movies'>Фильмы</NavLink>
          <NavLink className={({isActive}) => `nav-tab__link ${isActive ? 'nav-tab__link_active' : ''}`} to='/saved-movies'>Сохранённые фильмы</NavLink>
          <Link className='nav-tab__link' to='/profile'>
            <button className='nav-tab__account-button'>Аккаунт
              <div className='nav-tab__account-button-logo'>
                <img src={icon} alt='Иконка ссылки аккаунта'></img>
              </div>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
