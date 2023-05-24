import './newsDetailsPage.scss'
import React, { useEffect } from 'react'
import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'
import { useAppDispatch, useAppSelector } from '~/common/store'
import { fetchNewsDetailsAction } from '~/client/ducks/actions/news'
import { Link, useParams } from 'react-router-dom'
import { Calendar } from '~/common/icons/Calendar'
import { GoToPrevPage } from '~/common/icons/GoToPrevPage'
import placeholder from '../../../assets/placeholder.png'
import { NewsPreview } from '~/client/components/NewsPreview'

const NewsDetails: React.FC = () => {
  const { details } = useAppSelector(state => state.client.news)
  const dispatch = useAppDispatch()
  const {slug} = useParams()

  useEffect(() => {
    dispatch(fetchNewsDetailsAction(slug))
  }, [])


  return (
    <div className="client__main">
      <Header 
        header={details.name}
        path={{
          [PathKey.NEWS]: ClientRoutes.news,
          [details.name]: slug || ''
        }}
      />
      <div className="details">
        <Link to="/news" className='details__back'>
          <GoToPrevPage />
          <span>Все новости</span>
        </Link>
        <img src={details.photoPath || placeholder} alt={details.photoAlt} className="details__img" />
        <div className="details__date">
          <Calendar />
          <span>{details.createdAt}</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: details.article || ''}} />
      </div>
      <NewsPreview title={'Другие новости'}/>
    </div>
  )
}

export default NewsDetails
