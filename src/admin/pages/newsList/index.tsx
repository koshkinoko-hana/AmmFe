import './newsList.scss'
import { fetchNewsListAction } from '@admin/ducks/actions/news'
import { getNewsList, getNewsLoading } from '@admin/ducks/selectors/news'
import ListItem from '@admin/pages/newsList/listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '~/common/components/list'

const News: React.FC = () => {

  const dispatch = useDispatch()
  const newsList = useSelector(getNewsList)
  const loading = useSelector(getNewsLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchNewsListAction())
  }, [])

  const createNews = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.news}/create`)
  }

  const updateNews = (slug: string) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.news}/${slug}`)
  }

  return (
    loading ?
      <>loading</> :
      newsList &&
      <div className="container news">
        <div className="news__header">
          <h1>Сотрудники</h1>
          <button onClick={createNews}>Новая</button>
        </div>
        <List itemsRender={[
          <ListItem key="header" bold={true}/>,
          ...newsList.map((n) => <ListItem news={n} key={n.slug} onClick={updateNews}/>)
        ]}/>
      </div>
  )
}

export default News
