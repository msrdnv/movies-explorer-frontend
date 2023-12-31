import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import logo from '../../images/logo.svg'
import {
  ERROR_MSG_NAME,
  ERROR_MSG_EMAIL,
  EMAIL_REGEX,
  NAME_REGEX,
  ERROR_MSG_EMAIL_CONFLICT,
  ERROR_MSG_REGISTER
} from '../../utils/constants'
import { disableApiConflictErrors } from '../../utils/utils'
import { useForm } from '../../hooks/useForm'

export default function Register({onRegister}) {

  const { values, handleChange } = useForm({name: '', email: '', password: ''});

  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);
  const [isEmailConflictError, setIsEmailConflictError] = React.useState(false);

  React.useEffect(() => {
    disableApiConflictErrors(setIsApiError, setIsEmailConflictError);
    (values.name && values.email && values.password) && (isNameValid && isEmailValid && isPasswordValid)
    ? setIsFormValid(true)
    : setIsFormValid(false);
  }, [isNameValid, isEmailValid, isPasswordValid, values])

  React.useEffect(() => {
    NAME_REGEX.test(values.name) && values.name.length > 2 && values.name.length <= 30
    ? setIsNameValid(true)
    : setIsNameValid(false)
  }, [values.name])

  React.useEffect(() => {
    EMAIL_REGEX.test(values.email)
    ? setIsEmailValid(true)
    : setIsEmailValid(false)
  }, [values.email])

  React.useEffect(() => {
    values.password.length > 0
    ? setIsPasswordValid(true)
    : setIsPasswordValid(false)
  }, [values.password])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    }, setIsLoading, setIsApiError, setIsEmailConflictError);
  }

  return (
    <main className='register'>
      <section className='register__container'>
        <Link className='register__nav-logo' to='/'>
          <img className='register__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit} noValidate>
          <label className='register__label' htmlFor='register-name-input'>Имя</label>
          <input
            className='register__input'
            type='text'
            placeholder='Введите имя пользователя'
            name='name'
            id='register-name-input'
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
          <span className='register__error'>{(values.name.length === 0 ? '' : (isNameValid ? '' : ERROR_MSG_NAME))}</span>
          <label className='register__label' htmlFor='register-email-input'>E-mail</label>
          <input
            className='register__input'
            type='email'
            placeholder='Введите адрес электронной почты'
            name='email'
            id='register-email-input'
            onChange={handleChange}
            required
          />
          <span className='register__error'>{(values.email.length === 0 ? '' : (isEmailValid ? '' : ERROR_MSG_EMAIL))}</span>
          <label className='register__label' htmlFor='register-password-input'>Пароль</label>
          <input
            className='register__input'
            type='password'
            placeholder='Введите пароль'
            name='password'
            id='register-password-input'
            onChange={handleChange}
            required
          />
          <span className='register__error'>
            {isApiError
              ? (isEmailConflictError ? ERROR_MSG_EMAIL_CONFLICT : ERROR_MSG_REGISTER)
              : ''
            }</span>
          <button
            className={isFormValid && !isLoading ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'}
            type='submit'
            disabled={!isFormValid || isLoading}>
              Зарегистрироваться
          </button>
        </form>
        <p className='register__caption'>Уже зарегистрированы?&nbsp;
          <Link to='/signin' className='register__caption-link'>&nbsp;Войти</Link>
        </p>
      </section>
    </main>
  );
}
