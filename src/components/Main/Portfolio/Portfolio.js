import React from 'react'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-name'>Статичный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/how-to-learn/'>↗</a>
      </nav>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-name'>Адаптивный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/russian-travel/'>↗</a>
      </nav>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-name'>Одностраничное приложение</p>
        <a className='portfolio__nav-link' href='https://mesto-frontend.msrdnv.nomoredomainsrocks.ru/'>↗</a>
      </nav>
    </div>
  );
}
