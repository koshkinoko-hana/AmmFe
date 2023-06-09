import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './DepartmentCard.scss'
import { departmentCardBack } from './types'
interface DepartmentCardProps {
  link: string;
  title: string;
  eId: departmentCardBack;
}


const DepartmentCard: FC<DepartmentCardProps> = ({link, title, eId}) => {
  console.log('🚀 ~ file: index.tsx:13 ~ link:', link)
  
  return(
    <Link to={link} className="p1">
      <div 
        className='department__card'
        style={{ background: eId.backgroundColor }}
      >
        <h4 className='department__card__text'>{title}</h4>
        <img 
          src={eId.img} 
          alt='department-icon' 
          className='department__card__pic'
        />
      </div>
    </Link>
  )
}


export default DepartmentCard