import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { saveMovies, ignoreNotFoundSavedCardsError, handleApiError, filterMovies } from '../../utils/utils.js'
import { moviesApi } from '../../utils/MoviesApi'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'

export default function Movies() {

  const apiMovies = JSON.parse(localStorage.getItem('api-movies'))

  const lastSearch = localStorage.getItem('last-search-query')
  const lastCheckboxState = JSON.parse(localStorage.getItem('last-checkbox-state'))

  const saveLastSearchParams = () => {
    localStorage.setItem('last-search-query', values.search)
    localStorage.setItem('last-checkbox-state', JSON.stringify(values.checkbox))
  }

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);
  const { values, handleChange, handleCheckbox } = useForm({search: lastSearch, checkbox: lastCheckboxState});

  const [currentMovies, setCurrentMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])

  React.useEffect(() => {
    setIsApiError(false)
    mainApi.getSavedMovies(localStorage.getItem('token'))
    .then((data) => saveMovies(data, setSavedMovies))
    .catch((err) => ignoreNotFoundSavedCardsError(err, setIsApiError))
  }, [])

  const handleSubmitSearchForm = (evt) => {
    if (apiMovies === null) {
    evt.preventDefault()
    setIsLoading(true)
    setIsApiError(false)
    moviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('api-movies', JSON.stringify(data))
      saveLastSearchParams()
      filterMovies(data, values, setCurrentMovies)
    })
    .catch((err) => handleApiError(err, setIsApiError))
    .finally(() => setIsLoading(false));
    } else {
      evt.preventDefault()
      saveLastSearchParams()
      filterMovies(apiMovies, values, setCurrentMovies)
    }
  }

  const handleToggleCard = (card, isSaved, setIsSaved) => {
    if (isSaved) {
      setIsApiError(false)
      mainApi.getSavedMovies(localStorage.getItem('token'))
      .then((data) => {
        const deleteMovies = data.filter((item) => item.nameRU === card.nameRU)
        setIsApiError(false)
        mainApi.deleteMovie(deleteMovies[0].id, localStorage.getItem('token'))
        .then(() => {
          setIsSaved(false)
          saveMovies(savedMovies.filter((item) => item.id !== deleteMovies[0].id), setSavedMovies)
        })
        .catch((err) => handleApiError(err, setIsApiError))
      })
      .catch((err) => ignoreNotFoundSavedCardsError(err, setIsApiError))
    } else {
      setIsApiError(false)
      mainApi.postNewMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      }, localStorage.getItem('token'))
      .then(() => {
        setIsSaved(true)
        setIsApiError(false)
        mainApi.getSavedMovies(localStorage.getItem('token'))
        .then((data) => saveMovies(data, setSavedMovies))
        .catch((err) => ignoreNotFoundSavedCardsError(err, setIsApiError))
      })
      .catch((err) => handleApiError(err, setIsApiError))
    }
  }

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm
          defaultValue={lastSearch}
          defaultChecked={lastCheckboxState}
          onSubmit={handleSubmitSearchForm}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
        />
        {isLoading ? <Preloader/> : <MoviesCardList movies={currentMovies} handleClickCard={handleToggleCard} isApiError={isApiError}/>}
      </main>
      <Footer/>
    </>
  )
}
