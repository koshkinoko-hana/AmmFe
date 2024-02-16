import { loginAction } from '@admin/ducks/actions/me'
import { getMeLoggedIn } from '@admin/ducks/selectors/me'
import React, { FC, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdminRoutes } from '~/common/types/routes'
import {FormData} from './types'
import TextInput from '../../../common/components/textInput'
import './login.scss'

const Login: FC = () => {

  const {
    register,
    handleSubmit,
    formState: {isSubmitting, isDirty, isValid, errors}
  } = useForm<FormData>()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedIn = useSelector(getMeLoggedIn)

  useEffect(() => {
    if(loggedIn) {
      navigate(`/${AdminRoutes.root}/${AdminRoutes.departments}`)
    }
  }, [loggedIn])

  const onSubmit = async (data: FormData) => {
    const {login, password} = data

    dispatch(loginAction({login, password}))
  }

  const buttonDisabled = () => (isDirty && !isValid || isSubmitting)

  return (
    <div className="container login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>ПММ Админпанель</h1>
        <TextInput
          type="text"
          label={'Логин'}
          error={errors.login?.type}
          register={register('login', {required: true})}
        />
        <TextInput
          type="password"
          label={'Пароль'}
          error={errors.password?.type}
          register={register('password', {required: true})}
        />
        <button
          className={`button ${buttonDisabled() ? 'button__disabled' : ''}`}
          disabled={buttonDisabled()}
        >
          Авторизоваться
        </button>
      </form>
    </div>
  )
}
export default Login
