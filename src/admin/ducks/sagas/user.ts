import { errorAction } from '@admin/ducks/actions/apiError'
import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, postUnauth } from '~/common/utils/fetch'
import { RequestError } from '~/common/utils/request-error'
import { setToken } from '~/common/utils/token'
import { fetchMeAction, loginAction } from '../actions/user'
import { LoginRequestPayload, LoginResponse } from '../types/user'

function* auth(action: PayloadAction<LoginRequestPayload>) {
  yield errorWrapper(function* () {
    try {
      const res: LoginResponse = yield call(postUnauth, `${apiAdmin}/auth`, action.payload, [ 404 ])
      setToken(res.authToken)
      yield put({ type: loginAction.SUCCESS, payload: res })
    } catch (e: unknown) {
      yield put({ type: loginAction.FAILURE })
      if ((e as RequestError).code === 404) {
        yield put({ type: loginAction.FAILURE })
      } else {
        throw e
      }
    }
  })
}

function* fetchMe() {
  yield errorWrapper(function* () {
    try {
      const res: LoginResponse = yield call(get, `${apiAdmin}/user/me`)
      yield put({ type: loginAction.SUCCESS, payload: res })
    } catch (e: unknown) {
      if ((e as RequestError).code === 404) {
        yield put(errorAction(401))
      }
      else throw e
    }
  })
}

function* userWatcher() {
  yield all([
    takeLatest(loginAction.TRIGGER, auth),
    takeLatest(fetchMeAction.TRIGGER, fetchMe)
  ])
}

export default userWatcher
