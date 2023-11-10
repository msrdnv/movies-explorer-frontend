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
import { mainApi } from '../../utils/MainApi'

export default function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  if (isLoggedIn) {
    console.log(currentUser);
    console.log(localStorage.getItem('token'));
  }

  React.useEffect(() => {
    mainApi.getCurrentUser(localStorage.getItem('token'))
    .then((data) => {
      setCurrentUser(data)
      setIsLoggedIn(true);
    })
    .catch(console.error)
  }, [isLoggedIn]);

  const handleProfileLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    navigate('/');
  };

  const handleReturn = () => {
    navigate(-1);
  }

  return (
  <AppContext.Provider value={{handleReturn}}>
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn}/>}/>
        <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn}/>}/>
        <Route path="/profile" element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} onLogout={handleProfileLogout}/>}/>
        <Route path="/signin" element={<ProtectedRoute element={Login} isLoggedIn={!isLoggedIn}/>}/>
        <Route path="/signup" element={<ProtectedRoute element={Register} isLoggedIn={!isLoggedIn}/>}/>
        <Route path="*" element={<NotFoundPage onReturn={handleReturn}/>} />
      </Routes>
    </CurrentUserContext.Provider>
  </AppContext.Provider>
  );
};
