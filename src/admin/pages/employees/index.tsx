import './employees.scss'
import { fetchEmployeeListAction } from '@admin/ducks/actions/employee'
import { getEmployeeLoading, getEmployees } from '@admin/ducks/selectors/employee'
import ListItem from '@admin/pages/employees/listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '~/common/components/list'

const Employees: React.FC = () => {

  const dispatch = useDispatch()
  const employees = useSelector(getEmployees)
  const loading = useSelector(getEmployeeLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchEmployeeListAction())
  }, [])

  const createEmployee = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.employees}/create`)
  }

  const updateEmployee = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.employees}/${id}`)
  }

  return (
    loading ?
      <>loading</> :
      employees &&
      <div className="container employees">
        <div className="employees__header">
          <h1>Сотрудники</h1>
          <button onClick={createEmployee}>Новая</button>
        </div>
        <List itemsRender={[
          <ListItem key="header" bold={true}/>,
          ...employees.map((e) => <ListItem employee={{
            ...e,
            name: `${e.lastName} ${e.firstName} ${e.middleName}`
          }} key={e.id} onClick={updateEmployee}/>)
        ]}/>
      </div>
  )
}

export default Employees
