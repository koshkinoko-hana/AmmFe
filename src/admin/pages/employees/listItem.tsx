import { Option } from '@common/components/select/types'
import React from 'react'
import { ListItemProps } from './types'


const ListItem = (props: ListItemProps) => {

  const optionsToString = (items?: Option[]) => {
    if(!items) {
      return
    }
    let value = ''
    console.log('🚀 ~ file: listItem.tsx:14 ~ optionsToString ~ items:', items)
    items.forEach(item => {value += item.label + ', '})
    return value.length ? value.substring(0, value.length - 2) : '-'

  }

  const onClick = () => {
    if(!props.onClick || !props.employee)
      return
    props.onClick(props.employee.id)
  }

  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
      <p className="p2">
        {props.employee?.id || 'Id'}
      </p>
      <p className="p2">
        {props.employee?.name || 'Имя'}
      </p>
      <p className="p2">
        {optionsToString(props.employee?.departments) || 'Кафедра'}
      </p>
      <p className="p2">
        {optionsToString(props.employee?.positions) || 'Должность'}
      </p>
    </div>
  )
}

export default ListItem
