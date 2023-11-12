import React from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({movies, onClick, card}) {

  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  const savedMovies = JSON.parse(localStorage.getItem('api-saved-movies'));

  React.useEffect(() => {
    if ((location.pathname === '/movies') && (movies !== undefined)) {
      const filteredMovies = movies.filter((item1) => savedMovies.some((item2) => item1.nameRU === item2.nameRU))
      filteredMovies.forEach((item) => {
        if (item.nameRU === card.nameRU) {
          setIsSaved(true)
        }
      })
    }
  }, [movies, savedMovies, location.pathname, card.nameRU])

  const handleClick = () => {
    onClick(card, isSaved, setIsSaved)
  }

  return (
    <>
      <h2 className='movies-card__name'>{card.nameRU}</h2>
      <p className='movies-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
      <a className='movies-card__image-link' href={card.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__image' src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${card.image.url}` : card.image} alt={card.nameRU}/>
      </a>
      <button
        className={location.pathname === '/saved-movies'
          ? 'movies-card__button movies-card__button_delete'
          : ((location.pathname === '/movies' && isSaved) ? 'movies-card__button movies-card__button_saved' : 'movies-card__button')}
        type='button'
        onClick={handleClick}
      >{(location.pathname === '/movies' && !isSaved) ? 'Cохранить' : ''}</button>
    </>
  );
}
