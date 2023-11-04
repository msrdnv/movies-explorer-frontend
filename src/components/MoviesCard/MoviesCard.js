import React from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({card}) {

  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <>
      <h2 className='movies-card__name'>{card.name}</h2>
      <p className='movies-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
      <img className='movies-card__image' src={card.image} alt={card.name}/>
      <button className={location.pathname === '/saved-movies' ? 'movies-card__button movies-card__button_delete'
      : ((location.pathname === '/movies' && isSaved) ? 'movies-card__button movies-card__button_saved' : 'movies-card__button')}
      type='button'>{(location.pathname === '/movies' && !isSaved) ? 'Cохранить' : ''}</button>
    </>
  );
}
