import React from 'react'
import './Profile.css'
import Header from '../Header/Header'

export default function Profile({onLogout}) {

  return (
    <>
      <Header/>
      <main className='profile'>
        <section className='profile__container'>
          <h1 className='profile__title'>Привет, Виталий!</h1>
          <form className='profile__form'>
            <div className='profile__inputs'>
              <label className='profile__label' htmlFor='profile-name'>Имя</label>
              <input className='profile__input' type='text' placeholder='Имя' name='profile-name-input' id='profile-name'/>
            </div>
            <div className='profile__inputs profile__inputs_place-under-bar'>
              <label className='profile__label' htmlFor='profile-email'>E-mail</label>
              <input className='profile__input' type='email' placeholder='E-mail' name='profile-email-input' id='profile-email'/>
            </div>
            <button className='profile__update-button' type='submit'>Редактировать</button>
          </form>
          <button className='profile__logout-button' type='button' onClick={onLogout}>Выйти из аккаунта</button>
        </section>
      </main>
    </>
  );
}
