import './departments.scss'
import { fetchDepartmentListAction } from '@admin/ducks/actions/department'
import { getDepartmentLoading, getDepartments } from '@admin/ducks/selectors/department'
import ListItem from '@admin/pages/departments/listItem'
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
    navigate(`/${AdminRoutes.root}/${AdminRoutes.department}`)
  }, [])

  const updateDepartment = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.department}/${id}`)
  }

  if (id_default === undefined || id_default === '0') {
    return (
      loading ?
        <>loading</> :
        <div className="container departments">
          <div className="departments__header">
            <h1>Кафедры</h1>
            <button onClick={createDepartment}>Новая</button>
          </div>
          {departments &&
           <List itemsRender={[
             <ListItem department={{ id: 'Id', name: 'Название', description: 'Описание' }} key="header" bold={true}/>,
             ...departments.map((d) => <ListItem department={d} key={d.id} onClick={() => updateDepartment(d.id)}/>)
           ]}/>
          }
        </div>
    )
  } else {
    return (
      loading ?
        <>loading</> :
        <div className="container departments">
          <div className="departments__header">
            <h1>Кафедры</h1>
            <button onClick={createDepartment}>Новая</button>
          </div>
          {departments &&
           <List itemsRender={[
             <ListItem department={{ id: 'Id', name: 'Название', description: 'Описание' }} key="header" bold={true}/>,
             ...departments.map((d) => <ListItem department={d} key={d.id} onClick={() => updateDepartment(d.id - 1)}/>)
           ]}/>
          }
        </div>
    )
  }
}

export default Departments
