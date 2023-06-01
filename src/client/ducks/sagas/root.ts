import { all } from 'redux-saga/effects'
import newsWatcher from '~/client/ducks/sagas/news'
import galleryWatcher from './gallery'

export default function* clientSaga() {
  yield all([
    newsWatcher(),
    galleryWatcher()
  ])
}
