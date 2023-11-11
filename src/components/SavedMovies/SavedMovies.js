import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { ERROR_MSG_SEARCH } from '../../utils/constants.js'
import { setCustomErrorMsg } from '../../utils/utils.js'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'

export default function SavedMovies() {

  const [isApiError, setIsApiError] = React.useState(false);
  const [currentMovies, setCurrentMovies] = React.useState([])
  const { values, handleChange, setValues } = useForm({search: '', checkbox: false});

  console.log(JSON.parse(localStorage.getItem('saved-movies')))
  console.log(currentMovies)

  React.useEffect(() => {
    setCurrentMovies(JSON.parse(localStorage.getItem('saved-movies')))
  }, [setCurrentMovies])

  React.useEffect(() => {
    setIsApiError(false)
    mainApi.getSavedMovies(localStorage.getItem('token'))
    .then((data) => {
      localStorage.setItem('saved-movies', JSON.stringify(data))
      setCurrentMovies(data)
    })
    .catch((err) => {
      if (err === 'Ошибка: 404') {
        console.log(err)
      } else {
        setIsApiError(true)
        console.log(err)
      }
    })
  }, [])

  const handleDeleteCard = (card) => {
    setIsApiError(false)
    mainApi.deleteMovie(card.id, localStorage.getItem('token'))
    .then(() => {
      const updatedMovies = currentMovies.filter((item) => item.id !== card.id)
      localStorage.setItem('saved-movies', JSON.stringify(updatedMovies))
      setCurrentMovies(updatedMovies)
    })
    .catch((err) => {
      setIsApiError(true)
      console.log(err)
    })
  }

  const filterMovies = (items) => {
    const foundMovies = items.filter((item) => {
      if (values.checkbox === true) {
        return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase()) && item.duration <= 40
      } else {
        return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase())
      }
    })
    const sortedMovies = [...foundMovies].sort((a, b) => a.nameRU > b.nameRU ? 1 : -1);
    setCurrentMovies(sortedMovies);
  }

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    filterMovies(JSON.parse(localStorage.getItem('saved-movies')))
  }

  const handleCheckbox = (evt) => {
    const {checked, name} = evt.target;
    setValues({...values, [name]: checked});
  }

  const validateSearchForm = (evt) => {
    handleChange(evt);
    setCustomErrorMsg(evt, ERROR_MSG_SEARCH);
  }

  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm
          onSubmit={handleSubmitSearchForm}
          onValidate={validateSearchForm}
          handleCheckbox={handleCheckbox}
        />
        <MoviesCardList movies={currentMovies} handleClickCard={handleDeleteCard} isApiError={isApiError}/>
      </main>
      <Footer/>
    </>
  )
}
