import React, { useState, ChangeEvent, FormEvent } from 'react'

interface FormState {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  question: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  question: '',
}

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const tempErrors: Partial<FormState> = {}

    tempErrors.firstName = form.firstName ? '' : 'Это поле обязательно'
    tempErrors.lastName = form.lastName ? '' : 'Это поле обязательно'
    tempErrors.middleName = form.middleName ? '' : 'Это поле обязательно'
    tempErrors.email = (form.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) ? '' : 'Неверный формат email'
    tempErrors.question = form.question ? '' : 'Это поле обязательно'

    setErrors({
      ...tempErrors
    })

    return Object.values(tempErrors).every(x => x === '')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validate()) {
      console.log(form)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="Имя" onChange={handleChange} />
      {errors.firstName && <p>{errors.firstName}</p>}

      <input name="lastName" placeholder="Фамилия" onChange={handleChange} />
      {errors.lastName && <p>{errors.lastName}</p>}

      <input name="middleName" placeholder="Отчество" onChange={handleChange} />
      {errors.middleName && <p>{errors.middleName}</p>}

      <input name="email" placeholder="E-mail" onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}

      <textarea name="question" placeholder="Ваш вопрос" onChange={handleChange} />
      {errors.question && <p>{errors.question}</p>}

      <button type="submit">Отправить</button>
    </form>
  )
}

export default ContactForm