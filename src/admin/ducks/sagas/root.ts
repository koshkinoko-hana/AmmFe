import departmentWatcher from '@admin/ducks/sagas/department'
import employeeWatcher from '@admin/ducks/sagas/employee'
import positionWatcher from '@admin/ducks/sagas/position'
import { all } from 'redux-saga/effects'
import userWatcher from './user'
import newsWatcher from '~/client/ducks/sagas/news'
import faqWatcher from '@admin/ducks/sagas/faq'
import directionWatcher from './direction'
import galleryWatcher from './gallery'

export default function* adminSaga() {
  yield all([
    departmentWatcher(),
    employeeWatcher(),
    newsWatcher(),
    positionWatcher(),
    userWatcher(),
    faqWatcher(),
    directionWatcher(),
    galleryWatcher()
  ])
}
