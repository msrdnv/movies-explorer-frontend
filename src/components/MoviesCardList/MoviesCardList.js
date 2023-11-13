import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import {
  ERROR_MSG_API_ERROR,
  ERROR_MSG_NOT_FOUND,
  INIT_CARD_NUMBER_320,
  INIT_CARD_NUMBER_768,
  INIT_CARD_NUMBER_1280,
  EXTRA_CARD_ROW_320,
  EXTRA_CARD_ROW_768,
  EXTRA_CARD_ROW_1280
} from '../../utils/constants'

export default function MoviesCardList({ movies, savedMovies, handleClickCard, isApiError}) {

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0);

  const [width, setWidth] = React.useState(window.innerWidth);
  const [initialMaxCardNumber, setInitialMaxCardNumber] = React.useState(0);
  const [extraRowCardNumber, setExtraRowCardNumber] = React.useState(0);

  React.useLayoutEffect(() => {
    (movies.length < initialMaxCardNumber)
    ? setCurrentCardNumber(movies.length)
    : setCurrentCardNumber(initialMaxCardNumber)
  }, [initialMaxCardNumber, movies.length])

  React.useEffect(() => {
    let timer;
    const handleResize = (event) => {
      timer = setTimeout(() => {
        setWidth(event.target.innerWidth);
      }, [100])
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer)
    };
  }, []);

  React.useEffect(() => {
    if (width < 768) {
      setInitialMaxCardNumber(INIT_CARD_NUMBER_320)
      setExtraRowCardNumber(EXTRA_CARD_ROW_320)
    } else if (width < 1280) {
      setInitialMaxCardNumber(INIT_CARD_NUMBER_768)
      setExtraRowCardNumber(EXTRA_CARD_ROW_768)
    } else {
      setInitialMaxCardNumber(INIT_CARD_NUMBER_1280)
      setExtraRowCardNumber(EXTRA_CARD_ROW_1280)
    }
  }, [width]);

  const handleMoreButton = () => {
    if (movies.length >= (currentCardNumber + extraRowCardNumber)) {
      setCurrentCardNumber(currentCardNumber + extraRowCardNumber)
    } else {
      setCurrentCardNumber(currentCardNumber + (movies.length - currentCardNumber))
    }
  }

  const renderCards = (cardNumber) => {
    let content = []
    for (let i = 0; i < cardNumber; i++) {
      const item = movies[i]
      content.push(<li key={item.id} className='movies-card'><MoviesCard onClick={handleClickCard} card={item} savedMovies={savedMovies}/></li>)
    }
    return content
  };

  return (
    <section className='movies-card-list'>
      {(movies && movies.length > 0)
        ? (<ul className='movies-card-list__container'>{currentCardNumber <= movies.length ? renderCards(currentCardNumber) : ''}</ul>)
        : (<span className='movies-card-list__null-result'>
            {isApiError
              ? ERROR_MSG_API_ERROR
              : ERROR_MSG_NOT_FOUND
            }
          </span>)
      }
      {(currentCardNumber >= initialMaxCardNumber) && (currentCardNumber < movies.length)
        ? (<button className='movies-card-list__more-button' type='button' onClick={handleMoreButton}>Ещё</button>)
        : (<div className='movies-card-list__devider'/>)
      }
    </section>
  );
}
