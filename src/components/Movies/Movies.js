import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoviesCard from '../MoviesCard/MoviesCard'
import Footer from '../Footer/Footer'

export default function Movies() {
  return (
    <>
      <Header/>
      <Preloader/>
      <MoviesCardList/>
      <MoviesCard/>
      <Footer/>
    </>
  )
}
