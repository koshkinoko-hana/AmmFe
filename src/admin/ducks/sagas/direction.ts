import {
  fetchDirectionListAction,
  createDirectionAction,
  updateDirectionAction
} from '@admin/ducks/actions/direction'
import { errorWrapper, saveWrapper, updateWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { Direction, DirectionNew } from '@admin/ducks/types/direction'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'


function* fetchDirections() {
  yield errorWrapper(function* () {
    try {
      const res: Direction[] = yield call(get, `${apiAdmin}/direction`)
      yield put({ type: fetchDirectionListAction.SUCCESS, payload: { directions: res } })
    } catch (e: unknown) {
      yield put({ type: fetchDirectionListAction.FAILURE })
      throw e
    }
  })
}

function* createDirection(action: PayloadAction<DirectionNew>) {
  yield errorWrapper(function* () {

    yield saveWrapper(function* () {
      const res: Direction = yield call(post, `${apiAdmin}/direction`, action.payload)
      yield put({ type: createDirectionAction.SUCCESS, payload: res })
    })
  })
}

function* updateDirection(action: PayloadAction<{ id: number, direction: Direction }>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      const res: Direction = yield call(putRequest, `${apiAdmin}/direction/${action.payload.id}`, action.payload.direction)
      yield put({ type: updateDirectionAction.SUCCESS, payload: res })
    })
  })
}

function* directionWatcher() {
  yield all([
    takeLatest(fetchDirectionListAction.TRIGGER, fetchDirections),
    takeLatest(createDirectionAction.TRIGGER, createDirection),
    takeLatest(updateDirectionAction.TRIGGER, updateDirection),
  ])
}

export default directionWatcher
