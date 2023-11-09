import React from 'react'
import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ isError, movies }) {

  const location = useLocation();
  let currentMovies = [];
  let savedMovies = [];
  location.pathname === '/movies' ? currentMovies = movies : currentMovies = savedMovies;

  const [width, setWidth] = React.useState(window.innerWidth);
  const [initialMaxCardNumber, setInitialMaxCardNumber] = React.useState(0);
  const [extraRowCardNumber, setExtraRowCardNumber] = React.useState(0);

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0);

  // console.log(`Количество отрисованных карточек - ${currentCardNumber}`)
  // console.log(`Максимальное изначальное количество карточек - ${initialMaxCardNumber}`)

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
      setInitialMaxCardNumber(5)
      setExtraRowCardNumber(2)
    } else if (width < 1280) {
      setInitialMaxCardNumber(8)
      setExtraRowCardNumber(2)
    } else {
      setInitialMaxCardNumber(12)
      setExtraRowCardNumber(3)
    }
  }, [width]);

  React.useEffect(() => {
    if (currentMovies.length < initialMaxCardNumber) {
      setCurrentCardNumber(currentMovies.length)
    } else {
      setCurrentCardNumber(initialMaxCardNumber)
    }
  }, [initialMaxCardNumber, currentMovies.length]);

  const handleMoreButton = () => {
    if (currentMovies.length >= (currentCardNumber + extraRowCardNumber)) {
      setCurrentCardNumber(currentCardNumber + extraRowCardNumber)
    } else {
      setCurrentCardNumber(currentCardNumber + (currentMovies.length - currentCardNumber))
    }
  }

  const renderCards = (cardNumber) => {
    let content = []
    for (let i = 0; i < cardNumber; i++) {
      const item = currentMovies[i]
      content.push(<li key={item.id} className='movies-card'><MoviesCard card={item}/></li>)
    }
    return content
  };

  return (
    <section className='movies-card-list'>
      {(currentMovies && currentMovies.length > 0)
        ? (<ul className='movies-card-list__container'>{renderCards(currentCardNumber)}</ul>)
        : (<span className='movies-card-list__null-result'>
            {isError
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : 'Ничего не найдено'
            }
          </span>)
      }
      {(currentCardNumber >= initialMaxCardNumber) && (currentCardNumber < currentMovies.length)
        ? (<button className='movies-card-list__more-button' type='button' onClick={handleMoreButton}>Ещё</button>)
        : (<div className='movies-card-list__devider'/>)
      }
    </section>
  );
}
