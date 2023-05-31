import Block1 from '@client/pages/mainPage/components/Slider/block1'
import Block2 from '@client/pages/mainPage/components/Slider/block2'
import React, { useEffect, useState } from 'react'
import './Slider.scss'

const slidesCount = 2

const Slider: React.FC = () => {

  const [ curSlide, setCurSlide ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      swipeLeft()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [ curSlide ])

  function swipeRight() {
    if (curSlide - 1 >= 0) {
      setCurSlide(prev => prev - 1)
    } else {
      setCurSlide(slidesCount - 1)
    }
  }

  function swipeLeft() {
    console.log(curSlide)
    if (curSlide + 1 <= slidesCount - 1) {
      setCurSlide(prev => prev + 1)
    } else {
      setCurSlide(0)
    }
  }

  let swipeLength = 0
  let swipeStartPos = 0

  function touchStartHandler(e: React.TouchEvent<HTMLDivElement>) {
    swipeStartPos = e.touches[0].clientX
  }

  function touchMoveHandler(e: React.TouchEvent<HTMLDivElement>) {
    swipeLength = e.touches[0].clientX - swipeStartPos
  }

  function touchEndHandler() {
    if (swipeLength > 50)
      swipeRight()
    else if (swipeLength < -50)
      swipeLeft()
    swipeLength = 0
  }

  return (
    <div className="slider">
      <div
        className="slider__line"
        style={{ left: `-${curSlide * 100}vw` }}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        <div className="item" key="1">
          <Block1 slidesCount={2} curSlide={0}/>
        </div>
        <div className="item" key="2">
          <Block2 slidesCount={2} curSlide={1}/>
        </div>
      </div>
    </div>
  )
}

export default Slider
