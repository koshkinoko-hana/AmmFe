import { all } from 'redux-saga/effects'
import newsWatcher from '~/client/ducks/sagas/news'
import directionWatcher from './direction'
import galleryWatcher from './gallery'

export default function* clientSaga() {
  yield all([
    newsWatcher(),
    directionWatcher(),
    galleryWatcher()
  ])
}
