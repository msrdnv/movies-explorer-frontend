import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { ERROR_MSG_SEARCH } from '../../utils/constants.js'
import { setCustomErrorMsg } from '../../utils/utils.js'
import { moviesApi } from '../../utils/MoviesApi'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'

export default function Movies() {

  const apiMovies = JSON.parse(localStorage.getItem('api-movies'))
  // const savedMovies = JSON.parse(localStorage.getItem('saved-movies')) || []
  //console.log(savedMovies)
  const lastSearch = localStorage.getItem('last-search-query')
  const lastCheckboxState = JSON.parse(localStorage.getItem('last-checkbox-state'))

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);
  const { values, handleChange, setValues } = useForm({search: lastSearch, checkbox: lastCheckboxState});

  const [filteredMovies, setFilteredMovies] = React.useState([])

  const filterMovies = (items) => {
    const foundMovies = items.filter((item) => {
      if (values.checkbox === true) {
        return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase()) && item.duration <= 40
      } else {
        return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase())
      }
    })
    const sortedMovies = [...foundMovies].sort((a, b) => a.nameRU > b.nameRU ? 1 : -1);
    setFilteredMovies(sortedMovies);
  }

  const saveLastSearchParams = () => {
    localStorage.setItem('last-search-query', values.search)
    localStorage.setItem('last-checkbox-state', JSON.stringify(values.checkbox))
  }

  const handleCheckbox = (evt) => {
    const {checked, name} = evt.target;
    setValues({...values, [name]: checked});
  }

  const validateSearchForm = (evt) => {
    handleChange(evt);
    setCustomErrorMsg(evt, ERROR_MSG_SEARCH);
  }

  const handleSubmitSearchForm = (evt) => {
    if (apiMovies === null) {
    evt.preventDefault()
    setIsLoading(true)
    setIsApiError(false)
    moviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('api-movies', JSON.stringify(data))
      saveLastSearchParams()
      filterMovies(data)
    })
    .catch((err) => {
      setIsApiError(true)
      console.log(err)
    })
    .finally(() => setIsLoading(false));
    } else {
      evt.preventDefault()
      saveLastSearchParams()
      filterMovies(apiMovies)
    }
  }

  const handleSaveCard = (card, setIsSaved) => {
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
    .then((data) => {
      console.log(data)
      setIsSaved(true)
    })
    .catch((err) => {
      setIsApiError(true)
      console.log(err)
    })
  }

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm
          defaultValue={lastSearch}
          defaultChecked={lastCheckboxState}
          onSubmit={handleSubmitSearchForm}
          onValidate={validateSearchForm}
          handleCheckbox={handleCheckbox}
        />
        {isLoading ? <Preloader/> : <MoviesCardList movies={filteredMovies} handleClickCard={handleSaveCard} isApiError={isApiError}/>}
      </main>
      <Footer/>
    </>
  )
}
