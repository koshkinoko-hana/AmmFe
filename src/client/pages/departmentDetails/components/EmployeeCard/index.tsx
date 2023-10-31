import React, { FC } from 'react'
import './EmployeeCard.scss'
import { EmployeeCard as EmployeeCardType } from '@client/pages/departments/DepartmentCard/types'
import ShapedImg from '@client/components/ShapedImg'

const EmployeeCard: FC<EmployeeCardType> = ({ img, name, positions }) => {
  return(
    <div className='card'>
      <div className='card__img'>
        <ShapedImg src={img} alt="" size={90}/>
      </div>
      <div className='card__text'>
        <h4>{name}</h4>
        <p>Должность: {positions.join(', ')}</p>
      </div>
    </div>
  )
}

export default EmployeeCard
