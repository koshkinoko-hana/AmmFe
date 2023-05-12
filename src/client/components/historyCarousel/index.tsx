import './index.scss'
import { historyPoints } from '@client/pages/mainPage/constants'
import { HistoryPoint } from '@client/pages/mainPage/types'
import { Props } from './types'
import useWindowDimensions from '@common/hooks/useWindowDimensions'
import { SlideArrowLeft } from '@common/icons/SlideArrowLeft'
import { SlideArrowRight } from '@common/icons/SlideArrowRight'
import React, { useRef, useState } from 'react'

const HistoryCarousel: React.FC<Props> = (props) => {

  const ref = useRef<HTMLDivElement>(null)

  const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0)
  const { width } = useWindowDimensions()
  const [ currentSlide, setCurrentSlide ] = useState(0)

  const onArrowClick = (forward: boolean) => {
    let newPosition
    if (!ref.current) return
    if (forward) {
      newPosition = currentScrollPosition + width
      setCurrentSlide((slide) => slide + 1)
      if (ref.current.clientWidth - width < newPosition) {
        newPosition = ref.current.clientWidth - width
        setCurrentSlide(props.points.length - 1)
      }
    } else {
      newPosition = currentScrollPosition - width
      setCurrentSlide((slide) => slide - 1)
      if (newPosition < 0) {
        newPosition = 0
        setCurrentSlide(0)
      }
    }

    ref.current?.scrollTo({ left: newPosition })
    setCurrentScrollPosition(newPosition)
  }

  return (
    <div ref={ref} className="history-carousel history-carousel__container">
      <div className="slider">
        {
          historyPoints.map((history: HistoryPoint, i: number) => (
            <div className={`item ${i===currentSlide ? 'selected' : ''}`} key={i}>
              <p className="legend year">{history.year}</p>
              <div className="item__text">
                <h3 className="reasons-block__header">{history.header}</h3>
                <p className="p2">{history.text}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="arrows">
        <SlideArrowLeft onClick={() => onArrowClick(false)}/>
        <SlideArrowRight onClick={() => onArrowClick(true)}/>
      </div>
    </div>
  )
}

export default HistoryCarousel
