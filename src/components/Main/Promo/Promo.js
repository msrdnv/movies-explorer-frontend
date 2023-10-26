import React from 'react'
import './Promo.css'
import webLogo from '../../../images/web-logo.svg'

export default function Promo() {
  return (
    <div className='promo'>
      <div className='promo__text-container'>
        <h1 className='promo__title'>Учебный проект студента факультета<br/>Веб-разработки.</h1>
        <p className='promo__caption'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href='#about-project'>
          <button className='promo__about-project-button'>Узнать больше</button>
        </a>
      </div>
      <img className='promo__logo' src={webLogo} alt='Логотип WEB'/>
    </div>
  );
}
