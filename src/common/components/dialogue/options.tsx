import DepartmentDetails from '@admin/components/departmentDialogue'
import PositionDetails from '@admin/components/positionDialogue'
import { clearCurrentDepartmentAction } from '@admin/ducks/actions/department'
import { clearCurrentPositionAction } from '@admin/ducks/actions/position'
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
  },
  [DialogueOption.ADMIN_POSITION]: {
    header: 'Должность',
    body: <PositionDetails/>,
    onCloseAction: clearCurrentPositionAction
  }
}


export default dialogueOptions
