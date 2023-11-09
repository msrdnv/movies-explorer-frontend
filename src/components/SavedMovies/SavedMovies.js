import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
// import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

export default function SavedMovies() {

  console.log('Открыта страница с saved-фильмами!');

  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm/>
        <MoviesCardList/>
      </main>
      <Footer/>
    </>
  )
}
