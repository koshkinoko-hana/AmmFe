import TextInput from '@common/components/textInput'
import React, {
  ChangeEvent,
  useRef,
  useState
} from 'react'
import { FileDrop } from 'react-file-drop'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormDataType } from './types'
import { createPhotoAction } from '~/admin/ducks/actions/gallery'

const CreatePhoto: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormDataType>({ mode: 'onChange' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(event.target.files![0])
  }

  const onSubmit = ({title}: FormDataType) => {
    const photo = new FormData()
    photo.append('title', title)
    if(uploadedFile) photo.append('file', uploadedFile, 'file')
    dispatch(createPhotoAction(photo))
  }
  const onCancel = () => {
    navigate(-1)
  }

  const onTargetClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click()
  }
  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    <div className="employee">
      <form className="employee--form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label={'Название'}
          error={errors.title?.type}
          register={register('title', { required: true, maxLength: 255, value: '' })}
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

export default CreatePhoto
