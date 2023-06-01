import React from 'react'
import './GalleryCard.scss'
import { GalleryCardType } from '../types'

const GalleryCard: React.FC<GalleryCardType> = ({title, path, createdAt, size}) => {
  return (
    <div className="gallery-card">
      <img src={path} alt={title} className='gallery-card__img'/>
      {title && (size === 'big' 
        ? <h4 className='gallery-card__title'>{title}</h4>
        : <h5 className='gallery-card__title'>{title}</h5>
      )}
      <p className='gallery-card__date p3'>{createdAt}</p>
    </div>
  )
}
  
export default GalleryCard