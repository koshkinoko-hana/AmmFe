import departmentWatcher from '@admin/ducks/sagas/department'
import employeeWatcher from '@admin/ducks/sagas/employee'
import positionWatcher from '@admin/ducks/sagas/position'
import { all } from 'redux-saga/effects'
import userWatcher from './user'

export default function* rootSaga() {
  yield all([
    departmentWatcher(),
    employeeWatcher(),
    positionWatcher(),
    userWatcher(),
  ])
}
