import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { saveMovies, ignoreNotFoundSavedCardsError, handleApiError, filterMovies } from '../../utils/utils.js'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'

export default function SavedMovies() {

  const apiSavedMovies = JSON.parse(localStorage.getItem('api-saved-movies'))

  const [isApiError, setIsApiError] = React.useState(false);
  const [currentMovies, setCurrentMovies] = React.useState([])
  const { values, handleChange, handleCheckbox } = useForm({search: '', checkbox: false});

  React.useEffect(() => {
    setIsApiError(false)
    mainApi.getSavedMovies(localStorage.getItem('token'))
    .then((data) => saveMovies(data, setCurrentMovies))
    .catch((err) => ignoreNotFoundSavedCardsError(err, setIsApiError))
  }, [setCurrentMovies])

  const handleDeleteCard = (card) => {
    setIsApiError(false)
    mainApi.deleteMovie(card.id, localStorage.getItem('token'))
    .then(() => saveMovies(currentMovies.filter((item) => item.id !== card.id), setCurrentMovies))
    .catch((err) => handleApiError(err, setIsApiError))
  }

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    filterMovies(apiSavedMovies, values, setCurrentMovies)
  }

  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm onSubmit={handleSubmitSearchForm} handleCheckbox={handleCheckbox} handleChange={handleChange}/>
        <MoviesCardList movies={currentMovies} handleClickCard={handleDeleteCard} isApiError={isApiError}/>
      </main>
      <Footer/>
    </>
  )
}
