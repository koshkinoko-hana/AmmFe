import './NewsPreview.scss'
import React, { FC, useEffect } from 'react'
import { Props } from './types'
import { useAppDispatch, useAppSelector } from '~/common/store'
import { fetchNewsPreviewAction } from '~/client/ducks/actions/news'
import { NewsCard } from '../NewsCard'
import newsIcon from '../../../assets/news.svg'
import { Link } from 'react-router-dom'
import { PaginateRight } from '~/common/icons/PaginateRight'

export const NewsPreview: FC<Props> = ({title}) => {

  const dispatch = useAppDispatch()
  const {newsPreview} = useAppSelector(state => state.client.news)

  useEffect(() => {
    dispatch(fetchNewsPreviewAction())
  }, [])

  return (
    <div className='news-preview'>
      <h2 className='news-preview__title'>{title}</h2>
      <div className='news-preview__list'>
        {newsPreview.map(item => (
          <NewsCard {...item} key={item.slug}/>
        ))}
        <div className='news-preview__link'>
          <img src={newsIcon} alt="новости картинка" />
          <Link to="/news">
            <span>Все новости</span>
            <PaginateRight />
          </Link>
        </div>
      </div>
    </div>
  )
}
