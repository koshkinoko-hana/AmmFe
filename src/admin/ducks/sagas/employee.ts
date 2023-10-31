import {
  fetchDepartmentAction,
  uploadPhoto
} from '@admin/ducks/actions/department'
import {
  deleteEmployeeAction,
  fetchEmployeeAction,
  fetchEmployeeListAction, fetchEmployeeOptionsAction,
  saveEmployeeAction,
  updateEmployeeAction
} from '@admin/ducks/actions/employee'
import { errorWrapper, saveWrapper, updateWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { Employee, EmployeeLight, EmployeeNew, UploadedFileResponse } from '@admin/ducks/types/employee'
import { closeDialogueAction, setLoadingDialogueAction } from '@common/ducks/slice/dialogue'
import { PayloadAction } from '@reduxjs/toolkit'
import { ImageType } from 'react-images-uploading/dist/typings'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest, del } from '~/common/utils/fetch'


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

function* fetchEmployeeOptions() {
  yield errorWrapper(function* () {
    try {
      const res: EmployeeLight[] = yield call(get, `${apiAdmin}/employee/options`)
      yield put({ type: fetchEmployeeOptionsAction.SUCCESS, payload: { options: res } })
    } catch (e: unknown) {
      yield put({ type: fetchEmployeeOptionsAction.FAILURE })
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
    yield saveWrapper(function* () {
      try {
        const res: Employee = yield call(post, `${apiAdmin}/employee`, action.payload)
        yield put({ type: saveEmployeeAction.SUCCESS, payload: res })
      } catch (e: unknown) {
        yield put({ type: saveEmployeeAction.FAILURE })
        throw e
      }
    })
  })
}

function* deleteEmployee(action: PayloadAction<{ id: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: Employee = yield call(del, `${apiAdmin}/employee/${action.payload.id}`)
      yield put({ type: deleteEmployeeAction.SUCCESS, payload: res })
    } catch (e: unknown) {
      yield put({ type: deleteEmployeeAction.FAILURE })
      throw e
    }
  })
}

function* updateEmployee(action: PayloadAction<Employee>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      try {
        const res: Employee = yield call(putRequest, `${apiAdmin}/employee/${action.payload.id}`, action.payload)
        yield put({ type: updateEmployeeAction.SUCCESS, payload: res })
      } catch (e: unknown) {
        yield put({ type: updateEmployeeAction.FAILURE })
        throw e
      }
    })
  })
}


function* saveImage(action: PayloadAction<ImageType>) {
  yield errorWrapper(function* () {
    try {
      const res: UploadedFileResponse = yield call(post, `${apiAdmin}/employee/photo`, { file: action.payload.file })
      yield put({ type: uploadPhoto.SUCCESS, payload: res })
    } catch (e: unknown) {
      yield put({ type: uploadPhoto.FAILURE })
      throw e
    }
  })
}

function* employeeWatcher() {
  yield all([
    takeLatest(fetchEmployeeListAction.TRIGGER, fetchEmployees),
    takeLatest(fetchEmployeeOptionsAction.TRIGGER, fetchEmployeeOptions),
    takeLatest(fetchEmployeeAction.TRIGGER, fetchEmployee),
    takeLatest(saveEmployeeAction.TRIGGER, saveEmployee),
    takeLatest(updateEmployeeAction.TRIGGER, updateEmployee),
    takeLatest(uploadPhoto.TRIGGER, saveImage),
    takeLatest(deleteEmployeeAction.TRIGGER, deleteEmployee),
  ])
}

export default employeeWatcher
