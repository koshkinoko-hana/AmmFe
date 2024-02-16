import { EmployeePositionShort } from '@admin/ducks/types/employee'

export const findDuplicates = (eps: EmployeePositionShort[], e: EmployeePositionShort) => {
  for (let i = 0; i < eps.length; i++) {
    if (eps[i].id === e.id && eps[i].positionId === e.positionId) {
      return i
    }
  }
  return
}
