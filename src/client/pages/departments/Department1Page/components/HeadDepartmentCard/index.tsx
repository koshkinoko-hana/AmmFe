import React, { FC } from 'react'
import './HeadDepartmentCard.scss'
import { headDepartmentCard } from '~/client/components/DepartmentCard/types'

const HeadDepartmentCard: FC<headDepartmentCard> = ({ img, name, descripton }) => {
  console.log('🚀 ~ file: index.tsx:6 ~ descripton:', descripton)
  console.log('🚀 ~ file: index.tsx:6 ~ name:', name)
    
  return(
    <div className='depart__body__head'>
      <div className='depart__body__head__img'>
        <img src={img} alt="" />
      </div>
      <div className='depart__body__head__text'>
        <h3>{name}</h3>
        <p>{descripton}</p>
      </div>
    </div>
  )
}

export default HeadDepartmentCard