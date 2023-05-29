import './employee.scss'
import {
  fetchDepartmentOptionsAction,
} from '@admin/ducks/actions/department'
import {
  clearEmployeeAction,
  fetchEmployeeAction,
  saveEmployeeAction,
  updateEmployeeAction
} from '@admin/ducks/actions/employee'
import { fetchPositionOptionsAction } from '@admin/ducks/actions/position'
import { getDepartmentOptions } from '@admin/ducks/selectors/department'
import { getCurrentEmployee, getEmployeeLoading } from '@admin/ducks/selectors/employee'
import { getPositionOptions } from '@admin/ducks/selectors/position'
import { EmployeeNew, UploadedFileResponse } from '@admin/ducks/types/employee'
import Select from '@common/components/select'
import { Option } from '@common/components/select/types'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import { apiAdmin } from '@common/consts/general'
import { upload } from '@common/utils/fetch'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { FileDrop } from 'react-file-drop'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MultiValue, PropsValue, SingleValue } from 'react-select/dist/declarations/src/types'
import { FormData } from './types'

const Employee: React.FC = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentEmployee = useSelector(getCurrentEmployee)
  const positions = useSelector(getPositionOptions)
  const departments = useSelector(getDepartmentOptions)
  const [chosenPositions, setChosenPositions] = useState<PropsValue<Option>>([])
  const [chosenDepartments, setChosenDepartments] = useState<PropsValue<Option>>([])
  const [uploadedFile, setUploadedFile] = useState<UploadedFileResponse | null>(null)

  const handlePositionsChange: (values: MultiValue<Option> | SingleValue<Option>) => void = (values) => {
    setChosenPositions(Array.isArray(values) ? values : [values])
  }

  const handleDepartmentsChange: (values: MultiValue<Option> | SingleValue<Option>) => void = (values) => {
    setChosenDepartments(Array.isArray(values) ? values : [values])
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeAction({id}))
    }
    dispatch(fetchPositionOptionsAction())
    dispatch(fetchDepartmentOptionsAction())
  }, [])

  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormData>({ mode: 'onChange' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]
    const res = await upload(`${apiAdmin}/employee/photo`, file)
    setUploadedFile(res)
  }

  const onSubmit = useCallback((data: FormData) => {
    const { firstName, middleName, lastName, description } = data
    if (currentEmployee && id) {
      const employee = { ...currentEmployee }

      employee.id =  parseInt(id)
      employee.firstName = firstName
      employee.middleName = middleName
      employee.lastName = lastName
      employee.description = description
      employee.positions = chosenPositions as Option[]
      employee.departments = chosenDepartments as Option[]
      employee.photoId = uploadedFile?.id
      dispatch(updateEmployeeAction(employee))
    }
    else
    {
      const employee: EmployeeNew = {
        firstName,
        middleName,
        lastName,
        description,
        positions: (chosenPositions as Option[]).map(d => d.value as number),
        departments: (chosenDepartments as Option[]).map(d => d.value as number),
        photoId: uploadedFile?.id,
      }
      dispatch(saveEmployeeAction(employee))
    }
  }, [chosenPositions, chosenDepartments, currentEmployee])

  const onCancel = useCallback(() => {
    navigate(-1)
    dispatch(clearEmployeeAction())
  }, [])

  const onTargetClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click()
  }
  const buttonDisabled = () => (!isValid || isSubmitting)

  if(!id || currentEmployee) {
    const initialPositions = currentEmployee?.positions.map(item => ({ 
      id: item.id, 
      name: item.name, 
      value: item.value, 
      label: item.label 
    })) || []
    return (
      <div className="employee">
        <form className="employee--form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label={'Фамилия'}
            error={errors.lastName?.type}
            register={register('lastName', { required: true, maxLength: 255, value: currentEmployee?.lastName || '' })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Имя'}
            error={errors.firstName?.type}
            register={register('firstName', {
              required: true,
              maxLength: 255,
              value: currentEmployee?.firstName || ''
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
              value: currentEmployee?.middleName || ''
            })}
            classList="full-width"

          />
          <Textarea
            label={'Информация'}
            error={errors.description?.type}
            register={register('description', { value: currentEmployee?.description || '' })}
            classList="full-width"
          />
          <Select
            options={positions}
            onChange={handlePositionsChange}
            isMulti={true}
            label="Должности"
            // onBlur={onBlur}
            defaultValue={currentEmployee?.positions || []}
            classList="full-width"
            register={register('positions',{ value: currentEmployee?.positions || []})}
          />
          <Select
            options={departments}
            onChange={handleDepartmentsChange}
            isMulti={true}
            label="Кафедры"
            classList="full-width"
            defaultValue={currentEmployee?.departments|| []}
            register={register('departments', { value: currentEmployee?.departments || [] })}
          />
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
          />
          <FileDrop
            onTargetClick={onTargetClick}>

            {
              uploadedFile
                ? <img src={uploadedFile.path} className="image"/>
                : 'Drop some files here!'
            }
          </FileDrop>
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

export default Employee
