import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__info'>
        <ul className='about-project__list'>
          <li className='about-project__info-title'>Дипломный проект включал 5 этапов</li>
          <li className='about-project__info-caption'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
        </ul>
        <ul className='about-project__list'>
          <li className='about-project__info-title'>На выполнение диплома ушло 5 недель</li>
          <li className='about-project__info-caption'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
        </ul>
      </div>
      <ul className='about-project__graphic-data'>
        <li className='about-project__graphic-data-element about-project__graphic-data-element_green'>1 неделя</li>
        <li className='about-project__graphic-data-element about-project__graphic-data-element_grey'>4 недели</li>
        <li className='about-project__graphic-data-element'>Back-end</li>
        <li className='about-project__graphic-data-element'>Front-end</li>
      </ul>
    </section>
  );
}
