import Dialogue from '@admin/components/Dialogue'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { ListItemProps } from './types'
import bucket from '~/assets/delete.svg'


const ListItem = (props: ListItemProps) => {

  const [showDialog, setShowDialog] = useState(false)

  const onClick = () => {
    if(!props.onClick || !props.user)
      return
    props.onClick(props.user.id!)
  }

  const handleDelete = () => {
    setShowDialog(true)
  }

  return (
    <>
      <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={onClick}>
        <p className="p2">
          {props.user?.id || 'Id'}
        </p>
        <p className="p2">
          {props.user?.login || 'Логин'}
        </p>
        {!props.bold && (
          <div>
            <FaTrashAlt onClick={handleDelete} className="svg-dark svg-base-size"/>
          </div>
        )}

        {props.user && props.onDelete && showDialog &&
         <Dialogue
           message={`Вы действительно хотите удалить пользователя ${props.user.login}?`}
           onClick={() => props.onDelete && props.user && props.onDelete(props.user.id!)}
           header="Подтверждение удаления"
           showCancel={true}
           onCancelClick={() => setShowDialog(false)}
         />
        }
      </div>
    </>  
  )
}

export default ListItem
