export const setCustomErrorMsg = (evt, msg) => {
  const { value } = evt.target
  if (!value) {
    evt.target.setCustomValidity(msg)
  } else {
    evt.target.setCustomValidity('')
  }
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

export const disableApiConflictErrors = (setIsApiError, setIsEmailConflictError) => {
  setIsApiError(false);
  setIsEmailConflictError(false);
}

export const handleApiError = (err, setIsApiError) => {
  setIsApiError(true)
  console.log(err)
}

export const filterMovies = (items, values) => {
  const foundMovies = items.filter((item) => {
    if (values.checkbox === true) {
      return (item.nameRU.toLowerCase().includes(values.search.toLowerCase())
      || item.nameEN.toLowerCase().includes(values.search.toLowerCase())) && item.duration <= 40
    } else {
      return item.nameRU.toLowerCase().includes(values.search.toLowerCase())
      || item.nameEN.toLowerCase().includes(values.search.toLowerCase())
    }
  })
  const sortedMovies = [...foundMovies].sort((a, b) => a.nameRU > b.nameRU ? 1 : -1);
  return sortedMovies;
}
