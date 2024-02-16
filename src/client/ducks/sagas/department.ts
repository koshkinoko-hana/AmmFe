import {
  fetchDepartmentListAction, fetchDepartmentAction,
} from '@client/ducks/actions/department'
import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { Department } from '@client/ducks/types/department'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get } from '~/common/utils/fetch'

function* fetchDepartments() {
  
  yield errorWrapper(function* () {
    try {
      const res: Department[] = yield call(get, `${apiClient}/department`)
      yield put({ type: fetchDepartmentListAction.SUCCESS, payload: {departments: res} })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentListAction.FAILURE })
      throw e
    }
  })
}

function* fetchDepartment(action: PayloadAction<number>) {
  yield errorWrapper(function* () {
    try {
      const res: Department = yield call(get, `${apiClient}/department/${action.payload}`)
      yield put({ type: fetchDepartmentAction.SUCCESS, payload: res })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentAction.FAILURE })
      throw e
    }
  })
}

function* departmentWatcher() {
  yield all([
    takeLatest(fetchDepartmentListAction.TRIGGER, fetchDepartments),
    takeLatest(fetchDepartmentAction.TRIGGER, fetchDepartment)
  ])
}

export default departmentWatcher
