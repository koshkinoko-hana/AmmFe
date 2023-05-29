import React from 'react'
import { GalleryCard } from '../types'

const Gallery: React.FC<GalleryCard> = ({title, url, createdAt, size}) => {
  return (
    <div className="gallery-card">
      <img src={url} alt={title} className='gallery-card__img'/>
      {size === 'big' 
        ? <h4 className='gallery-card__title'>{title}</h4>
        : <h5 className='gallery-card__title'>{title}</h5>
      }
      <p className='gallery-card__date p3'>{createdAt}</p>
    </div>
  )
}
  
export default Gallery