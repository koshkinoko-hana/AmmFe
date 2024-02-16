import './employee.scss'
import {
  clearEmployeeAction,
  fetchEmployeeAction,
  saveEmployeeAction,
  updateEmployeeAction
} from '@admin/ducks/actions/employee'
import { fetchPositionOptionsAction } from '@admin/ducks/actions/position'
import { getCurrentEmployee } from '@admin/ducks/selectors/employee'
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
import { FormData } from './types'

const Employee = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentEmployee = useSelector(getCurrentEmployee)
  const [ uploadedFile, setUploadedFile ] = useState<UploadedFileResponse | null>(null)
  const [ loadingPhoto, setLoadingPhoto ] = useState(false)
  const [ newEmployee, setNewEmployee ] = useState(false)
  const positionOptions: Option[] = useSelector(getPositionOptions)
  const [chosenPositions, setChosenPositions] = useState<Option[]>(currentEmployee?.positions || [])

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeAction({ id }))
      setNewEmployee(false)
    }
    if (id === undefined) {
      setNewEmployee(true)
    }
    dispatch(fetchPositionOptionsAction())
  }, [])

  useEffect(() => {
    if (currentEmployee) {
      setValue('firstName', currentEmployee.firstName, { shouldValidate: true })
      setValue('middleName', currentEmployee.middleName || '', { shouldValidate: true })
      setValue('lastName', currentEmployee.lastName, { shouldValidate: true })
      setValue('description', currentEmployee.description || '', { shouldValidate: true })
      setValue('positions', currentEmployee.positions, { shouldValidate: true })
    }
  }, [ currentEmployee ])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors },
    reset
  } = useForm<FormData>({ mode: 'onChange' })

  useEffect(() => {
    if (newEmployee) {
      reset({
        id: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        description: '',
        positions: [],
        departments: [],
      })
    }
  }, [ newEmployee, reset ])


  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoadingPhoto(true)
    try {
      const file = event.target.files![0]
      const res = await upload(`${apiAdmin}/employee/photo`, file)
      setUploadedFile(res)
    } finally {
      setLoadingPhoto(false)
    }
  }

  const onSubmit = useCallback((data: FormData) => {
    debugger
    const { firstName, middleName, lastName, description } = data
    if (currentEmployee && id) {
      const employee = { ...currentEmployee }

      employee.id = parseInt(id)
      employee.firstName = firstName
      employee.middleName = middleName
      employee.lastName = lastName
      employee.description = description
      employee.positions = chosenPositions
      employee.departments = currentEmployee.departments
      if (uploadedFile) {
        employee.photoId = uploadedFile?.id
        employee.photoPath = uploadedFile?.path
      } else {
        employee.photoId = undefined
        employee.photoPath = undefined
      }
      dispatch(updateEmployeeAction(employee))
    } else {
      const employee: EmployeeNew = {
        firstName,
        middleName,
        lastName,
        description,
        positions: [],
        departments: [],
        photoId: uploadedFile?.id,
        photoPath: uploadedFile?.path
      }
      dispatch(saveEmployeeAction(employee))
    }
  }, [ currentEmployee, uploadedFile ]
  )

  const onCancel = useCallback(() => {
    debugger
    navigate(-1)
    dispatch(clearEmployeeAction())
  }, [])

  const onTargetClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click()
  }
  const buttonDisabled = () => (!isValid || isSubmitting)

  const onPositionChange = (values: Option[]) => {
    setChosenPositions(values)
  }

  return (
    <>
      <div className="employee">
        <form className="employee--form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label={'Фамилия'}
            error={errors.lastName?.type}
            register={register('lastName', {
              required: true,
              maxLength: 255,
              value: (currentEmployee?.lastName || '')
            })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Имя'}
            error={errors.firstName?.type}
            register={register('firstName', {
              required: true,
              maxLength: 255,
              value: (currentEmployee?.firstName || '')
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
              value: (currentEmployee?.middleName || '')
            })}
            classList="full-width"

          />
          <Textarea
            label={'Информация'}
            error={errors.description?.type}
            register={register('description', { value: (currentEmployee?.description || '') })}
            classList="full-width"
          />
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
          />
          <FileDrop
            onTargetClick={onTargetClick}>
            {(newEmployee || uploadedFile) ? (
              uploadedFile ? (
                <img src={uploadedFile.path} className="image"/>
              ) : (
                'Drop some files here!'
              )
            ) : (
              <img src={currentEmployee?.photoPath} className="image"/>
            )}
            {loadingPhoto && <div>Loading...</div>}
          </FileDrop>
          <Select
            options={positionOptions}
            isMulti={false}
            classList="full-width"
            valueMulti={chosenPositions}
            onChangeMulti={onPositionChange}
            label="Должности (факультет)"
          />

          <p className="p4">
            *Функциональность добавления сотруднику должности на кафедре на данной странице временно недоступна.
            Вы можете воспользоваться страницей редактирования кафедр.
          </p>
          <div className="buttons">
            <button
              type="submit"
              className={`button ${buttonDisabled() ? 'button__disabled' : ''}`}
              disabled={buttonDisabled()}
            >
              Сохранить
            </button>
            <button type="button" className="button" onClick={onCancel}>Отмена</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Employee
