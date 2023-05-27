import React, { FC } from 'react'
import './EmployeeCard.scss'
import { employeeCard } from '~/client/components/DepartmentCard/types'

const EmployeeCard: FC<employeeCard> = ({ img, name, descripton }) => {
  return(
    <div className='card'>
      <div className='card__img'>
        <img src={img} alt="" />
      </div>
      <div className='card__text'>
        <h4>{name}</h4>
        <p>{descripton}</p>
      </div>
    </div>
  )
}

export default EmployeeCard