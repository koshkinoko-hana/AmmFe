import {
  fetchDirectionListAction,
} from '@client/ducks/actions/direction'
import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { Direction } from '~/common/types/direction'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get } from '~/common/utils/fetch'
  
  
  
function* fetchDirections() {
  yield errorWrapper(function* () {
    try {
      const res: Direction[] = yield call(get, `${apiClient}/direction`)
      yield put({ type: fetchDirectionListAction.SUCCESS, payload: { directions: res } })
    } catch (e: unknown) {
      yield put({ type: fetchDirectionListAction.FAILURE })
      throw e
    }
  })
}
  
function* directionWatcher() {
  yield all([
    takeLatest(fetchDirectionListAction.TRIGGER, fetchDirections),
  ])
}
  
export default directionWatcher
  