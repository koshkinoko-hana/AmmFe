import React from 'react'
import { IPageInput } from '~/common/types/qstform'

const EmailInput = ({ register, errors }: IPageInput) => (
  <label className='contactForm__label'>
    <span className='contactForm__name'>e-mail</span>
    <input
      {...register('email', {
        required: 'Введите email',
        pattern: {
          value:
            /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
          message: 'неверный e-mail адрес',
        },
      })}
      className='contactForm__input'
      type='email'
      placeholder=''
    />
    {errors.email && (
      <span className='error_alert'>{errors.name?.message}</span>
    )}
  </label>
)

export default EmailInput
