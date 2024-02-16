import { Option } from '@common/components/select/types'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { ListItemProps } from './types'
import bucket from '~/assets/delete.svg'


const ListItem = (props: ListItemProps) => {

  const optionsToString = (items?: Option[]) => {
    if(!items) {
      return
    }
    let value = ''
    items.forEach(item => {value += item.label + ', '})
    return value.length ? value.substring(0, value.length - 2) : '-'

  }

  const onClick = () => {
    if(!props.onClick || !props.employee)
      return
    props.onClick(props.employee.id)
  }

  const handleDelete = () => {
    if(props.onDelete && props.employee) {
      props.onDelete(props.employee.id)
    }
  }

  return (
    <>
      <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
        <p className="p2">
          {props.employee?.id || 'Id'}
        </p>
        <p className="p2">
          {props.employee?.name || 'Имя'}
        </p>
        {!props.bold && (
          <div>
            <FaTrashAlt onClick={handleDelete} className="svg-dark svg-base-size"/>
          </div>
        )}
      </div>
    </>  
  )
}

export default ListItem
