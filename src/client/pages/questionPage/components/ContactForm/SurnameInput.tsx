import React from 'react'
import { IPageInput } from '~/common/types/qstform'

const SurnmameInput = ({ register, errors }: IPageInput) => (
  <label className='contactForm__label'>
    <span className='contactForm__name'>Фамилия</span>
    <input
      {...register('surname', {
        required: 'Введите фамилию',
        minLength: 2,
        maxLength: 15,
        pattern: {
          value: /^[a-zA-Zа-яА-Я0-9!@#$%&-_]*$/,
          message: 'некорректные символы',
        },
      })}
      className='contactForm__input'
      type="text"
      placeholder=''
    />
    {errors.surname && (
      <span className='error_alert'>{errors.surname?.message}</span>
    )}
    {errors.surname && errors.surname.type === 'minLength' && (
      <span className='error_alert'>минимум 2 символа</span>
    )}
    {errors.surname && errors.surname.type === 'maxLength' && (
      <span className='error_alert'>более 25 символов!</span>
    )}
  </label>
)

export default SurnmameInput
