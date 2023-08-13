import './direction.scss'
import TextInput from '@common/components/textInput'
import React, {
  useCallback,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SingleValue } from 'react-select'
import ArrayInput from '~/admin/components/ArrayInput'
import { createDirectionAction, updateDirectionAction } from '~/admin/ducks/actions/direction'
import { getDirections } from '~/admin/ducks/selectors/direction'
import { DirectionNew } from '~/common/types/direction'
import Select from '~/common/components/select'
import { Option } from '~/common/components/select/types'
import { FormData } from './types'



const typeOptions = [
  {id: 1, name: 'type', label: 'Бакалавриат', value: 'Бакалавриат'}, 
  {id: 2, name: 'type', label: 'Магистратура', value: 'Магистратура'}, 
  {id: 3, name: 'type', label: 'Магистратура', value: 'Учебный военный центр'}
]

const Direction: React.FC = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const directions = useSelector(getDirections)
  const currentDirection = directions.find(direction => direction.id === Number(id))
  console.log(directions)

  const findOptionByValue = (value: string) => {
    return typeOptions.find(option => option.value === value)
  }
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormData>({ 
    mode: 'onChange',
    defaultValues: {
      type: findOptionByValue(currentDirection?.type || '') || typeOptions[0],
      features: currentDirection?.features || [],
      profiles: currentDirection?.profiles || [],
      forms: currentDirection?.forms || [],
      exams: currentDirection?.exams || []
    },
  })

  const onSubmit = ({number, type, name, features, profiles, forms, price, exams}: FormData) => {
    if (id) {
      const direction = { ...currentDirection }
      direction.type = String(type.value)
      direction.name = name
      direction.features = features
      direction.profiles = profiles
      direction.forms = forms
      direction.price = price
      direction.exams = exams
      dispatch(updateDirectionAction({id, direction}))
    }
    else
    {
      const direction: DirectionNew = {
        number,
        type: String(type.value),
        name,
        features,
        profiles,
        forms,
        price,
        exams
      }
      dispatch(createDirectionAction(direction))
    }
  }

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [])

  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    <div className="direction">
      <form className="direction--form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label={'Номер'}
          error={errors.number?.type}
          register={register('number', { required: true, maxLength: 255, value: currentDirection?.number || '' })}
          classList="full-width"
        />
        {/*<Select*/}
        {/*  label={'Тип'}*/}
        {/*  error={errors.type?.type}*/}
        {/*  register={register('type', { required: true, maxLength: 255, value: findOptionByValue(currentDirection?.type || '') || typeOptions[0] })}*/}
        {/*  classList="full-width"*/}
        {/*  onChange={(value) => {*/}
        {/*    setValue('type', (value as SingleValue<Option>)!)*/}
        {/*  }}*/}
        {/*  options={typeOptions}*/}
        {/*  defaultValue={[findOptionByValue(currentDirection?.type || '') || typeOptions[0]]}*/}
        {/*/>*/}
        <TextInput
          type="text"
          label={'Название'}
          error={errors.name?.type}
          register={register('name', {
            required: true,
            maxLength: 255,
            value: currentDirection?.name || ''
          })}
          classList="full-width"
        />
        <Controller
          control={control}
          name="features"
          render={({
            field: { onChange, value},
          }) => (
            <ArrayInput
              label="Особенности"
              setValues={onChange}
              values={value}
            />
          )}
        />
        <Controller
          control={control}
          name="profiles"
          render={({
            field: { onChange, value},
          }) => (
            <ArrayInput
              label="Профили"
              setValues={onChange}
              values={value}
            />
          )}
        />
        <Controller
          control={control}
          name="forms"
          render={({
            field: { onChange, value},
          }) => (
            <ArrayInput
              label="Формы обучения"
              setValues={onChange}
              values={value}
            />
          )}
        />
        <TextInput
          type="text"
          label={'Цена обучения'}
          error={errors.price?.type}
          register={register('price', {
            required: true,
            maxLength: 255,
            value: currentDirection?.price || 0
          })}
          classList="full-width"
        />
        <Controller
          control={control}
          name="exams"
          render={({
            field: { onChange, value},
          }) => (
            <ArrayInput
              label="Входные испытания"
              setValues={onChange}
              values={value}
            />
          )}
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

export default Direction
