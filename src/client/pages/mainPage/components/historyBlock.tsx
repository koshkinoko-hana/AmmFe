import 'react-responsive-carousel/lib/styles/carousel.min.css'
import HistoryCarousel from '@client/components/historyCarousel'
import { historyPoints } from '@client/pages/mainPage/constants'
import React from 'react'

const HistoryBlock: React.FC = () => {

  return (
    <div className="history-block">
      <HistoryCarousel points={historyPoints}/>
    </div>
  )
}

export default HistoryBlock
