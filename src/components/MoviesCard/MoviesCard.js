import React from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({onClick, card}) {

  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  const handleClick = () => {
    onClick(card, setIsSaved)
  }

  return (
    <>
      <h2 className='movies-card__name'>{card.nameRU}</h2>
      <p className='movies-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
      <img className='movies-card__image' src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${card.image.url}` : card.image} alt={card.nameRU}/>
      <button
        className={location.pathname === '/saved-movies'
          ? 'movies-card__button movies-card__button_delete'
          : ((location.pathname === '/movies' && isSaved) ? 'movies-card__button movies-card__button_saved' : 'movies-card__button')}
        type='button'
        onClick={handleClick}
        disabled={isSaved}
      >{(location.pathname === '/movies' && !isSaved) ? 'Cохранить' : ''}</button>
    </>
  );
}
