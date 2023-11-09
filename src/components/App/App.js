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
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../../utils/ProtectedRoute'

export default function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});

 function handleLogoutButton() {
    setIsLoggedIn(false);
    navigate('/');
  };

  function handleReturn() {
    navigate(-1);
  }

  const handleSubmitRegisterForm = (evt) => {
    evt.preventDefault();
  }

  return (
    <AppContext.Provider value={{isLoggedIn}}>
      <CurrentUserContext.Provider value={{currentUser}}>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn}/>}/>
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn}/>}/>
          <Route path="/profile" element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} onLogout={handleLogoutButton}/>}/>
          <Route path="/signin" element={<Login/>} />
          <Route path="/signup" element={<Register onSubmit={handleSubmitRegisterForm}/>} />
          <Route path="*" element={<NotFoundPage onReturn={handleReturn}/>} />
        </Routes>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
};
