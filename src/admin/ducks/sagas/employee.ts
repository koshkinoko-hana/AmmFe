import {
  uploadPhoto
} from '@admin/ducks/actions/department'
import {
  fetchEmployeeAction,
  fetchEmployeeListAction,
  saveEmployeeAction,
  updateEmployeeAction
} from '@admin/ducks/actions/employee'
import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { Employee, EmployeeLight, EmployeeNew, UploadedFileResponse } from '@admin/ducks/types/employee'
import { closeDialogueAction, setLoadingDialogueAction } from '@common/ducks/slice/dialogue'
import { PayloadAction } from '@reduxjs/toolkit'
import { ImageType } from 'react-images-uploading/dist/typings'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'



function* fetchEmployees() {
  yield errorWrapper(function* () {
    try {
      const res: EmployeeLight[] = yield call(get, `${apiAdmin}/employee`)
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
      const res: Employee = yield call(get, `${apiAdmin}/employee/${action.payload.id}`)
      yield put({ type: fetchEmployeeAction.SUCCESS, payload: { employee: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeeAction.FAILURE })
      throw e
    }
  })
}

function* saveEmployee(action: PayloadAction<EmployeeNew>) {
  yield errorWrapper(function* () {
    const res: Employee = yield call(post, `${apiAdmin}/employee`, action.payload)
    yield put({ type: saveEmployeeAction.SUCCESS, payload: res })
  })
}

function* updateEmployee(action: PayloadAction<Employee>) {
  yield errorWrapper(function* () {
    try {
      const res: Employee = yield call(putRequest, `${apiAdmin}/employee/${action.payload.id}`, action.payload)
      yield put({type: updateEmployeeAction.SUCCESS, payload: res})
      yield put(closeDialogueAction())
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
}


function* saveImage(action: PayloadAction<ImageType>) {
  yield errorWrapper(function* () {
    try {
      const res: UploadedFileResponse = yield call(post, `${apiAdmin}/employee/photo`, { file: action.payload.file })
      console.log(res)
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
}

function* employeeWatcher() {
  yield all([
    takeLatest(fetchEmployeeListAction.TRIGGER, fetchEmployees),
    takeLatest(fetchEmployeeAction.TRIGGER, fetchEmployee),
    takeLatest(saveEmployeeAction.TRIGGER, saveEmployee),
    takeLatest(updateEmployeeAction.TRIGGER, updateEmployee),
    takeLatest(uploadPhoto.TRIGGER, saveImage),
  ])
}

export default employeeWatcher
