import { Department } from '@common/components/types/department'
import React from 'react'
import { ListItemProps } from '@admin/pages/departments/types'


const ListItem = (props: ListItemProps) => {
  return (
    <div className={`item ${props.bold ? 'item__bold': ''}`} onClick={() => props.onClick && props.onClick({...props.department, competencies: []} as Department)}>
      <p className="p2">
        {props.department.id}
      </p>
      <p className="p2">
        {props.department.name}
      </p>
      <p className="p2">
        {props.department.description}
      </p>
    </div>
  )
}

export default ListItem
