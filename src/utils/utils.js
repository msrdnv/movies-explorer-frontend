export const setCustomErrorMsg = (evt, msg) => {
  if (!evt.target.value) {
    evt.target.setCustomValidity(msg)
  } else {
    evt.target.setCustomValidity('')
  }
}
