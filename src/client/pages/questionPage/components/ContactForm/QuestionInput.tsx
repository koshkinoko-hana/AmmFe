import React from 'react'
import { IPageInput } from '~/common/types/qstform'

const QuestionInput = ({ register, errors }: IPageInput) => (
  <label className='contactForm__label'>
    <span className='contactForm__name'>Ваш вопрос</span>
    <textarea
      {...register('text', {})}
      className='contactForm__text'
      placeholder=''
    />
  </label>
)

export default QuestionInput
