import { Image } from '@admin/pages/album/types'
import PhotoInput from '@admin/components/photoInput'
import TextInput from '@common/components/textInput'
import React, {
  useRef,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormDataType } from './types'

const CreatePhoto: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState<Image>({})

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormDataType>({ mode: 'onChange' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (file: File) => {
    setUploadedFile({ file })
  }

  const onImageLinkAdd = async (link: string) => {
    setUploadedFile({link})
  }

  const onSubmit = ({title, photoDate}: FormDataType) => {
    const photo = new FormData()
    photo.append('title', title)
    photo.append('photoDate', photoDate.toISOString())
    // if(uploadedFile) photo.append('file', uploadedFile, 'file')
    // dispatch(createPhotoAction(photo))
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
        <TextInput
          type="date"
          label={'Дата'}
          error={errors.photoDate?.type}
          register={register('photoDate', { required: true, value: new Date(), valueAsDate: true })}
          classList="full-width"
        />
        {/*<PhotoInput*/}
        {/*  label="Изображение"*/}
        {/*  setUploadedFile={onFileInputChange}*/}
        {/*  setLink={onImageLinkAdd}*/}
        {/*  disableChooseTab={true}*/}
        {/*/>*/}
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
