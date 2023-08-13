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

const Employee = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentEmployee = useSelector(getCurrentEmployee)
  const positions = useSelector(getPositionOptions)
  const departments = useSelector(getDepartmentOptions)
  const isLoading = useSelector(getEmployeeLoading)
  const [chosenPositions, setChosenPositions] = useState<MultiValue<Option>>([])
  const [chosenDepartments, setChosenDepartments] = useState<MultiValue<Option>>([])
  const [uploadedFile, setUploadedFile] = useState<UploadedFileResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  const [newEmployee, setNewEmployee] = useState(false)

  const handlePositionsChange: (values: MultiValue<Option> | SingleValue<Option>) => void = (values) => {
    setChosenPositions(Array.isArray(values) ? values : [values])
  }

  const handleDepartmentsChange: (values: MultiValue<Option> | SingleValue<Option>) => void = (values) => {
    setChosenDepartments(Array.isArray(values) ? values : [values])
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeAction({id}))
      setNewEmployee(false)
    }
    if(id === undefined) {
      setNewEmployee(true)
    }
    dispatch(fetchPositionOptionsAction())
    dispatch(fetchDepartmentOptionsAction())
  }, [])

  
  const {
    register,
    handleSubmit,
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
  }, [newEmployee, reset])


  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoadingPhoto(true)
    try{
      const file = event.target.files![0]
      const res = await upload(`${apiAdmin}/employee/photo`, file)
      setUploadedFile(res)
    } finally {
      setLoadingPhoto(false)
    }
  }

  const onSubmit = useCallback((data: FormData) => {
    setLoading(true)
    try{
      const { firstName, middleName, lastName, description } = data
      if (currentEmployee && id) {
        const employee = { ...currentEmployee }
  
        employee.id =  parseInt(id)
        employee.firstName = firstName
        employee.middleName = middleName
        employee.lastName = lastName
        employee.description = description
        employee.positions = ((chosenPositions?.length > 0 ? chosenPositions: currentEmployee.positions)  as Option[]).map((d) => ({
          id: d.value as number, 
          name: d.label as string,
          value: d.value as number,
          label: d.label as string,
        }))
        employee.departments = ((chosenDepartments?.length > 0 ? chosenDepartments: currentEmployee.departments) as Option[]).map((d) => ({
          id: d.value as number, 
          name: d.label as string,
          value: d.value as number,
          label: d.label as string,
        }))
        if(uploadedFile)
        {
          employee.photoId = uploadedFile?.id
          employee.photoPath = uploadedFile?.path
        }
        else{
          employee.photoId = undefined          
          employee.photoPath = undefined          
        }
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
          photoPath: uploadedFile?.path
        }
        dispatch(saveEmployeeAction(employee))
      }
    } finally {
      setLoading(false)
    }
  }, [chosenPositions, chosenDepartments, currentEmployee, uploadedFile])

  const onCancel = useCallback(() => {
    navigate(-1)
    dispatch(clearEmployeeAction())
  }, [])

  const onTargetClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click()
  }
  const buttonDisabled = () => (!isValid || isSubmitting)

  if(isLoading) 
  {
    <>Загрузка...</>
  }
  else if(!id || currentEmployee)
  {
    currentEmployee?.positions.map(item => ({
      value: item.value, 
      label: item.label 
    })) || []
   
    return( 
      <>
        <div className="employee">
          <form className="employee--form" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              type="text"
              label={'Фамилия'}
              error={errors.lastName?.type}
              register={register('lastName', { required: true, maxLength: 255, value: (currentEmployee?.lastName || '') })}
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
            {/*<Select*/}
            {/*  options={positions}*/}
            {/*  onChange={handlePositionsChange}*/}
            {/*  isMulti={true}*/}
            {/*  label="Должности"*/}
            {/*  defaultValue={currentEmployee?.positions || []}*/}
            {/*  classList="full-width"*/}
            {/*  register={register('positions', { */}
            {/*    value: currentEmployee?.positions || []*/}
            {/*  })}*/}
            {/*/>*/}
            {/*<Select*/}
            {/*  options={departments}*/}
            {/*  onChange={handleDepartmentsChange}*/}
            {/*  isMulti={true}*/}
            {/*  label="Кафедры"*/}
            {/*  classList="full-width"*/}
            {/*  defaultValue={currentEmployee?.departments || []}*/}
            {/*  register={register('departments', { */}
            {/*    value: currentEmployee?.departments || []*/}
            {/*  })}*/}
            {/*/>*/}
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
                  <img src={uploadedFile.path} className="image" />
                ) : (
                  'Drop some files here!'
                )
              ) : (
                <img src={currentEmployee?.photoPath} className="image" />
              )}
              {loadingPhoto && <div>Loading...</div>}
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
      </>
    //      ))
    )
  }
  return (<></>)
}

export default Employee
