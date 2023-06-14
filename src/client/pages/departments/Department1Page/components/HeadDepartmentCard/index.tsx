import React, { FC } from 'react'
import './HeadDepartmentCard.scss'
import { headDepartmentCard } from '~/client/components/DepartmentCard/types'
import ShapedImg from '~/client/components/ShapedImg'

const HeadDepartmentCard: FC<headDepartmentCard> = ({ img, name, description }) => {
  return(
    <div className='depart__body__head'>
      <div className='depart__body__head__img'>
        <ShapedImg src={img} alt="" size={120}/>
      </div>
      <div className='depart__body__head__text'>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default HeadDepartmentCard