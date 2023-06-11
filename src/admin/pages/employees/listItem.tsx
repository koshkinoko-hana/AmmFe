import { Option } from '@common/components/select/types'
import React from 'react'
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
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
        <p className="p2">
          {optionsToString(props.employee?.departments) || 'Кафедра'}
        </p>
        <p className="p2">
          {optionsToString(props.employee?.positions) || 'Должность'}
        </p>
        {!props.bold && (
          <div>
            <button
              onClick={handleDelete}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `url(${bucket}) no-repeat center`,
                backgroundSize: 'contain',
                width: '24px', 
                height: '24px',
                border: 'none', 
                cursor: 'pointer',
                padding: '0',
                borderRadius: '0',
                margin: 'auto',
              }}
            />
          </div>
        )}
      </div>
    </>  
  )
}

export default ListItem
