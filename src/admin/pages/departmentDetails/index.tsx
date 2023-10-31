import './department.scss'
import ArrayInput from '@admin/components/ArrayInput'
import Loader from '@admin/components/loader'
import { fetchEmployeeOptionsAction } from '@admin/ducks/actions/employee'
import { fetchPositionOptionsAction } from '@admin/ducks/actions/position'
import { getEmployeeOptions } from '@admin/ducks/selectors/employee'
import { getPositionOptions } from '@admin/ducks/selectors/position'
import { EmployeePositionShort } from '@admin/ducks/types/employee'
import { Employees } from '@admin/pages/departmentDetails/components/employees'
import Delimiter from '@common/components/delimiter'
import Select from '@common/components/select'
import { Option } from '@common/components/select/types'
import { FormData as FD } from './types'
import {
  fetchDepartmentAction,
  saveDepartmentAction,
  updateDepartmentAction, updateDepartmentEmployeesAction
} from '@admin/ducks/actions/department'
import { getCurrentDepartment, getDepartmentLoading } from '@admin/ducks/selectors/department'
import { DepartmentDetailed, DepartmentRequest } from '@admin/ducks/types/department'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const AdminDepartmentDetails: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(getDepartmentLoading)
  const currentDepartment: DepartmentDetailed | undefined = useSelector(getCurrentDepartment)
  const employeeOptions = useSelector(getEmployeeOptions)
  const positionOptions = useSelector(getPositionOptions)

  const [head, setHead] = useState<Option| undefined>(undefined)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FD>({ mode: 'onChange' })

  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentAction(id))
    }
    dispatch(fetchEmployeeOptionsAction())
    dispatch(fetchPositionOptionsAction())
  }, [])

  useEffect(() => {
    if (currentDepartment) {
      setValue('name', currentDepartment.name, { shouldValidate: true })
      setValue('description', currentDepartment.description || '', { shouldValidate: true })
      setHead({ label: currentDepartment.head.name, value: currentDepartment.head.id })
    }
  }, [ currentDepartment ])

  const onSubmit = useCallback((data: FD) => {
    const { name, description, address, email, phones } = data
    let department: DepartmentRequest
    if (currentDepartment) {
      department = { ...currentDepartment, head: currentDepartment.head.id }
      department.name = name
      department.description = description
      department.head = head?.value as number
      department.address = address
      department.email = email
      department.phones = phones
      dispatch(updateDepartmentAction(department))
    } else {
      department = {
        name,
        description,
        head: head?.value as number,
        competencies: [],
        address,
        email,
        phones
      }
      dispatch(saveDepartmentAction(department))
    }
  }, [ currentDepartment, head ])

  const onEmployeesChange = (employees: EmployeePositionShort[]) => {
    dispatch(updateDepartmentEmployeesAction({ id, employees }))
  }


  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    loading ? (
      <Loader/>
    ) : (
      <div className="container department__admin">
        <h1>Редактирование кафедры</h1>
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
          <Controller
            control={control}
            name="phones"
            render={({
              field: { onChange, value },
            }) => (
              <ArrayInput
                label="Телефоны для связи"
                setValues={onChange}
                values={value || []}
                pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
              />
            )}
          />
          <TextInput
            type="text"
            label={'Адрес'}
            error={errors.address?.type}
            register={register('address', { required: true, maxLength: 255 })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Email'}
            error={errors.email?.type}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            register={register('email', { required: true, maxLength: 255 })}
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
          </div>
        </form>
        {
          currentDepartment &&
          <>
            <Delimiter/>
            <Employees
              employees={currentDepartment.employees}
              employeeOptions={employeeOptions}
              positionOptions={positionOptions}
              onEmployeesChange={onEmployeesChange}
            />
          </>
        }
      </div>
    )
  )
}

export default AdminDepartmentDetails
