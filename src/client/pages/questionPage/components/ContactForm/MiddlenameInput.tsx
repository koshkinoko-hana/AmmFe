
import React from 'react'
import { IPageInput } from '~/common/types/qstform'

const MiddlenameInput = ({ register, errors }: IPageInput) => (
  <label className='contactForm__label'>
    <span className='contactForm__name'>Отчество</span>
    <input
      {...register('middlename', {
        required: 'Введите отчество',
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
    {errors.middlename && (
      <span className='error_alert'>{errors.middlename?.message}</span>
    )}
    {errors.middlename && errors.middlename.type === 'minLength' && (
      <span className='error_alert'>минимум 2 символа</span>
    )}
    {errors.middlename && errors.middlename.type === 'maxLength' && (
      <span className='error_alert'>более 25 символов!</span>
    )}
  </label>
)

export default MiddlenameInput
