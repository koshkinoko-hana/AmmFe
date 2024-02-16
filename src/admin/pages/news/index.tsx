import './news.scss'
import {
  fetchDepartmentOptionsAction,
} from '@admin/ducks/actions/department'
import {
  clearNewsAction,
  fetchNewsAction,
  saveNewsAction,
  updateNewsAction
} from '@admin/ducks/actions/news'
import { fetchPositionOptionsAction } from '@admin/ducks/actions/position'
import { getCurrentNews } from '@admin/ducks/selectors/news'
import { NewsNew } from '@admin/ducks/types/news'
import Textarea from '@common/components/textarea'
import TextInput from '@common/components/textInput'
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import slugify from 'slugify'
import { FormData } from './types'
import Editor from '@common/components/editor'

// для работы editor в dev режиме необходимо закомментировать useStrict в App.tsx
const NewsDetails: React.FC = () => {

  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentNews = useSelector(getCurrentNews)
  const [article, setArticle] = useState<string>('')

  useEffect(() => {
    if (slug) {
      dispatch(fetchNewsAction({slug}))
    }
    dispatch(fetchPositionOptionsAction())
    dispatch(fetchDepartmentOptionsAction())
  }, [])

  useEffect(() => {
    if(currentNews) {
      console.log(currentNews)
    }
  }, [currentNews])

  const generateSlug = (e: SyntheticEvent) => {
    const name = (e.target as HTMLInputElement).value
    const slug = slugify(name, {lower: true})
    setValue('slug', slug)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormData>({ mode: 'onChange' })

  const onSubmit = useCallback((data: FormData) => {
    const { slug, name, description } = data
    if (currentNews) {
      const news = { ...currentNews }
      news.name = name
      news.description = description
      news.article = article
      dispatch(updateNewsAction(news))
    } else {
      const news: NewsNew = {
        slug,
        name,
        description,
        article,
      }
      dispatch(saveNewsAction(news))
    }
  }, [])

  const onCancel = useCallback(() => {
    navigate(-1)
    dispatch(clearNewsAction())
  }, [])

  const buttonDisabled = () => (!isValid || isSubmitting)

  if(!slug || currentNews) {
    return (
      <div className="employee">
        <form className="employee--form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label={'Slug'}
            error={errors.slug?.type}
            register={register('slug', {
              required: true,
              maxLength: 255,
              value: currentNews?.slug || '',
            })}
            classList="full-width"
          />
          <TextInput
            type="text"
            label={'Заголовок'}
            error={errors.name?.type}
            register={register('name', {
              required: true,
              maxLength: 255,
              value: currentNews?.name || '',
              onChange: generateSlug
            })}
            classList="full-width"
          />
          <Textarea
            label={'Короткое описание'}
            error={errors.description?.type}
            register={register('description', {
              required: true,
              maxLength: 255,
              value: currentNews?.description || ''
            })}
            classList="full-width"

          />
          <Editor onChange={setArticle} />
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

export default NewsDetails
