import React from 'react'
import './Techs.css'

export default function Techs() {
  return (
    <div className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <div className='techs__main-container'>
        <h3 className='techs__main-title'>7 технологий</h3>
        <p className='techs__caption'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className='techs__blocks'>
        <p className='techs__block'>HTML</p>
        <p className='techs__block'>CSS</p>
        <p className='techs__block'>JS</p>
        <p className='techs__block'>React</p>
        <p className='techs__block'>Git</p>
        <p className='techs__block'>Express.js</p>
        <p className='techs__block'>mongoDB</p>
      </div>
    </div>
  );
}
