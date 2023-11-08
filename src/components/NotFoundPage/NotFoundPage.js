import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage({onReturn}) {

  return (
    <main className='not-found-page'>
      <section className='not-found-page__container'>
        <h1 className='not-found-page__title'>404</h1>
        <p className='not-found-page__caption'>Страница не найдена</p>
        <Link className='not-found-page__return-link' onClick={onReturn}>Назад</Link>
      </section>
    </main>
  );
}
