export const EMAIL_REGEX = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
export const NAME_REGEX = /^[а-яА-ЯёЁa-zA-Z-\s]+$/;

export const ERROR_MSG_API_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
export const ERROR_MSG_NOT_FOUND = 'Ничего не найдено'
export const ERROR_MSG_SEARCH = 'Нужно ввести ключевое слово'
export const ERROR_MSG_NAME = 'Имя должно содержать от 2 до 30 символов'
export const ERROR_MSG_EMAIL = 'Некорректный адрес электронной почты'
export const ERROR_MSG_EMAIL_CONFLICT = 'Пользователь с таким email уже существует'
export const ERROR_MSG_PROFILE = 'При обновлении профиля произошла ошибка'
export const ERROR_MSG_REGISTER = 'При регистрации пользователя произошла ошибка'
export const ERROR_MSG_LOGIN = 'Вы ввели неправильный логин или пароль'
export const SUCCESS_MSG_PROFILE = 'Данные успешно изменены'
