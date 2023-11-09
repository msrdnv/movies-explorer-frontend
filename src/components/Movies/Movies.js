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
  const [movies, setMovies] = React.useState([]);

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault()
    setIsError(false)
    setIsLoading(true)
    moviesApi.getMovies()
    .then((data) => {
      console.log(data);
      setMovies(...movies, data);
    })
    .catch((err) => {
      setIsError(true)
      console.log(err)
    })
    .finally(() => setIsLoading(false));
  }

  const validateSearchForm = (evt) => setCustomErrorMsg(evt, errorMsgSearchForm);

  console.log('Открыта страница с фильмами!');

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm onSubmit={handleSubmitSearchForm} onValidate={validateSearchForm}/>
        {isLoading ? <Preloader/> : <MoviesCardList isError={isError} movies={movies}/>}
      </main>
      <Footer/>
    </>
  )
}
