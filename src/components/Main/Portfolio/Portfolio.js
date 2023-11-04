import React from 'react'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-text'>Статичный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/how-to-learn/' target='_blank' rel='noreferrer'>↗</a>
      </nav>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-text'>Адаптивный сайт</p>
        <a className='portfolio__nav-link' href='https://msrdnv.github.io/russian-travel/' target='_blank' rel='noreferrer'>↗</a>
      </nav>
      <nav className='portfolio__nav-block'>
        <p className='portfolio__nav-link-text'>Одностраничное приложение</p>
        <a className='portfolio__nav-link' href='https://mesto.msrdnv.nomoredomainsrocks.ru/' target='_blank' rel='noreferrer'>↗</a>
      </nav>
    </div>
  );
}
