import React from 'react'
import './Promo.css'
import webLogo from '../../../images/web-logo.svg'

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__text-container'>
        <h1 className='promo__title'>Учебный проект студента факультета<br className='promo__title-line-break'/> Веб-разработки.</h1>
        <p className='promo__caption'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className='promo__about-project-button' href='#about-project'>Узнать больше</a>
      </div>
      <img className='promo__logo' src={webLogo} alt='Логотип WEB'/>
    </section>
  );
}
