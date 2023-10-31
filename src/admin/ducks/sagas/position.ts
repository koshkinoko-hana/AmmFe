import {
  fetchPositionListAction,
  fetchPositionOptionsAction,
  savePositionAction,
  setLoadingPositionAction,
  updatePositionAction,
  updatePositionListAction
} from '@admin/ducks/actions/position'
import { errorWrapper, saveWrapper, updateWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { PaginatedResponseWrapper } from '@admin/ducks/types/paginatedResponseWrapper'
import { Position, PositionNew } from '@admin/ducks/types/position'
import { Option } from '@common/components/select/types'
import { closeDialogueAction } from '@common/ducks/slice/dialogue'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'

function* fetchPositions() {
  yield errorWrapper(function* () {
    try {
      const res: PaginatedResponseWrapper<Position> = yield call(get, `${apiAdmin}/position`)
      yield put({ type: fetchPositionListAction.SUCCESS, payload: {res} })
    } catch (e: unknown) {
      yield put({ type: fetchPositionListAction.FAILURE })
      throw e
    }
  })
}

function* savePosition(action: PayloadAction<PositionNew>) {
  yield errorWrapper(function* () {
    yield saveWrapper(function* () {
      try {
        const res: Position = yield call(post, `${apiAdmin}/position`, action.payload)
        yield put(updatePositionListAction(res))
        yield put(closeDialogueAction())
      } catch (e: unknown) {
        yield put(setLoadingPositionAction(false))
        throw e
      }
    })
  })
}

function* updatePosition(action: PayloadAction<Position>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      try {
        const res: Position = yield call(putRequest, `${apiAdmin}/position/${action.payload.id}`, action.payload)
        yield put(updatePositionListAction(res))
        yield put(closeDialogueAction())
      } catch (e: unknown) {
        yield put(setLoadingPositionAction(false))
        throw e
      }
    })
  })
}

function* fetchPositionOptions() {
  yield errorWrapper(function* () {
    try {
      const res: Option[] = yield call(get, `${apiAdmin}/position/options`)
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
    takeLatest(savePositionAction.type, savePosition),
    takeLatest(updatePositionAction.type, updatePosition),
  ])
}

export default positionWatcher
