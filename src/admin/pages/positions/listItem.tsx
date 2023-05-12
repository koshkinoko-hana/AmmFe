import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {
  return (
    <div
      className={`item ${props.bold ? 'item__bold': ''}`}
      onClick={() => props.onClick && props.position && props.onClick(props.position)}
    >
      <p className="p2">
        {props.position?.id || 'Id'}
      </p>
      <p className="p2">
        {props.position?.name || 'Название'}
      </p>
    </div>
  )
}

export default ListItem
