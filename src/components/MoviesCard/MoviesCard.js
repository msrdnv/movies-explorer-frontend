import React from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
import { BASE_IMAGE_URL } from '../../utils/constants'

export default function MoviesCard({savedMovies, onClick, card, onDisableLike}) {

  const checkIsSaved = () => {
    if (savedMovies.length > 0) {
      return savedMovies.some((item) => item.nameRU === card.nameRU)
    } else {
      return false
    }
  }

  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(checkIsSaved);

  const handleClick = () => {
    onClick(card, isSaved, setIsSaved)
  }

  return (
    <>
      <h2 className='movies-card__name'>{card.nameRU}</h2>
      <p className='movies-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
      <a className='movies-card__image-link' href={card.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='movies-card__image'
          src={location.pathname === '/movies' ? `${BASE_IMAGE_URL}${card.image.url}` : card.image}
          alt={card.nameRU}
        />
      </a>
      <button
        className={location.pathname === '/saved-movies'
          ? 'movies-card__button movies-card__button_delete'
          : ((location.pathname === '/movies' && isSaved) ? 'movies-card__button movies-card__button_saved' : 'movies-card__button')}
        type='button'
        onClick={handleClick}
        disabled={onDisableLike}>
          {(location.pathname === '/movies' && !isSaved) ? 'Cохранить' : ''}
      </button>
    </>
  );
}
