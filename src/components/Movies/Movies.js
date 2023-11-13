import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { handleApiError, filterMovies } from '../../utils/utils.js'
import { moviesApi } from '../../utils/MoviesApi'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'
import { BASE_IMAGE_URL } from '../../utils/constants.js'

export default function Movies({ savedMovies, saveMovies }) {

  const apiMovies = JSON.parse(localStorage.getItem('api-movies'))

  const lastSearch = localStorage.getItem('last-search-query')
  const lastCheckboxState = JSON.parse(localStorage.getItem('last-checkbox-state'))
  const lastMoviesResult = JSON.parse(localStorage.getItem('last-movies-result'))

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);
  const { values, handleChange, handleCheckbox } = useForm({search: lastSearch, checkbox: lastCheckboxState});

  const [currentMovies, setCurrentMovies] = React.useState(lastMoviesResult !== null ? lastMoviesResult : [])

  const saveLastSearchParams = (movies) => {
    localStorage.setItem('last-search-query', values.search)
    localStorage.setItem('last-checkbox-state', JSON.stringify(values.checkbox))
    localStorage.setItem('last-movies-result', JSON.stringify(movies))
  }

  const handleCheckboxClick = (evt) => {
    if ((lastMoviesResult !== null) && (lastSearch !== null)) {
      setCurrentMovies(filterMovies(apiMovies, { search: lastSearch, checkbox: evt.target.checked}))
    }
  }

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    if (apiMovies === null) {
    setIsLoading(true)
    setIsApiError(false)
    moviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('api-movies', JSON.stringify(data))
      const filteredMovies = filterMovies(data, values)
      setCurrentMovies(filteredMovies)
      saveLastSearchParams(filteredMovies)
    })
    .catch((err) => handleApiError(err, setIsApiError))
    .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = filterMovies(apiMovies, values)
      setCurrentMovies(filteredMovies)
      saveLastSearchParams(filteredMovies)
    }
  }

  const handleDeleteCard = (card, isSaved, setIsSaved) => {
    if (savedMovies.length > 0 && isSaved) {
      setIsApiError(false)
      const movieToDelete = savedMovies.find((item) => item.nameRU === card.nameRU)
      if (movieToDelete !== undefined) {
        mainApi.deleteMovie(movieToDelete.id, localStorage.getItem('token'))
        .then(() => {
          setIsSaved(false)
          saveMovies(savedMovies.filter((item) => item.id !== movieToDelete.id))
        })
        .catch((err) => handleApiError(err, setIsApiError))
      }
    } else {
      setIsApiError(false)
      mainApi.postNewMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${BASE_IMAGE_URL}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${BASE_IMAGE_URL}${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      }, localStorage.getItem('token'))
      .then((data) => {
        setIsSaved(true)
        saveMovies([...savedMovies, data])
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
          handleCheckboxClick={handleCheckboxClick}
          onDisable={isLoading}
        />
        {isLoading
          ? <Preloader/>
          : <MoviesCardList
              movies={currentMovies}
              savedMovies={savedMovies}
              handleClickCard={handleDeleteCard}
              isApiError={isApiError}
            />
        }
      </main>
      <Footer/>
    </>
  )
}
