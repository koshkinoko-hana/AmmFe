import './department.scss'
import Loader from '@admin/components/loader'
import { fetchEmployeeOptionsAction } from '@admin/ducks/actions/employee'
import { getEmployeeOptions } from '@admin/ducks/selectors/employee'
import Select from '@common/components/select'
import { Option } from '@common/components/select/types'
import { FormData as FD } from './types'
import {
  fetchDepartmentAction,
  saveDepartmentAction,
  updateDepartmentAction
} from '@admin/ducks/actions/department'
import { getCurrentDepartment, getDepartmentLoading } from '@admin/ducks/selectors/department'
import { DepartmentDetailed, DepartmentRequest } from '@admin/ducks/types/department'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const AdminDepartmentDetails: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(getDepartmentLoading)
  const currentDepartment: DepartmentDetailed | undefined = useSelector(getCurrentDepartment)
  const employeeOptions = useSelector(getEmployeeOptions)

  const [head, setHead] = useState<Option| undefined>(undefined)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FD>({ mode: 'onChange' })

  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentAction(id))
    }
    dispatch(fetchEmployeeOptionsAction())
  }, [])

  useEffect(() => {
    if(currentDepartment) {
      setValue('name', currentDepartment.name, {shouldValidate: true})
      setValue('description', currentDepartment.description || '', {shouldValidate: true})
      setHead({label: currentDepartment.head.name, value: currentDepartment.head.id})
    }
  }, [currentDepartment])

  const onSubmit = useCallback((data: FD) => {
    const { name, description } = data
    let department: DepartmentRequest
    if (currentDepartment) {
      department = { ...currentDepartment, head: currentDepartment.head.id }
      department.name = name
      department.description = description
      department.head = head?.value as number
      dispatch(updateDepartmentAction(department))
    } else {
      department = {
        name, description, head:  head?.value as number, competencies: []
      }
      dispatch(saveDepartmentAction(department))
    }
  }, [currentDepartment])


  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="container department">
        <h2>Редактирование</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label={'Наименование кафедры'}
            error={errors.name?.type}
            register={register('name', { required: true, maxLength: 255 })}
            classList="full-width"
          />
          <Textarea
            label={'Описание кафедры'}
            error={errors.description?.type}
            register={register('description')}
            classList="full-width"
          />
          <Select
            options={employeeOptions}
            isMulti={false}
            label="Заведующий кафедрой"
            classList="full-width"
            value={head}
            onChange={(value) => setHead(value || undefined)}
          />
          <div className="buttons">
            <button
              type="submit"
              className={`button ${buttonDisabled() ? 'button__disabled' : ''}`}
              disabled={buttonDisabled()}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    )
  )
}

export default AdminDepartmentDetails
