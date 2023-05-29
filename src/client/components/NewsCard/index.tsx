import './NewsCard.scss'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { NewsCardLink } from '~/common/icons/NewsCardLink'
import placeholder from '../../../assets/placeholder.png'
import { Props } from './types'

export const NewsCard: FC<Props> = ({photoPath, photoAlt, name, description, createdAt, slug, requiresPhoto}) => {
  return (
    <div className='news-card'>
      {requiresPhoto && <img src={photoPath || placeholder} alt={photoAlt} className='news-card__img'/>}
      <h5 className="news-card__title">{name}</h5>
      <p className="news-card__desc">{description}</p>
      <div className="news-card_footer">
        <span className="news-card_footer__date">{createdAt}</span>
        <Link to={slug}>
          <NewsCardLink />
        </Link>
      </div>
    </div>
  )
}
