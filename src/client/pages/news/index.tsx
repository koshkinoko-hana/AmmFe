import './newsPage.scss'
import HistoryBlock from '@client/pages/mainPage/components/historyBlock'
import ReasonsBlock from '@client/pages/mainPage/components/reasonsBlock'
import React from 'react'
import TopBlock from '~/client/pages/mainPage/components/topBlock'
import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'

const News: React.FC = () => {

  return (
    <div className="client__main">
      <Header 
        header={'Новости'} 
        description={'Новости факультета, события, мероприятия и объявления'} 
        path={{
          [PathKey.NEWS]: ClientRoutes.news
        }}/>
      <TopBlock />
      <ReasonsBlock />
      <HistoryBlock />
    </div>
  )
}

export default News
