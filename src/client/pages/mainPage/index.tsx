import './mainPage.scss'
import { NewsPreview } from '@client/components/NewsPreview'
import HistoryBlock from '@client/pages/mainPage/components/historyBlock'
import ReasonsBlock from '@client/pages/mainPage/components/reasonsBlock'
import React from 'react'
import TopBlock from '~/client/pages/mainPage/components/Slider/index'

const MainPage: React.FC = () => {

  return (
    <>
      <div className="client__main">
        <TopBlock />
        <ReasonsBlock />
        <HistoryBlock />
        <NewsPreview title={'Новости'}/>
      </div>
    </>
  )
}

export default MainPage
