import { fetchNewsAction, fetchNewsListAction, saveNewsAction, updateNewsAction } from '@admin/ducks/actions/news'
import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { News, NewsLight } from '@admin/ducks/types/news'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { get, post, putRequest } from '~/common/utils/fetch'

function* fetchNewsList() {
  yield errorWrapper(function* () {
    try {
      const res: NewsLight[] = yield call(get, `${apiAdmin}/news`)
      yield put({ type: fetchNewsListAction.SUCCESS, payload: { employees: res } })
    } catch (e: unknown) {
      yield put({ type: fetchNewsListAction.FAILURE })
      throw e
    }
  })
}

function* fetchNews(action: PayloadAction<{ slug: string }>) {
  yield errorWrapper(function* () {
    try {
      const res: News = yield call(get, `${apiAdmin}/news/${action.payload.slug}`)
      yield put({ type: fetchNewsAction.SUCCESS, payload: { employee: res } })
    } catch (e: unknown) {
      yield put({ type: fetchNewsAction.FAILURE })
      throw e
    }
  })
}

function* saveNews(action: PayloadAction<News>) {
  yield errorWrapper(function* () {
    const res: News = yield call(post, `${apiAdmin}/news`, action.payload)
    yield put({ type: saveNewsAction.SUCCESS, payload: res })
  })
}

function* updateNews(action: PayloadAction<News>) {
  yield errorWrapper(function* () {
    const res: News = yield call(putRequest, `${apiAdmin}/news/${action.payload.slug}`, action.payload)
    yield put(updateNewsAction(res))
  })
}

function* newsWatcher() {
  yield all([
    takeLatest(fetchNewsListAction.TRIGGER, fetchNewsList),
    takeLatest(fetchNewsAction.TRIGGER, fetchNews),
    takeLatest(saveNewsAction.TRIGGER, saveNews),
    takeLatest(updateNewsAction.TRIGGER, updateNews),
  ])
}

export default newsWatcher
