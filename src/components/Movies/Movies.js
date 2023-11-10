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
import { useForm } from '../../hooks/useForm'

export default function Movies() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);
  const { values, handleChange, setValues } = useForm();

  const filteredMovies = JSON.parse(localStorage.getItem('filtered-movies')) || []

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    setIsApiError(false)
    moviesApi.getMovies()
    .then((data) => {
      const search = values.search;
      const checkbox = values.checkbox;
      const filteredMovies = data.filter((item) => {
        if (checkbox === true) {
          return item.nameRU.startsWith(search) && item.duration <= 40
        } else {
          return item.nameRU.startsWith(search)
        }
      })
      localStorage.setItem('last-search-query', search)
      localStorage.setItem('last-checkbox-state', JSON.stringify(checkbox))
      localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies))
    })
    .catch((err) => {
      setIsApiError(true)
      console.log(err)
    })
    .finally(() => setIsLoading(false));
  }

  const validateSearchForm = (evt) => {
    handleChange(evt);
    setCustomErrorMsg(evt, ERROR_MSG_SEARCH);
  }

  const handleCheckbox = (evt) => {
    const {checked, name} = evt.target;
    setValues({...values, [name]: checked});
  }

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm
          defaultValue={localStorage.getItem('last-search-query')}
          defaultChecked={localStorage.getItem('last-checkbox-state')}
          onSubmit={handleSubmitSearchForm}
          onValidate={validateSearchForm}
          handleCheckbox={handleCheckbox}
        />
        {isLoading ? <Preloader/> : <MoviesCardList movies={filteredMovies} isApiError={isApiError}/>}
      </main>
      <Footer/>
    </>
  )
}
