import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import logo from '../../images/logo.svg'
import { ERROR_MSG_EMAIL, EMAIL_REGEX, ERROR_MSG_LOGIN } from '../../utils/constants'
import { useForm } from '../../hooks/useForm'

export default function Login({onLogin}) {

  const { values, handleChange } = useForm({email: '', password: ''});

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isApiError, setIsApiError] = React.useState(false);

  React.useEffect(() => {
    setIsApiError(false);
    (values.email && values.password) && (isEmailValid && isPasswordValid)
    ? setIsFormValid(true)
    : setIsFormValid(false);
  }, [isEmailValid, isPasswordValid, values])

  React.useEffect(() => {
    EMAIL_REGEX.test(values.email)
    ? setIsEmailValid(true)
    : setIsEmailValid(false);
  }, [values.email])

  React.useEffect(() => {
    values.password.length > 0
    ? setIsPasswordValid(true)
    : setIsPasswordValid(false);
  }, [values.password])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    }, setIsLoading, setIsApiError);
  }

  return (
    <main className='login'>
      <section className='login__container'>
        <Link className='login__nav-logo' to='/'>
          <img className='login__logo' src={logo} alt='Логотип сайта'/>
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form' onSubmit={handleSubmit} noValidate>
          <label className='login__label' htmlFor='login-email-input'>E-mail</label>
          <input
            className='login__input'
            type='email'
            placeholder='Введите адрес электронной почты'
            name='email'
            id='login-email-input'
            onChange={handleChange}
            required
          />
          <span className='login__error'>{(values.email.length === 0 ? '' : (isEmailValid ? '' : ERROR_MSG_EMAIL))}</span>
          <label className='login__label' htmlFor='login-password-input'>Пароль</label>
          <input
            className='login__input'
            type='password'
            placeholder='Введите пароль'
            name='password'
            id='login-password-input'
            onChange={handleChange}
            required
          />
          <span className='login__error'>
            {isApiError
              ? ERROR_MSG_LOGIN
              : ''
            }
          </span>
          <button
            className={isFormValid && !isLoading ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'}
            type='submit'
            disabled={!isFormValid || isLoading}>
              Войти
          </button>
        </form>
        <p className='login__caption'>Ещё не зарегистрированы?&nbsp;
          <Link to='/signup' className='login__caption-link'>&nbsp;Регистрация</Link>
        </p>
      </section>
    </main>
  );
}
