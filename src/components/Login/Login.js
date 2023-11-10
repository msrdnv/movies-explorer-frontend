import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../../images/logo.svg'
import { errorMsgEmail, emailRegex } from '../../utils/constants'
import { mainApi } from '../../utils/MainApi'
import { useForm } from '../../hooks/useForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Login() {

  const navigate = useNavigate();
  const user = React.useContext( CurrentUserContext );
  const { values, handleChange } = useForm();

  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsError(false);
    if ((values.email && values.password) && (isEmailValid & isPasswordValid)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isEmailValid, isPasswordValid, values])

  const validateEmail = (evt) => {
    handleChange(evt);
    const { value } = evt.target
    if (emailRegex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validatePassword = (evt) => {
    handleChange(evt);
    const { value } = evt.target
    if (value.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }

  const handleLoginSubmitButton = ({ email, password }) => {
    setIsError(false)
    mainApi.login({ email, password })
    .then((data) => {
      user.setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      navigate('/movies');
    })
    .catch((err) => {
      if (err) {
        setIsError(true)
        console.log(err)
      } else {
        setIsError(true)
        console.log(err)
      }
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLoginSubmitButton({
      email: values.email,
      password: values.password,
    });
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
            onChange={validateEmail}
            required
          />
          <span className='login__error'>{isEmailValid ? '' : errorMsgEmail}</span>
          <label className='login__label' htmlFor='login-password-input'>Пароль</label>
          <input
            className='login__input'
            type='password'
            placeholder='Введите пароль'
            name='password'
            id='login-password-input'
            onChange={validatePassword}
            required
          />
          <span className='login__error'>
            {isError
              ? 'Вы ввели неправильный логин или пароль.'
              : ''
            }
          </span>
          <button className={isFormValid ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'} type='submit' disabled={!isFormValid}>
            Войти
          </button>
        </form>
        <p className='login__caption'>Ещё не зарегистрированы?&nbsp;<Link to='/signup' className='login__caption-link'>&nbsp;Регистрация</Link></p>
      </section>
    </main>
  );
}
