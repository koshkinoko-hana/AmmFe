import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {

  const onClick = () => {
    if(!props.onClick || !props.photo)
      return
    props.onClick(props.photo.id)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.photo?.id || 'Id'}
      </p>
      <p className="p2">
        {props.photo?.title || 'Название'}
      </p>
      <p className="p2">
        {
          props.photo?.path ?
            <img src={props.photo?.path} className="preview"/> :
            'Фото'
        }
      </p>
      <p className="p2">
        {props.photo?.photoDate ? (new Date(props.photo.photoDate)).toDateString() : 'Дата'}
      </p>
    </div>
  )
}

export default ListItem
