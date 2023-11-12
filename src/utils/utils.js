export const setCustomErrorMsg = (evt, msg) => {
  const { value } = evt.target
  if (!value) {
    evt.target.setCustomValidity(msg)
  } else {
    evt.target.setCustomValidity('')
  }
}

export const saveMovies = (data, setMovies) => {
  localStorage.setItem('api-saved-movies', JSON.stringify(data))
  setMovies(data)
}

export const handleEmailConflictError = (err, setIsApiError, setIsEmailConflictError) => {
  if (err === 'Ошибка: 409') {
    setIsApiError(true)
    setIsEmailConflictError(true)
    console.log(err)
  } else {
    setIsApiError(true)
    console.log(err)
  }
}

export const ignoreNotFoundSavedCardsError = (err, setIsApiError) => {
  if (err === 'Ошибка: 404') {
    console.log(err)
  } else {
    setIsApiError(true)
    console.log(err)
  }
}

export const disableApiConflictErrors = (setIsApiError, setIsEmailConflictError) => {
  setIsApiError(false);
  setIsEmailConflictError(false);
}

export const handleApiError = (err, setIsApiError) => {
  setIsApiError(true)
  console.log(err)
}

export const filterMovies = (items, values, setCurrentMovies) => {
  const foundMovies = items.filter((item) => {
    if (values.checkbox === true) {
      return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase()) && item.duration <= 40
    } else {
      return item.nameRU.toLowerCase().startsWith(values.search.toLowerCase())
    }
  })
  const sortedMovies = [...foundMovies].sort((a, b) => a.nameRU > b.nameRU ? 1 : -1);
  setCurrentMovies(sortedMovies);
}
