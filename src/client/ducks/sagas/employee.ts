import {
  fetchEmployeeAction,
  fetchEmployeeListAction,
  fetchEmployeesByDepartmentAction,
} from '@client/ducks/actions/employee'
import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { Employee, EmployeeLight } from '@client/ducks/types/employee'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get } from '~/common/utils/fetch'



function* fetchEmployees() {
  yield errorWrapper(function* () {
    try {
      const res: EmployeeLight[] = yield call(get, `${apiClient}/employee`)
      yield put({ type: fetchEmployeeListAction.SUCCESS, payload: { employees: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeeListAction.FAILURE })
      throw e
    }
  })
}

function* fetchEmployee(action: PayloadAction<{ id: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: Employee = yield call(get, `${apiClient}/employee/${action.payload.id}`)
      yield put({ type: fetchEmployeeAction.SUCCESS, payload: { employee: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeeAction.FAILURE })
      throw e
    }
  })
}

function* fetchEmployeesByDepartment(action: PayloadAction<{ id_department: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: Employee[] = yield call(get, `${apiClient}/employee/by-department/${action.payload.id_department}`)
      yield put({ type: fetchEmployeesByDepartmentAction.SUCCESS, payload: { employees: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeesByDepartmentAction.FAILURE })
      throw e
    }
  })
}

function* employeeWatcher() {
  yield all([
    takeLatest(fetchEmployeeListAction.TRIGGER, fetchEmployees),
    takeLatest(fetchEmployeeAction.TRIGGER, fetchEmployee),
    takeLatest(fetchEmployeesByDepartmentAction.TRIGGER, fetchEmployeesByDepartment),
  ])
}

export default employeeWatcher
