import './departments.scss'
import { fetchDepartmentListAction } from '@admin/ducks/actions/department'
import { getDepartmentLoading, getDepartments } from '@admin/ducks/selectors/department'
import ListItem from '@admin/pages/departments/listItem'
import { openDialogueAction } from '@common/ducks/slice/dialogue'
import { DialogueOption } from '@common/ducks/types/dialogueOption'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import List from '~/common/components/list'
import { AdminRoutes } from '~/common/types/routes'

const Departments: React.FC = () => {
  const { id_default } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const departments = useSelector(getDepartments)
  const loading = useSelector(getDepartmentLoading)

  useEffect(() => {
    dispatch(fetchDepartmentListAction())
  }, [])

  const createDepartment = useCallback(() => {
    dispatch(openDialogueAction(DialogueOption.ADMIN_DEPARTMENT))
  }, [])

  const updateDepartment = (id: number) => {
    console.log('🚀 ~ file: index.tsx:29 ~ updateDepartment ~ id:', id)
    if(id === 0)
      navigate(`/${AdminRoutes.root}/${AdminRoutes.department}`)
    else
      navigate(`/${AdminRoutes.root}/${AdminRoutes.department}/${id}`)
  } 

  if(id_default === undefined || id_default === '0'){
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
            ...departments.map((d) => <ListItem department={d} key={d.id} onClick={() => updateDepartment(d.id)}/>)
          ]}/>
        </div>
    )
  } else {
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
            ...departments.map((d) => <ListItem department={d} key={d.id} onClick={() => updateDepartment(d.id-1)}/>)
          ]}/>
        </div>
    )
  }
}

export default Departments
