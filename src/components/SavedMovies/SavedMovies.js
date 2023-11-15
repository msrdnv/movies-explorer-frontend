import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { handleApiError, filterMovies } from '../../utils/utils.js'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'

export default function SavedMovies({ savedMovies, saveMovies }) {

  const [currentMovies, setCurrentMovies] = React.useState(savedMovies)
  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);

  const { values, handleChange, handleCheckbox } = useForm({search: '', checkbox: false});
  const [lastSearch, setLastSearch] = React.useState('')

  const handleDeleteCard = (card) => {
    setIsLoading(true)
    setIsApiError(false)
    mainApi.deleteMovie(card.id, localStorage.getItem('token'))
    .then(() => {
      saveMovies(savedMovies.filter((item) => item.id !== card.id))
      setCurrentMovies(currentMovies.filter((item) => item.id !== card.id))
    })
    .catch((err) => handleApiError(err, setIsApiError))
    .finally(() => setIsLoading(false))
  }

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    if (savedMovies.length > 0) {
      setLastSearch(values.search);
      setCurrentMovies(filterMovies(savedMovies, values))
    }
  }

  const handleCheckboxClick = (evt) => {
    if (savedMovies.length > 0) {
      setCurrentMovies(filterMovies(savedMovies, { search: lastSearch, checkbox: evt.target.checked}))
    }
  }

  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm
          onSubmit={handleSubmitSearchForm}
          handleCheckbox={handleCheckbox}
          handleCheckboxClick={handleCheckboxClick}
          handleChange={handleChange}
        />
        <MoviesCardList
          movies={currentMovies}
          savedMovies={savedMovies}
          handleClickCard={handleDeleteCard}
          isApiError={isApiError}
          onDisableLike={isLoading}
        />
      </main>
      <Footer/>
    </>
  )
}
