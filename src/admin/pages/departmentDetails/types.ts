import { EmployeePositionShort } from '@admin/ducks/types/employee'
import { Option } from '@common/components/select/types'

export type FormData = {
  name: string;
  description?: string
  email: string
  address: string
  phones: string[]
}

export interface EmployeeProps {
  employees: EmployeePositionShort[]
  employeeOptions: Option[]
  positionOptions: Option[]
  onEmployeesChange: (employees: EmployeePositionShort[]) => void
}


export interface EmployeeItemProps {
  employee?: EmployeePositionShort
  employeeOptions: Option[]
  positionOptions: Option[]
  onSave: (employee: EmployeePositionShort) => void
  onDelete: () => void
  duplicated?: boolean
}
