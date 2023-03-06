import { errorAction } from '@admin/ducks/actions/apiError'
import { put } from 'redux-saga/effects'
import { RequestError } from '~/common/utils/request-error'
import { setToken } from '~/common/utils/token'

export function* errorWrapper(saga: () => any) {
  try {
    yield saga()
  } catch (e: unknown) {
    const requestError = e as RequestError
    if (requestError.code) {
      if (requestError.code === 401) {
        setToken('')
      }
      yield put(errorAction(requestError.code))
    }
  }
}
