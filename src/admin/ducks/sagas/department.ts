import {
  fetchDepartmentAction,
  fetchDepartmentListAction,
  fetchDepartmentOptionsAction,
  saveDepartmentAction,
  updateDepartmentAction,
  updateDepartmentEmployeesAction,
} from '@admin/ducks/actions/department'
import { errorWrapper, saveWrapper, updateWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { DepartmentDetailed, DepartmentRequest, DepartmentShort } from '@admin/ducks/types/department'
import { EmployeePositionShort } from '@admin/ducks/types/employee'
import { Option } from '@common/components/select/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'

function* fetchDepartments() {
  yield errorWrapper(function* () {
    try {
      const res: DepartmentShort[] = yield call(get, `${apiAdmin}/department`)
      yield put({ type: fetchDepartmentListAction.SUCCESS, payload: { departments: res } })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentListAction.FAILURE })
      throw e
    }
  })
}

function* fetchDepartment(action: PayloadAction<number>) {
  yield errorWrapper(function* () {
    try {
      const res: DepartmentDetailed[] = yield call(get, `${apiAdmin}/department/${action.payload}`)
      yield put({ type: fetchDepartmentAction.SUCCESS, payload: { department: res } })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentAction.FAILURE })
      throw e
    }
  })
}

function* saveDepartment(action: PayloadAction<DepartmentRequest>) {
  yield errorWrapper(function* () {
    yield saveWrapper(function* () {
      try {
        yield call(post, `${apiAdmin}/department`, action.payload)
        yield put({ type: fetchDepartmentAction.SUCCESS })
      } catch (e: unknown) {
        yield put({ type: fetchDepartmentAction.FAILURE })
        throw e
      }
    })
  })
}

function* updateDepartment(action: PayloadAction<DepartmentRequest>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      try {
        yield call(putRequest, `${apiAdmin}/department/${action.payload.id}`, action.payload)
        yield put({ type: updateDepartmentAction.SUCCESS })
      } catch (e: unknown) {
        yield put({ type: updateDepartmentAction.FAILURE })
        throw e
      }
    })
  })
}

function* updateDepartmentEmployees(action: PayloadAction<{ id: number, employees: EmployeePositionShort[] }>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      try {
        yield call(putRequest, `${apiAdmin}/department/${action.payload.id}/employees`, action.payload.employees)
        yield put({ type: updateDepartmentEmployeesAction.SUCCESS, payload: action.payload.employees })
      } catch (e: unknown) {
        yield put({ type: updateDepartmentEmployeesAction.FAILURE })
        throw e
      }
    })
  })
}

function* fetchDepartmentOptions() {
  yield errorWrapper(function* () {
    try {
      const res: Option[] = yield call(get, `${apiAdmin}/department/options`)
      yield put({ type: fetchDepartmentOptionsAction.SUCCESS, payload: { departments: res } })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentOptionsAction.FAILURE })
      throw e
    }
  })
}

function* departmentWatcher() {
  yield all([
    takeLatest(fetchDepartmentListAction.TRIGGER, fetchDepartments),
    takeLatest(fetchDepartmentAction.TRIGGER, fetchDepartment),
    takeLatest(saveDepartmentAction.TRIGGER, saveDepartment),
    takeLatest(updateDepartmentAction.TRIGGER, updateDepartment),
    takeLatest(updateDepartmentEmployeesAction.TRIGGER, updateDepartmentEmployees),
    takeLatest(fetchDepartmentOptionsAction.TRIGGER, fetchDepartmentOptions)
  ])
}

export default departmentWatcher
