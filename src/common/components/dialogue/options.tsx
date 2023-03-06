import DepartmentDetails from '@admin/components/departmentDialogue'
import { clearCurrentDepartmentAction } from '@admin/ducks/actions/department'
import { DialogueOption } from '@common/ducks/types/dialogueOption'
import React from 'react'
import { AnyAction } from 'redux'

const dialogueOptions: {
  [key: string]: {
    header: string
    body: React.ReactNode,
    onCloseAction: () => AnyAction
  }
} = {
  [DialogueOption.ADMIN_DEPARTMENT]: {
    header: 'Кафедра',
    body: <DepartmentDetails/>,
    onCloseAction: clearCurrentDepartmentAction
  }
}


export default dialogueOptions
