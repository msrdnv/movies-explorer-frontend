import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {

  const navigate = useNavigate();

  return (
    <div className='not-found-page'>
      <h2 className='not-found-page__title'>404</h2>
      <p className='not-found-page__subtitle'>Страница не найдена</p>
      <Link className='not-found-page__return-link' onClick={navigate(-1)}>Назад</Link>
    </div>
  );
}
