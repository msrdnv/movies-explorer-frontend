import React from 'react'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__nav-block'>
        <p className='portfolio__nav-caption'>Статичный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/how-to-learn/'>↗</a>
      </div>
      <div className='portfolio__nav-block'>
        <p className='portfolio__nav-caption'>Адаптивный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/russian-travel/'>↗</a>
      </div>
      <div className='portfolio__nav-block'>
        <p className='portfolio__nav-caption'>Одностраничное приложение</p>
        <a className='portfolio__nav-link' href='https://mesto-frontend.msrdnv.nomoredomainsrocks.ru/'>↗</a>
      </div>
    </div>
  );
}
