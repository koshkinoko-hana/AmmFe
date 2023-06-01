import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './deanFaq.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentQuestion } from '@admin/ducks/selectors/faq'
import { useEffect } from 'react'
import { fetchCurrentQuestionAction, updateCurrentQuestionAction } from '@admin/ducks/actions/faq'
import { useForm } from 'react-hook-form'
import { FormData } from './types'
import TextInput from '@common/components/textInput'
import Textarea from '@common/components/textarea'
import EmailInput from '~/client/pages/questionPage/components/ContactForm/EmailInput'

const Question: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentQuestion = useSelector(getCurrentQuestion)

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentQuestionAction({ id }))
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormData>({ mode: 'onChange' })

  const onSubmit = useCallback((data: FormData) => { 
    const { firstName, middleName, lastName, email, question, answer, respondent } = data
    console.log('🚀 ~ file: index.tsx:33 ~ onSubmit ~ data:', data)
    
    if (data && id) {
      const questionStr = { ...currentQuestion }

      questionStr.id =  parseInt(id)
      questionStr.firstName = firstName
      questionStr.middleName = middleName
      questionStr.lastName = lastName
      questionStr.email = email
      questionStr.question = question
      questionStr.answer = answer
      questionStr.respondent = respondent
      console.log('🚀 ~ file: index.tsx:46 ~ onSubmit ~ questionStr:', questionStr)
      
      dispatch(updateCurrentQuestionAction(questionStr))
    }
  }, [ ])
  const onCancel = useCallback(() => {
    navigate(-1)
    //    dispatch(clearQuestionAction())
  }, [])

  const buttonDisabled = () => (!isValid || isSubmitting)

  //  if(!id || currentQuestion) 
  {
    if (currentQuestion === null || currentQuestion === undefined) {
      return null
    }
    
    return (
      <div className="curQuestion">
        <form className="question--form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label={'Фамилия'}
            error={errors.lastName?.type}
            register={register('lastName', { required: true, maxLength: 255, value: currentQuestion?.lastName || '' })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Имя'}
            error={errors.firstName?.type}
            register={register('firstName', {
              required: true,
              maxLength: 255,
              value: currentQuestion?.firstName || ''
            })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Отчество'}
            error={errors.middleName?.type}
            register={register('middleName', {
              required: true,
              maxLength: 255,
              value: currentQuestion?.middleName || ''
            })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'email'}
            error={errors.email?.type}
            register={register('email', {
              required: true,
              maxLength: 255,
              value: currentQuestion?.email || ''
            })}
            classList="full-width"
          />
          <Textarea
            label={'Вопрос'}
            error={errors.question?.type}
            register={register('question', { value: currentQuestion?.question || '' })}
            classList="full-width"
          />
          <Textarea
            label={'Ответ'}
            error={errors.answer?.type}
            register={register('answer', { value: currentQuestion?.answer || '' })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Ответчик'}
            error={errors.respondent?.type}
            register={register('respondent', {
              required: true,
              maxLength: 255,
              value: currentQuestion?.respondent || ''
            })}
            classList="full-width"
          />
          <div className="buttons">
            <button
              type="submit"
              className={`button ${buttonDisabled() ? 'button__disabled' : ''}`}
              disabled={buttonDisabled()}
            >
              Сохранить
            </button>
            <button className="button" onClick={onCancel}>Отмена</button>
          </div>
        </form>
      </div>
    )
  }
  return null
}

export default Question