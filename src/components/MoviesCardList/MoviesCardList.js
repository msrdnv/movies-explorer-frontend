import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ movies, handleClickCard, isApiError }) {

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0)

  const [width, setWidth] = React.useState(window.innerWidth);
  const [initialMaxCardNumber, setInitialMaxCardNumber] = React.useState(0);
  const [extraRowCardNumber, setExtraRowCardNumber] = React.useState(0);

  //console.log(`Максимальное количество карточек - ${initialMaxCardNumber}`)
  //console.log(`Количество переданных карточек - ${movies.length}`)
  //console.log(`Количество отрисованных карточек - ${currentCardNumber}`)

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
      content.push(<li key={item.id} className='movies-card'><MoviesCard onClick={handleClickCard} card={item}/></li>)
    }
    return content
  };

  return (
    <section className='movies-card-list'>
      {(movies && movies.length > 0)
        ? (<ul className='movies-card-list__container'>{currentCardNumber <= movies.length ? renderCards(currentCardNumber) : ''}</ul>)
        : (<span className='movies-card-list__null-result'>
            {isApiError
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : 'Ничего не найдено'
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
