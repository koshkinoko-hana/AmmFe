import React, { useState } from 'react'
import './contactForm.scss'
import NameInput from './NameInput'
import { useForm } from 'react-hook-form'
import SurnmameInput from './SurnameInput'
import MiddlenameInput from './MiddlenameInput'
import EmailInput from './EmailInput'
import QuestionInput from './QuestionInput'
import { IInputs } from '~/common/types/qstform'

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    console.log(data)
  }

  return (
    <div className=''>
      <form 
        className='contactForm' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <NameInput register={register} errors={errors} />
        <SurnmameInput register={register} errors={errors} />
        <MiddlenameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <QuestionInput register={register} errors={errors} />

        <button className='contactForm__btn' type="submit">Отправить</button>
      </form>
    </div>
  )
}

export default ContactForm