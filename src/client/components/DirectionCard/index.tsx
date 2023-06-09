import React, { FC } from 'react'
import './DirectionCard.scss'
import { directionCard } from './types'

const DepartmentCard: FC<directionCard> = ({img, direction, backgroundColor, isActive, onClick}) => {
  return(
    <div 
      className={`direction_card_container ${isActive ? 'direction_card_container--active' : ''}`}
      onClick={onClick}
    >
      <div 
        className={'direction__card'}
        style={{ backgroundColor }}
        onClick={onClick}
      >
        <h4 className='direction__card__text'>{direction.name}</h4>
        <img 
          src={img} 
          alt='direction-icon' 
          className='direction__card__pic'
        />
        {isActive && 
          <>
            <h5>Отличительные особенности направления:</h5>
            <ul className='direction__card__list'>
              {direction.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <h5>Профили обучения:</h5>
            <ul className='direction__card__list'>
              {direction.profiles.map(profile => (
                <li key={profile}>{profile}</li>
              ))}
            </ul>
            <h5>Формы обучения:</h5>
            <ul className='direction__card__list'>
              {direction.forms.map(form => (
                <li key={form}>{form}</li>
              ))}
            </ul>
            <h5>Стоимость обучения по договору: {direction.price}₽</h5>
            <h5>Вступительные испытания:</h5>
            <ul className='direction__card__list'>
              {direction.exams.map(exam => (
                <li key={exam}>{exam}</li>
              ))}
            </ul>
          </>
        }
      </div>
    </div>
  )
}

export default DepartmentCard