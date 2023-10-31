import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {

  const onClick = () => {
    if(!props.onClick || !props.direction) return
    props.onClick(props.direction.id)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.direction?.id || 'Id'}
      </p>
      <p className="p2">
        {props.direction?.number || 'Номер'}
      </p>
      <p className="p2">
        {props.direction?.type || 'Тип'}
      </p>
      <p className="p2">
        {props.direction?.name || 'Название'}
      </p>
    </div>
  )
}

export default ListItem
