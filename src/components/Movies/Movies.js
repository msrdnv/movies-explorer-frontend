import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { errorMsgSearchForm } from '../../utils/constants.js'
import { setCustomErrorMsg } from '../../utils/utils.js'
import { moviesApi } from '../../utils/MoviesApi'

export default function Movies() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    setIsError(false)
    setIsLoading(true)
    moviesApi.getMovies()
    .then((data) => {
      const searchQuery = evt.target['search-form-input'].value;
      const shortMoviesCheckbox = evt.target['search-form-checkbox'].checked
      const filteredMovies = data.filter(function (item) {
        if (shortMoviesCheckbox === true) {
          return (item.nameRU.startsWith(searchQuery) & item.duration <= 40)
        } else {
          return (item.nameRU.startsWith(searchQuery))
        }
      })
      localStorage.setItem('last-search-query', searchQuery)
      localStorage.setItem('last-checkbox-state', JSON.stringify(shortMoviesCheckbox))
      localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies))
    })
    .catch((err) => {
      setIsError(true)
      console.log(err)
    })
    .finally(() => setIsLoading(false));
  }

  const validateSearchForm = (evt) => setCustomErrorMsg(evt, errorMsgSearchForm);

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm
          defaultValue={localStorage.getItem('last-search-query')}
          defaultChecked={JSON.parse(localStorage.getItem('last-checkbox-state'))}
          onSubmit={handleSubmitSearchForm}
          onValidate={validateSearchForm}
        />
        {isLoading ? <Preloader/> : <MoviesCardList isError={isError}/>}
      </main>
      <Footer/>
    </>
  )
}
