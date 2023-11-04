import React from 'react'
import './AboutMe.css'
import photo from '../../../images/photo.png'

export default function AboutMe() {
  return (
    <div className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__main-container'>
        <div className='about-me__info-container'>
          <h3 className='about-me__subtitle'>Виталий</h3>
          <p className='about-me__caption'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&nbsp;дочь.
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. <br className='about-me__text-line-break'/>С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='about-me__git-link' href='https://github.com/msrdnv'>Github</a>
        </div>
        <img className='about-me__photo' src={photo} alt='Фотография студента'/>
      </div>
    </div>
  );
}
