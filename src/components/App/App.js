import React from 'react'
import './App.css'
import { Routes, Route, /* useNavigate */} from 'react-router-dom'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

export default function App() {

  // const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/movies" element={<Movies/>}></Route>
        <Route path="/saved-movies" element={<SavedMovies/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
};
