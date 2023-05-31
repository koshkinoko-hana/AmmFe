import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {

  const onClick = () => {
    if(!props.onClick || !props.faq)
      return
    props.onClick(props.faq.id)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.faq?.id || 'Id'}
      </p>
      <p className="p2">
        {props.faq?.name || 'Полное имя'}
      </p>
      <p className="p2">
        {props.faq?.question || 'Вопрос'}
      </p>
      <p className="p2">
        {props.faq?.answer || 'Ответ'}
      </p>
      <p className="p2">
        {props.faq?.respondent || 'Автор ответа'}
      </p>
    </div>
  )
}

export default ListItem
