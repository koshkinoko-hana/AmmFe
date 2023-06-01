import { SlideProps } from '@client/pages/mainPage/components/Slider/types'
import React from 'react'
import robot from '~/assets/robot.png'

const Block2: React.FC<SlideProps> = ({slidesCount, curSlide}: SlideProps) => {

  const onButtonClick = () => {
    window.open('http://www.amm.vsu.ru/amm_skynet/?utm_source=mainamm&utm_medium=banner&utm_campaign=robotics', '_blank')
  }

  return (
    <>
      <div className="info">
        <h1>Мехатроника <br/> и робототехника</h1>
        <p className="p2">Новейшее направление факультета ПММ ВГУ</p>
        <button className="button" onClick={onButtonClick}>Узнать как поступить</button>
        <ul className='slider_indexes'>
          {new Array(slidesCount).fill(0).map((_, i) => (
            <li key={i} className={`slider_indexes__item ${i === curSlide ? 'slider_indexes__item--active' : ''}`}></li>
          ))}
        </ul>
      </div>
      <img className="image" src={robot}/>
    </>
  )
}

export default Block2
