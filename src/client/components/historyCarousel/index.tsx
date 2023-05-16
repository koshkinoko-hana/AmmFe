import './historyCarousel.scss'
import { Props } from './types'
import useWindowDimensions from '@common/hooks/useWindowDimensions'
import React, { useRef, useState } from 'react'

const HistoryCarousel: React.FC<Props> = ({points}) => {

  const ref = useRef<HTMLDivElement>(null)

  const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0)
  const { width } = useWindowDimensions()
  const [ currentPoint, setCurrentPoint ] = useState(0)

  // const onArrowClick = (forward: boolean) => {
  //   let newPosition
  //   if (!ref.current) return
  //   if (forward) {
  //     newPosition = currentScrollPosition + width
  //     setCurrentSlide((slide) => slide + 1)
  //     if (ref.current.clientWidth - width < newPosition) {
  //       newPosition = ref.current.clientWidth - width
  //       setCurrentSlide(points.length - 1)
  //     }
  //   } else {
  //     newPosition = currentScrollPosition - width
  //     setCurrentSlide((slide) => slide - 1)
  //     if (newPosition < 0) {
  //       newPosition = 0
  //       setCurrentSlide(0)
  //     }
  //   }

  //   ref.current?.scrollTo({ left: newPosition })
  //   setCurrentScrollPosition(newPosition)
  // }

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
          <h3 className="history-carousel_info__title">{points[currentPoint].header}</h3>
          <p className="history-carousel_info__desc">{points[currentPoint].text}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryCarousel
