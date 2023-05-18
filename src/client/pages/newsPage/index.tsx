import './newsPage.scss'
import React, { useEffect } from 'react'
import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'
import {NewsCard} from '~/client/components/NewsCard'
import { Pagination } from '~/client/components/Pagination'
import { useAppDispatch, useAppSelector } from '~/common/store'
import { fetchNewsListAction } from '~/client/ducks/actions/news'

const limit = 9

const News: React.FC = () => {
  const { news } = useAppSelector(state => state.client.news)
  const dispatch = useAppDispatch()

  const [offset, setOffset] = React.useState(0)

  useEffect(() => {
    dispatch(fetchNewsListAction(offset))
  }, [offset])


  return (
    <div className="client__main">
      <Header 
        header={'Новости'} 
        description={'Новости факультета, события, мероприятия и объявления'} 
        path={{
          [PathKey.NEWS]: ClientRoutes.news
        }}
      />
      <div className="news-container">
        {news.slice(offset, offset + 9).map(newsCard => (
          <NewsCard key={Math.random()} {...newsCard} requiresPhoto={true}/>
        ))}
      </div>
      {news.length > limit && <Pagination offset={offset} setOffset={setOffset} limit={limit} total={news.length} />}
    </div>
  )
}

export default News
