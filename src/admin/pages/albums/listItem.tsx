import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {

  const onClick = () => {
    if(!props.onClick || !props.album)
      return
    props.onClick(props.album.id)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.album?.id || 'Id'}
      </p>
      <p className="p2">
        {props.album?.title || 'Название'}
      </p>
      <p className="p2">
        {props.album?.date ? (new Date(props.album.date)).toDateString() : 'Дата'}
      </p>
    </div>
  )
}

export default ListItem
