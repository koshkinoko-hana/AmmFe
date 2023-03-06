import {
  fetchDepartmentListAction,
  saveDepartmentAction,
  updateDepartmentAction, updateDepartmentListAction
} from '@admin/ducks/actions/department'
import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { Department, DepartmentNew } from '@admin/ducks/types/department'
import { closeDialogueAction, setLoadingDialogueAction } from '@common/ducks/slice/dialogue'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'

function* fetchDepartments() {
  yield errorWrapper(function* () {
    try {
      const res: Department[] = yield call(get, `${apiAdmin}/department`)
      yield put({ type: fetchDepartmentListAction.SUCCESS, payload: {departments: res} })
    } catch (e: unknown) {
      yield put({ type: fetchDepartmentListAction.FAILURE })
      throw e
    }
  })
}

function* saveDepartment(action: PayloadAction<DepartmentNew>) {
  yield errorWrapper(function* () {
    try {
      const res: Department = yield call(post, `${apiAdmin}/department`, action.payload)
      yield put(updateDepartmentListAction(res))
      yield put(closeDialogueAction())
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
}

function* updateDepartment(action: PayloadAction<Department>) {
  yield errorWrapper(function* () {
    try {
      const res: Department = yield call(putRequest, `${apiAdmin}/department/${action.payload.id}`, action.payload)
      yield put(updateDepartmentListAction(res))
      yield put(closeDialogueAction())
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
}

function* departmentWatcher() {
  yield all([
    takeLatest(fetchDepartmentListAction.TRIGGER, fetchDepartments),
    takeLatest(saveDepartmentAction.type, saveDepartment),
    takeLatest(updateDepartmentAction.type, updateDepartment)
  ])
}

export default departmentWatcher
