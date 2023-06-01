import departmentWatcher from '@admin/ducks/sagas/department'
import employeeWatcher from '@admin/ducks/sagas/employee'
import positionWatcher from '@admin/ducks/sagas/position'
import { all } from 'redux-saga/effects'
import userWatcher from './user'
import newsWatcher from '~/admin/ducks/sagas/news'
import directionWatcher from './direction'
import galleryWatcher from './gallery'

export default function* adminSaga() {
  yield all([
    departmentWatcher(),
    employeeWatcher(),
    newsWatcher(),
    positionWatcher(),
    userWatcher(),
    newsWatcher(),
    directionWatcher(),
    galleryWatcher()
  ])
}
