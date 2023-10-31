import { errorAction } from '@admin/ducks/actions/apiError'
import { showDeleteToastAction, showSaveToastAction, showUpdateToastAction } from '@admin/ducks/actions/app'
import { put } from 'redux-saga/effects'
import { RequestError } from '~/common/utils/request-error'
import { setToken } from '~/common/utils/token'

export function* errorWrapper(saga: () => any) {
  try {
    yield saga()
  } catch (e: unknown) {
    debugger
    const requestError = e as RequestError
    if (requestError.code) {
      if (requestError.code === 401) {
        setToken('')
      }
      yield put(errorAction({code: requestError.code, message: requestError.message}))
    }
  }
}

export function* saveWrapper(saga: () => any) {
  yield saga()
  yield put(showSaveToastAction)
}

export function* updateWrapper(saga: () => any) {
  yield saga()
  yield put(showUpdateToastAction)
}

export function* deleteWrapper(saga: () => any) {
  yield saga()
  yield put(showDeleteToastAction)
}
