import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__text'>©<span className='footer__text-space'> </span>2020</p>
        <nav className='footer__nav-container'>
          <a className='footer__nav-link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          <a className='footer__nav-link' href='https://github.com/'>Github</a>
        </nav>
      </div>
    </div>
  );
}
