import {
  fetchDepartmentListAction, fetchDepartmentOptionsAction,
} from '@client/ducks/actions/department'
import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { Department } from '@client/ducks/types/department'
import { Option } from '@common/components/select/types'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get } from '~/common/utils/fetch'

function* fetchDepartments() {
  
  yield errorWrapper(function* () {
    try {
      const res: Department[] = yield call(get, `${apiClient}/department`)
      yield put({ type: fetchDepartmentListAction.SUCCESS, payload: {departments: res} })
      console.log('🚀 ~ file: department.ts:17 ~ yielderrorWrapper ~ res:', res)
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentListAction.FAILURE })
      throw e
    }
  })
}

function* fetchDepartmentOptions() {
  yield errorWrapper(function* () {
    try {
      const res: Option[] = yield call(get, `${apiClient}/department/options`)
      yield put({ type: fetchDepartmentOptionsAction.SUCCESS, payload: {departments: res} })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentOptionsAction.FAILURE })
      throw e
    }
  })
}

function* departmentWatcher() {
  yield all([
    takeLatest(fetchDepartmentListAction.TRIGGER, fetchDepartments),
    takeLatest(fetchDepartmentOptionsAction.TRIGGER, fetchDepartmentOptions)
  ])
}

export default departmentWatcher
