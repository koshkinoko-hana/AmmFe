import './index.scss'
import {
  clearCurrentDepartmentAction,
  saveDepartmentAction,
  updateDepartmentAction
} from '@admin/ducks/actions/department'
import { getCurrentDepartment } from '@admin/ducks/selectors/department'
import { DepartmentNew } from '@admin/ducks/types/department'
import { closeDialogueAction } from '@common/ducks/slice/dialogue'
import { useDispatch, useSelector } from 'react-redux'
import { FormData } from './types'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const DepartmentDetails: React.FC = () => {
  const dispatch = useDispatch()
  const currentDepartment = useSelector(getCurrentDepartment)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormData>({mode: 'onChange'})

  const onSubmit = useCallback((data: FormData) => {
    const {name, description } = data
    if (currentDepartment) {
      const department = {...currentDepartment}
      department.name = name
      department.description = description
      dispatch(updateDepartmentAction(department))
    } else {
      const department: DepartmentNew = {
        name,
        description,
        competencies: []
      }
      dispatch(saveDepartmentAction(department))
    }
  }, [])

  const onCancel = useCallback(() => {
    dispatch(closeDialogueAction())
    dispatch(clearCurrentDepartmentAction())
  }, [])

  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        type="text"
        label={'Наименование кафедры'}
        error={errors.name?.type}
        register={register('name', {required: true, maxLength: 255, value: currentDepartment?.name || ''})}
        classList="full-width"

      />
      <Textarea
        label={'Описание кафедры'}
        error={errors.description?.type}
        register={register('description', {value: currentDepartment?.description || ''})}
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

export default DepartmentDetails
