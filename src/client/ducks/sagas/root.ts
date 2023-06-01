import { all } from 'redux-saga/effects'
import employeeWatcher from '~/client/ducks/sagas/employee'
import newsWatcher from '~/client/ducks/sagas/news'
import departmentWatcher from '~/client/ducks/sagas/department'
import positionWatcher from '~/client/ducks/sagas/position'
import galleryWatcher from './gallery'
import QuestionWatcher from './faq'

export default function* clientSaga() {
  yield all([
    departmentWatcher(),
    employeeWatcher(),
    positionWatcher(),
    QuestionWatcher(),
    newsWatcher(),
    galleryWatcher()
  ])
}
