import { SlideProps } from '@client/pages/mainPage/components/Slider/types'
import React from 'react'
import girlMain from '~/assets/girl_main.png'

const Block1: React.FC<SlideProps> = ({slidesCount, curSlide}: SlideProps) => {
  return (
    <>
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
    </>
  )
}

export default Block1
