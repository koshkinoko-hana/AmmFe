import {
  fetchPositionListAction,
  fetchPositionOptionsAction,
} from '@client/ducks/actions/position'
import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { PaginatedResponseWrapper } from '@client/ducks/types/paginatedResponseWrapper'
import { Position } from '@client/ducks/types/position'
import { Option } from '@common/components/select/types'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get } from '~/common/utils/fetch'

function* fetchPositions() {
  yield errorWrapper(function* () {
    try {
      const res: PaginatedResponseWrapper<Position> = yield call(get, `${apiClient}/position`)
      yield put({ type: fetchPositionListAction.SUCCESS, payload: {res} })
    } catch (e: unknown) {
      yield put({ type: fetchPositionListAction.FAILURE })
      throw e
    }
  })
}


function* fetchPositionOptions() {
  yield errorWrapper(function* () {
    try {
      const res: Option[] = yield call(get, `${apiClient}/position/options`)
      yield put({ type: fetchPositionOptionsAction.SUCCESS, payload: {positions: res} })
    } catch (e: unknown) {
      yield put({ type: fetchPositionOptionsAction.FAILURE })
      throw e
    }
  })
}

function* positionWatcher() {
  yield all([
    takeLatest(fetchPositionListAction.TRIGGER, fetchPositions),
    takeLatest(fetchPositionOptionsAction.TRIGGER, fetchPositionOptions),
  ])
}

export default positionWatcher
