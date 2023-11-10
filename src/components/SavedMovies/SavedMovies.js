import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

export default function SavedMovies() {

  const [isLoading, setIsLoading] = React.useState(false);

  const savedMovies = JSON.parse(localStorage.getItem('saved-movies')) || []

  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm/>
        {isLoading ? <Preloader/> : <MoviesCardList movies={savedMovies}/>}
      </main>
      <Footer/>
    </>
  )
}
