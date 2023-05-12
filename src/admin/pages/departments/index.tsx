import './departments.scss'
import { fetchDepartmentListAction, setCurrentDepartmentAction } from '@admin/ducks/actions/department'
import { getDepartmentLoading, getDepartments } from '@admin/ducks/selectors/department'
import ListItem from '@admin/pages/departments/listItem'
import { Department } from '@common/components/types/department'
import { openDialogueAction } from '@common/ducks/slice/dialogue'
import { DialogueOption } from '@common/ducks/types/dialogueOption'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '~/common/components/list'

const Departments: React.FC = () => {

  const dispatch = useDispatch()
  const departments = useSelector(getDepartments)
  const loading = useSelector(getDepartmentLoading)

  useEffect(() => {
    dispatch(fetchDepartmentListAction())
  }, [])

  const createDepartment = useCallback(() => {
    dispatch(openDialogueAction(DialogueOption.ADMIN_DEPARTMENT))
  }, [])

  const updateDepartment = useCallback((d: Department) => {
    dispatch(setCurrentDepartmentAction(d))
    dispatch(openDialogueAction(DialogueOption.ADMIN_DEPARTMENT))
  }, [])

  return (
    loading ?
      <>loading</> :
      departments &&
      <div className="container departments">
        <div className="departments__header">
          <h1>Кафедры</h1>
          <button onClick={createDepartment}>Новая</button>
        </div>
        <List itemsRender={[
          <ListItem department={{id: 'Id', name: 'Название', description: 'Описание'}} key="header" bold={true}/>,
          ...departments.map((d) => <ListItem department={d} key={d.id} onClick={updateDepartment}/>)
        ]}/>
      </div>
  )
}

export default Departments
