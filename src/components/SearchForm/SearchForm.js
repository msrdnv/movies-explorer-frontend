import React from 'react'
import './SearchForm.css'

export default function SearchForm({ defaultValue, defaultChecked, onSubmit, onValidate, handleCheckbox }) {

  return (
    <div className='search-form'>
      <form className='search-form__form' name='search-form' onSubmit={onSubmit}>
        <div className='search-form__input-container'>
          <input
            className='search-form__input'
            name='search'
            defaultValue={defaultValue || ''}
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
              defaultChecked={defaultChecked || false}
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
