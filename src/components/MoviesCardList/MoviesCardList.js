import React from 'react'
import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import { cards, savedCards } from '../../utils/constants'

export default function MoviesCardList() {

  const location = useLocation();
  let currentCards = [];
  location.pathname === '/movies' ? currentCards = cards : currentCards = savedCards;

  return (
    <div className='movies-card-list'>
      {(cards && cards.length > 0)
      ? (<div className='movies-card-list__container'>
        {currentCards.map((card) => (
          <div key={card._id} className='movies-card'>
            <MoviesCard card={card}/>
          </div>))}
        </div>)
      : (<span className='movies-card-list__null-result'>Нет результатов поиска!</span>)
      }
      {currentCards.length >= 5
      ? (<button className='movies-card-list__more-button' type='button'>Ещё</button>)
      : (<div className='movies-card-list__devider'/>)
      }
    </div>
  );
}
