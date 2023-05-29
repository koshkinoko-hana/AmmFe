import './mainPage.scss'
import HistoryBlock from '@client/pages/mainPage/components/historyBlock'
import ReasonsBlock from '@client/pages/mainPage/components/reasonsBlock'
import React from 'react'
import TopBlock from '~/client/pages/mainPage/components/Slider/index'
import Footer from '../../components/footer'

const MainPage: React.FC = () => {

  return (
    <>
      <div className="client__main">
        <TopBlock />
        <ReasonsBlock />
        <HistoryBlock />
      </div>
    </>
  )
}

export default MainPage
