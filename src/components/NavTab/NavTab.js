import React from 'react'
import { Link } from 'react-router-dom'
import './NavTab.css'
import icon from '../../images/account-icon.svg'

export default function NavTab() {

  return (
    <div className='nav-tab__popup'>
      <nav className='nav-tab'>
        <div className='nav-tab__menu-container'>
          <Link className='nav-tab__link' to='/'>Главная</Link>
          <Link className='nav-tab__link' to='/movies'>Фильмы</Link>
          <Link className='nav-tab__link' to='/saved-movies'>Сохранённые фильмы</Link>
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
