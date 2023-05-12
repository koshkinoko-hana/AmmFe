import React from 'react'
import girlMain from '../../../../assets/girl_main.png'

const TopBlock: React.FC = () => {


  return (
    <div>
      <div className="top-block">
        <div className="wrapper">
          <div className="container container__top-block">
            <div className="info">
              <h1>Подбери свою программу обучения</h1>
              <p className="p2">ПММ – это самый престижный факультет сегодня <br/> и гарантия вашего успеха завтра!</p>
              <button className="button">Выбрать направление</button>
            </div>
            <img className="image" src={girlMain}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBlock
