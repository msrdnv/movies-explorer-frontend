import React from 'react'
import './SearchForm.css'

export default function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__form' name='search-form'>
        <div className='search-form__input-container'>
          <input className='search-form__input' name='search-form-input' type='text' placeholder='Фильм'/>
          <button className='search-form__button'>Поиск</button>
        </div>
        <div className='search-form__checkbox-container'>
          <label className='search-form__checkbox-label'>
            <input className='search-form__invisible-checkbox' name='search-form-checkbox' type='checkbox'/>
            <span className='search-form__visible-checkbox'/>
          </label>
          <p className='search-form__label-text'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
}
