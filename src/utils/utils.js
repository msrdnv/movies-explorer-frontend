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
