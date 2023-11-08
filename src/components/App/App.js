import React from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { AppContext } from '../../contexts/AppContext'

export default function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

 function handleLogoutButton() {
    setIsLoggedIn(false);
    navigate('/signin');
  };

  function handleReturn() {
    navigate(-1);
  }

  return (
    <AppContext.Provider value={{isLoggedIn}}>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
        <Route path="/profile" element={<Profile onLogout={handleLogoutButton} />}/>
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="*" element={<NotFoundPage onReturn={handleReturn}/>} />
      </Routes>
    </AppContext.Provider>
  );
};
