import './index.scss'
import {
  clearCurrentPositionAction,
  savePositionAction,
  updatePositionAction
} from '@admin/ducks/actions/position'
import { getCurrentPosition } from '@admin/ducks/selectors/position'
import { PositionNew } from '@admin/ducks/types/position'
import { closeDialogueAction } from '@common/ducks/slice/dialogue'
import { useDispatch, useSelector } from 'react-redux'
import { FormData as FD } from './types'
import TextInput from '@common/components/textInput'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const PositionDetails: React.FC = () => {
  const dispatch = useDispatch()
  const currentPosition = useSelector(getCurrentPosition)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FD>({mode: 'onChange'})

  const onSubmit = useCallback((data: FD) => {
    const {name } = data
    if (currentPosition) {
      const position = {...currentPosition}
      position.name = name
      dispatch(updatePositionAction(position))
    } else {
      const position: PositionNew = {
        name,
      }
      dispatch(savePositionAction(position))
    }
  }, [])

  const onCancel = useCallback(() => {
    dispatch(closeDialogueAction())
    dispatch(clearCurrentPositionAction())
  }, [])

  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        type="text"
        label={'Наименование должности'}
        error={errors.name?.type}
        register={register('name', {required: true, maxLength: 255, value: currentPosition?.name || ''})}
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
  )
}

export default PositionDetails
