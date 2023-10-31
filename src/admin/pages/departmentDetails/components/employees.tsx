import { EmployeePositionShort } from '@admin/ducks/types/employee'
import { findDuplicates } from '@admin/helpers/checkDuplicates'
import EmployeeItem from '@admin/pages/departmentDetails/components/employeeItem'
import { EmployeeProps } from '@admin/pages/departmentDetails/types'
import React, { useState } from 'react'
import '../department.scss'
import { FaPlus, FaSave } from 'react-icons/fa'

export const Employees: React.FC<EmployeeProps> = ({
  employees,
  employeeOptions,
  positionOptions,
  onEmployeesChange
}) => {

  const [ isNewEmployee, setIsNewEmployee ] = useState(false)
  const [employeesDraft, setEmployeesDraft] = useState(employees)
  const [employeesChanged, setEmployeesChanged] = useState(false)
  const [duplicates, setDuplicates] = useState<number[]>([])


  const onItemChanged = (order: number, item: EmployeePositionShort) => {
    const duplicate = findDuplicates(employees, item)
    if (duplicate !==undefined) {
      setDuplicates([order, duplicate])
    }
    setEmployeesDraft([ ...employeesDraft.slice(0, order), item, ...employeesDraft.slice(order + 1) ])
    setEmployeesChanged(true)
  }

  const onItemDeleted = (order?: number) => {
    if(!order) {
      setIsNewEmployee(false)
      return
    }
    setEmployeesDraft([ ...employeesDraft.slice(0, order), ...employeesDraft.slice(order + 1) ])
    setEmployeesChanged(true)
  }

  const onItemAdded = (item: EmployeePositionShort) => {

    const duplicate = findDuplicates(employees, item)
    if (duplicate !==undefined) {
      setDuplicates([employeesDraft.length, duplicate])
    }
    setEmployeesDraft([...employeesDraft, item])
    setEmployeesChanged(true)
    setIsNewEmployee(false)
  }

  const saveEmployees = () => {
    setEmployeesChanged(false)
    onEmployeesChange(employeesDraft)
  }

  return (
    <div className="department__admin__employees">
      <h2>Сотрудники кафедры</h2>
      {
        employeesDraft.map((e, index) => (
          <EmployeeItem
            key={`employee-position-${index}`}
            employee={e}
            employeeOptions={employeeOptions}
            positionOptions={positionOptions}
            onSave={(em) => onItemChanged(index, em)}
            onDelete={() => onItemDeleted(index)}
            duplicated={duplicates.findIndex(i => i===index)!==-1}
          />
        ))
      }
      {
        isNewEmployee &&
        <EmployeeItem employeeOptions={employeeOptions} positionOptions={positionOptions}
          onSave={onItemAdded}
          onDelete={() => setIsNewEmployee(false)} />
      }
      <button
        className="button-svg"
        onClick={() => setIsNewEmployee(true)}><FaPlus className="svg-base-size"/></button>
      {
        employeesChanged &&
        <button
          className={`button-svg save-list ${!!duplicates.length && 'disabled'}`}
          onClick={saveEmployees}
          disabled={!!duplicates.length}
        >
          <FaSave className="svg-base-size"/>
        </button>
      }
    </div>
  )
}
