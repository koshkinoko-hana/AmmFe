import './employees.scss'
import { deleteEmployeeAction, fetchEmployeeListAction } from '@admin/ducks/actions/employee'
import { getEmployeeLoading, getEmployees } from '@admin/ducks/selectors/employee'
import ListItem from '@admin/pages/employees/listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchEmployeeAction } from '~/client/ducks/actions/employee'
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

  const deleteEmployee = (id: number) => {
    dispatch(deleteEmployeeAction({id}))
    employees.filter(employee => employee.id !== id)
  } 

  return (
    loading ? ( <>Загрузка...</> ) : ( employees && 
      (
        <div className="container employees">
          <div className="employees__header">
            <h1>Сотрудники</h1>
            <div className='employees__header__btn'>
              <button 
                onClick={createEmployee}
              >Новый</button>
            </div>
          </div>
          <List
            itemsRender={[
              <ListItem key="header" bold={true} />,

              employees.map((e) => {
                const positions = e.positions
                const departments = e.departments
                {
                  return (
                    <ListItem 
                      employee={{
                        id: e.id,
                        name: `${e.lastName} ${e.firstName} ${e.middleName}`,
                      }} 
                      key={e.id} 
                      onClick={() => updateEmployee(e.id)}
                      onDelete={() => deleteEmployee(e.id)}
                    />
                  )
                }
              }),
            ]}
          />
        </div>
      )
    )
  )
}
export default Employees

