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
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../../utils/ProtectedRoute'
import { mainApi } from '../../utils/MainApi'
import { handleApiError, handleEmailConflictError, disableApiConflictErrors } from '../../utils/utils'

export default function App() {

  const navigate = useNavigate();

  const [isAppLoading, setIsAppLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name: '', email: ''});
  const [isUserLoaded, setIsUserLoaded] = React.useState(false)

  const [savedMovies, setSavedMovies] = React.useState([])

  React.useLayoutEffect(() => {
    setIsAppLoading(true)
    if ((localStorage.getItem('token') !== null) && (!isUserLoaded)) {
      mainApi.getCurrentUser(localStorage.getItem('token'))
      .then((data) => {
        setCurrentUser(data)
        setIsLoggedIn(true)
        setIsUserLoaded(true)
      })
      .catch(console.error)
      .finally(() => setIsAppLoading(false))
    } else if (isLoggedIn) {
      mainApi.getSavedMovies(localStorage.getItem('token'))
      .then((data) => setSavedMovies(data))
      .catch(console.error)
      .finally(() => setIsAppLoading(false))
    } else {
      setIsAppLoading(false)
    }
  }, [isLoggedIn, isUserLoaded]);

  const handleProfileLogout = () => {
    setCurrentUser({name: '', email: ''})
    setIsLoggedIn(false)
    setIsUserLoaded(false)
    localStorage.clear()
    navigate('/')
  }

  const handleReturn = () => {
    navigate(-1);
  }

  const handleLogin = ({ email, password }, setIsLoading, setIsApiError) => {
    setIsLoading(true)
    setIsApiError(false)
    mainApi.login({ email, password })
    .then((data) => {
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      navigate('/movies');
    })
    .catch((err) => handleApiError(err, setIsApiError))
    .finally(() => setIsLoading(false))
  }

  const handleRegister = ({ email, password, name }, setIsLoading, setIsApiError, setIsEmailConflictError) => {
    setIsLoading(true)
    disableApiConflictErrors(setIsApiError, setIsEmailConflictError);
    mainApi.register({ email, password, name })
    .then(() => handleLogin({ email, password }, setIsLoading, setIsApiError))
    .catch((err) => handleEmailConflictError(err, setIsApiError, setIsEmailConflictError))
    .finally(() => setIsLoading(false))
  }

  const handleEditProfile = ({ name, email }, setIsLoading, setIsApiError, setIsEmailConflictError, setIsSuccess) => {
    setIsSuccess(false)
    setIsLoading(true)
    disableApiConflictErrors(setIsApiError, setIsEmailConflictError)
    mainApi.editCurrentUser({ name, email }, localStorage.getItem('token'))
    .then((data) => {
      setCurrentUser(data)
      setIsSuccess(true)
    })
    .catch((err) => handleEmailConflictError(err, setIsApiError, setIsEmailConflictError))
    .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
      {!isAppLoading ? <Routes>
        <Route path="/" element={<Main/>}/>
        <Route
          path="/movies"
          element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} saveMovies={setSavedMovies}/>}
        />
        <Route
          path="/saved-movies"
          element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} saveMovies={setSavedMovies}/>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} onLogout={handleProfileLogout} onUpdate={handleEditProfile}/>}
        />
        <Route
          path="/signin"
          element={<ProtectedRoute element={Login} isLoggedIn={!isLoggedIn} onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<ProtectedRoute element={Register} isLoggedIn={!isLoggedIn} onRegister={handleRegister}/>}
        />
        <Route path="*" element={<NotFoundPage onReturn={handleReturn}/>} />
      </Routes> : ''}
    </CurrentUserContext.Provider>
  );
};
