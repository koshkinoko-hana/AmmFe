import './historyCarousel.scss'
import { Props } from './types'
import React, { useRef, useState } from 'react'

const HistoryCarousel: React.FC<Props> = ({points}) => {

  const ref = useRef<HTMLDivElement>(null)
  const [ currentPoint, setCurrentPoint ] = useState(0)

  return (
    <div ref={ref} className="history-carousel">
      <div className="history-carousel__container">
        <h2 className="history-carousel__title">История факультета</h2>
        <ul className="history-carousel_navigation">
          {points.map((point, i) => (
            <li key={point.year} className={`history-carousel_navigation__item ${currentPoint === i ? 'history-carousel_navigation__item--active' : ''}`} onClick={() => setCurrentPoint(i)}>
              <span>{point.year}</span>
            </li>
          ))}
        </ul>
        <div className="history-carousel_info">
          <h4 className="history-carousel_info__title">{points[currentPoint].header}</h4>
          <p className="history-carousel_info__desc">{points[currentPoint].text}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryCarousel
