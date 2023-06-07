import {
  fetchEmployeeAction,
  fetchEmployeeListAction,
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
  console.log('~~~~@@@ id: ', action.payload.id)
  yield errorWrapper(function* () {
    try {
      console.log(`${apiClient}/employee/${action.payload.id}`)
      const res: Employee = yield call(get, `${apiClient}/employee/${action.payload.id}`)
      yield put({ type: fetchEmployeeAction.SUCCESS, payload: { employee: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeeAction.FAILURE })
      throw e
    }
  })
}

function* employeeWatcher() {
  yield all([
    takeLatest(fetchEmployeeListAction.TRIGGER, fetchEmployees),
    takeLatest(fetchEmployeeAction.TRIGGER, fetchEmployee),
  ])
}

export default employeeWatcher
