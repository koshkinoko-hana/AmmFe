import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {


  const onClick = () => {
    if(!props.onClick || !props.news)
      return
    props.onClick(props.news.slug)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.news?.slug || 'Slug'}
      </p>
      <p className="p2">
        {props.news?.name || 'Заголовок'}
      </p>
      <p className="p2">
        {props.news?.createdAt || 'Дата создания'}
      </p>
      <p className="p2">
        {props.news?.updatedAt || 'Дата обновления'}
      </p>
    </div>
  )
}

export default ListItem
