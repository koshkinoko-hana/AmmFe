import './album.scss'
import PhotoInput from '@admin/components/photoInput'
import { createPhotoAction } from '@admin/ducks/actions/gallery'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import React, {
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormDataType, Image } from './types'

const CreateAlbum: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ images, setImages ] = useState<Image[]>([])
  const [ newImageForm, setNewImageForm ] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormDataType>({ mode: 'onChange' })

  const onImageAdd = async (image: Image) => {
    setImages([ ...images, { ...image, edit: false } ])
    setNewImageForm(false)
  }

  const onImageChange = async (index: number, image: Image, edit?: boolean) => {
    setImages([ ...images.slice(0, index),  { ...image, edit: edit || false}, ...images.slice(index + 1)])
  }
  const onImageDelete = async (index: number) => {
    setImages([ ...images.slice(0, index), ...images.slice(index + 1) ])
  }
  const showNewImageForm = () => {
    setNewImageForm(true)
  }

  const onSubmit = ({ title, albumDate, description }: FormDataType) => {

    const photosUploading: FormData[] = []
    const photosLinks: string[] = []
    images.forEach(image => {
      if (image.link) {
        photosLinks.push(image.link)
      }
      if (image.file) {
        const photo = new FormData()
        photo.append('file', image.file, 'file')
        photosUploading.push(photo)
      }
    })
    const album = {
      title,
      albumDate,
      description
    }
    dispatch(createPhotoAction(photo))
  }
  const onCancel = () => {
    navigate(-1)
  }

  const buttonDisabled = () => (!isValid || isSubmitting)

  return (
    <div className="album">
      <form className="album--form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label={'Название'}
          error={errors.title?.type}
          register={register('title', { required: true, maxLength: 255, value: '' })}
          classList="full-width"
        />
        <Textarea
          label={'Описание'}
          error={errors.title?.type}
          register={register('title', { required: true, maxLength: 255, value: '' })}
          classList="full-width"
        />
        <TextInput
          type="date"
          label={'Дата'}
          error={errors.albumDate?.type}
          register={register('albumDate', { required: true, value: new Date(), valueAsDate: true })}
          classList="full-width"
        />
        <p className="p3-label">Изображения</p>
        <div className="photos">
          {
            images.map(
              (i, index) =>
                <PhotoInput
                  key={index}
                  edit={i.edit}
                  saveImage={(image: Image) => onImageChange(index, image)}
                  onClose={() => onImageDelete(index)}
                  setIsEdit={() => onImageChange(index, i, true)}
                  currentImage={i}
                />
            )
          }
        </div>
        {
          newImageForm ?
            <div className="photos">
              <PhotoInput
                key="new"
                saveImage={onImageAdd}
                edit={true}
                close={true}
                onClose={() => setNewImageForm(false)}
                setIsEdit={() => {return}}
              />
            </div>
            :
            <>
              <br/>
              <button onClick={showNewImageForm}>Добавить фото</button>
            </>
        }
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

export default CreateAlbum
