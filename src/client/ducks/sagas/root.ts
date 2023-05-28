import { all } from 'redux-saga/effects'
import newsWatcher from '~/client/ducks/sagas/news'

export default function* clientSaga() {
  yield all([
    newsWatcher()
  ])
}
