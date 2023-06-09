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
      <p className="p2">
        {props.direction?.features ? props.direction?.features.length ? props.direction?.features.join(', ') : '' : 'Особенности'}
      </p>
      <p className="p2">
        {props.direction?.profiles ? props.direction?.profiles.length ? props.direction?.profiles.join(', ') : '' : 'Профили'}
      </p>
      <p className="p2">
        {props.direction?.forms ? props.direction?.forms.length ? props.direction?.forms.join(', ') : '' : 'Формы обучения'}
      </p>
      <p className="p2">
        {props.direction?.price === undefined ? 'Цена' : props.direction?.price}
      </p>
      <p className="p2">
        {props.direction?.exams ? props.direction?.exams.length ? props.direction?.exams.join(', ') : '' : 'Вступительные испытания'}
      </p>
    </div>
  )
}

export default ListItem
