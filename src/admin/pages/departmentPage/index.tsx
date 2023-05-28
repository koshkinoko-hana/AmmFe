import './department.scss'
import { getDepartmentLoading } from '@admin/ducks/selectors/department'
import { fetchEmployeeListAction } from '@admin/ducks/actions/employee'
import ListItem from '@admin/pages/employees/listItem'
import { openDialogueAction } from '@common/ducks/slice/dialogue'
import { DialogueOption } from '@common/ducks/types/dialogueOption'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployees } from '~/admin/ducks/selectors/employee'
import List from '~/common/components/list'
import { AdminRoutes } from '~/common/types/routes'

const AdminDepartmentPage: React.FC = () => {
  const { id: id_department }   = useParams()
  console.log('🚀 ~ file: index.tsx:56 ~ employees.map ~ id_department:', id_department)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const employees = useSelector(getEmployees)
  const loading = useSelector(getDepartmentLoading)

  useEffect(() => {
    dispatch(fetchEmployeeListAction())
  }, [])

  const createDepartment = useCallback(() => {
    dispatch(openDialogueAction(DialogueOption.ADMIN_DEPARTMENT))
  }, [])

  const updateEmployee = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.employees}/${id}`)
  } 

  return (
    loading ? (
      <>loading</>
    ) : (
      employees && (
        <div className="container employees">
          <div className="department__header">
            <h1>Кафедра</h1>
            <button onClick={createDepartment}>Редактировать</button>
          </div>
          <div className="department__header">
            <h1>Сотрудники</h1>
          </div>
          <List
            itemsRender={[
              <ListItem key="header" bold={true} />,

              employees.map((e) => {
                const positions = e.positions.map((item) => ({ id: item.id, name: item.name, value: item.id, label: item.name }))
                const departments = e.departments.map((item) => ({ id: item.id, name: item.name, value: item.id, label: item.name }))
                if (e.departments.some(department => department.id === Number(id_department))) 
                {
                  return (
                    <ListItem 
                      employee={{
                        id: e.id,
                        name: `${e.lastName} ${e.firstName} ${e.middleName}`,
                        positions,
                        departments,            
                      }} 
                      key={e.id} 
                      onClick={() => updateEmployee(e.id)}
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

export default AdminDepartmentPage
