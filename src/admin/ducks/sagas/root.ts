import albumWatcher from '@admin/ducks/sagas/album'
import departmentWatcher from '@admin/ducks/sagas/department'
import employeeWatcher from '@admin/ducks/sagas/employee'
import positionWatcher from '@admin/ducks/sagas/position'
import userWatcher from '@admin/ducks/sagas/user'
import { all } from 'redux-saga/effects'
import meWatcher from './me'
import newsWatcher from '@admin/ducks/sagas/news'
import faqWatcher from '@admin/ducks/sagas/faq'
import directionWatcher from './direction'
import galleryWatcher from './gallery'

export default function* adminSaga() {
  yield all([
    departmentWatcher(),
    employeeWatcher(),
    newsWatcher(),
    positionWatcher(),
    meWatcher(),
    userWatcher(),
    faqWatcher(),
    directionWatcher(),
    galleryWatcher(),
    albumWatcher()
  ])
}
