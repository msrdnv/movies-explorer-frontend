import React from 'react'
import './SearchForm.css'
import { ERROR_MSG_SEARCH } from '../../utils/constants.js'
import { setCustomErrorMsg } from '../../utils/utils.js'

export default function SearchForm({ defaultValue, defaultChecked, onSubmit, handleChange, handleCheckbox }) {

  const onValidate = (evt) => {
    handleChange(evt);
    setCustomErrorMsg(evt, ERROR_MSG_SEARCH);
  }

  return (
    <div className='search-form'>
      <form className='search-form__form' name='search-form' onSubmit={onSubmit}>
        <div className='search-form__input-container'>
          <input
            className='search-form__input'
            name='search'
            defaultValue={defaultValue}
            type='text' placeholder='Фильм'
            onChange={onValidate}
            onInvalid={onValidate}
            required
          />
          <button className='search-form__button'>Поиск</button>
        </div>
        <div className='search-form__checkbox-container'>
          <label className='search-form__checkbox-label'>
            <input
              className='search-form__invisible-checkbox'
              name='checkbox'
              defaultChecked={defaultChecked}
              type='checkbox'
              onChange={handleCheckbox}
            />
            <span className='search-form__visible-checkbox'/>
          </label>
          <p className='search-form__label-text'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
}
