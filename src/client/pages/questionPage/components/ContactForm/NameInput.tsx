import React from 'react'
import { IPageInput } from '~/common/types/qstform'

const NameInput = ({ register, errors }: IPageInput) => (
  <label className='contactForm__label'>
    <span className='contactForm__name'>Имя</span>
    <input
      {...register('name', {
        required: 'Введите имя',
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
    {errors.name && (
      <span className='error_alert'>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className='error_alert'>минимум 2 символа</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className='error_alert'>более 25 символов!</span>
    )}
  </label>
)

export default NameInput
