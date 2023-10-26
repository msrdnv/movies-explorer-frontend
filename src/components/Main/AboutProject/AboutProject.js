import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
  return (
    <div className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__table'>
        <h3 className='about-project__table-title'>Дипломный проект включал 5 этапов</h3>
        <h3 className='about-project__table-title'>На выполнение диплома ушло 5 недель</h3>
        <p className='about-project__table-caption'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='about-project__table-caption'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about-project__scheme'>
        <p className='about-project__scheme-element about-project__scheme-element_green'>1 неделя</p>
        <p className='about-project__scheme-element about-project__scheme-element_grey'>4 недели</p>
        <p className='about-project__scheme-element'>Back-end</p>
        <p className='about-project__scheme-element'>Front-end</p>
      </div>
    </div>
  );
}
