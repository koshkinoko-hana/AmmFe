import React, { useEffect, useRef, useState } from 'react'
import girlMain from '../../../../../assets/girl_main.png'
import './Slider.scss'

const slidesCount = 4

const Slider: React.FC = () => {

  const [curSlide, setCurSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      swipeLeft()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [curSlide])

  function swipeRight() {
    if(curSlide - 1 >= 0) {
      setCurSlide(prev => prev - 1)
    }
    else {
      setCurSlide(slidesCount - 1)
    }
  }
  function swipeLeft() {
    console.log(curSlide)
    if(curSlide + 1 <= slidesCount - 1) {
      setCurSlide(prev => prev + 1)
    }
    else {
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
    if(swipeLength > 50)
      swipeRight()
    else if(swipeLength < -50)
      swipeLeft()
    swipeLength = 0
  }

  return (
    <div className="slider">
      <div 
        className="slider__line"
        style={{left: `-${curSlide * 100}vw`}}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        {new Array(slidesCount).fill(0).map((_, i) => (
          <div className="item" key={i}>
            <div className="info">
              <h1>Подбери свою <br/>программу обучения</h1>
              <p className="p2">ПММ – это самый престижный факультет сегодня <br/> и гарантия вашего успеха завтра!</p>
              <button className="button">Выбрать направление</button>
              <ul className='slider_indexes'>
                {new Array(slidesCount).fill(0).map((_, i) => (
                  <li key={i} className={`slider_indexes__item ${i === curSlide ? 'slider_indexes__item--active' : ''}`}></li>
                ))}
              </ul>
            </div>
            <img className="image" src={girlMain}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
