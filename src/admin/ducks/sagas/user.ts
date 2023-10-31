import { fetchUserAction, fetchUserListAction, saveUserAction, updateUserAction } from '@admin/ducks/actions/user'
import { errorWrapper, saveWrapper, updateWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { User, UserLight } from '@admin/ducks/types/user'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'

function* fetchUserList() {
  yield errorWrapper(function* () {
    try {
      const res: UserLight[] = yield call(get, `${apiAdmin}/users`)
      yield put({ type: fetchUserListAction.SUCCESS, payload: { news: res } })
    } catch (e: unknown) {
      yield put({ type: fetchUserListAction.FAILURE })
      throw e
    }
  })
}

function* fetchUser(action: PayloadAction<{ slug: string }>) {
  yield errorWrapper(function* () {
    try {
      const res: User = yield call(get, `${apiAdmin}/users/${action.payload.slug}`)
      yield put({ type: fetchUserAction.SUCCESS, payload: { employee: res } })
    } catch (e: unknown) {
      yield put({ type: fetchUserAction.FAILURE })
      throw e
    }
  })
}

function* saveUser(action: PayloadAction<User>) {
  yield errorWrapper(function* () {
    yield saveWrapper(function* () {

      try {
        yield call(post, `${apiAdmin}/users`, action.payload)
        yield put({ type: saveUserAction.SUCCESS, payload: action.payload })
      } catch (e: unknown) {
        yield put({ type: saveUserAction.FAILURE })
        throw e
      }
    })
  })
}

function* updateUser(action: PayloadAction<User>) {
  yield errorWrapper(function* () {
    yield updateWrapper(function* () {
      try {
        yield call(putRequest, `${apiAdmin}/users/${action.payload.id}`, action.payload)
        yield put({ type: updateUserAction.SUCCESS, payload: action.payload})
      } catch (e: unknown) {
        yield put({ type: updateUserAction.FAILURE })
        throw e
      }
    })
  })
}

function* userWatcher() {
  yield all([
    takeLatest(fetchUserListAction.TRIGGER, fetchUserList),
    takeLatest(fetchUserAction.TRIGGER, fetchUser),
    takeLatest(saveUserAction.TRIGGER, saveUser),
    takeLatest(updateUserAction.TRIGGER, updateUser),
  ])
}

export default userWatcher
