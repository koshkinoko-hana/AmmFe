import './NewsCard.scss'
import React, { FC } from 'react'
import { newsCard } from '~/client/pages/news/types'
import { NewsCardLink } from '~/common/icons/NewsCardLink'

export const NewsCard: FC<newsCard> = ({img, title, description, date, slug}) => {
  return (
    <div className='news-card'>
      <img src={img} alt="картиночка" className='news-card__img'/>
      <h5 className="news-card__title">{title}</h5>
      <p className="news-card__desc">{description}</p>
      <div className="news-card_footer">
        <span className="news-card_footer__date">{date}</span>
        <a href={slug} target="_blank" rel="noreferrer">
          <NewsCardLink />
        </a>
      </div>
    </div>
  )
}
