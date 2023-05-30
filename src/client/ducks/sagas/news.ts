import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { newsCard, newsDetails } from '../types/news'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { get } from '~/common/utils/fetch'
import { apiClient } from '~/common/consts/general'
import { fetchNewsDetailsAction, fetchNewsListAction, fetchNewsPreviewAction } from '../actions/news'
import { PayloadAction } from '@reduxjs/toolkit'
//import placeholderSvg from '@assets/placeholder_news.svg'

function* fetchNews(action: PayloadAction<number>) {
  yield errorWrapper(function* () {
    try {
      const res: {data: newsCard[]} = yield call(get, `${apiClient}/news?offset=${action.payload}&limit=9`)
      res.data = res.data.map(item => ({...item, createdAt: item.createdAt.slice(0, 10).split('-').reverse().join('.'), photoPath: item.photoPath}))// || placeholderSvg}))
      yield put({ type: fetchNewsListAction.SUCCESS, payload: { news: res.data } })
    } catch (e: unknown) {
      yield put({ type: fetchNewsListAction.FAILURE })
      throw e
    }
  })
}

function* fetchNewsDetails(action: PayloadAction<number>) {
  yield errorWrapper(function* () {
    try {
      const res: newsDetails = yield call(get, `${apiClient}/news/${action.payload}`)
      res.createdAt = res.createdAt.slice(0, 10).split('-').reverse().join('.')
      yield put({ type: fetchNewsDetailsAction.SUCCESS, payload: { details: res } })
    } catch (e: unknown) {
      yield put({ type: fetchNewsDetailsAction.FAILURE })
      throw e
    }
  })
}

function* fetchNewsPreview() {
  yield errorWrapper(function* () {
    try {
      const res: {data: newsCard[]} = yield call(get, `${apiClient}/news?offset=0&limit=2`)
      res.data = res.data.map(item => ({...item, createdAt: item.createdAt.slice(0, 10).split('-').reverse().join('.')}))
      yield put({ type: fetchNewsPreviewAction.SUCCESS, payload: { newsPreview: res.data } })
    } catch (e: unknown) {
      yield put({ type: fetchNewsPreviewAction.FAILURE })
      throw e
    }
  })
}




function* newsWatcher() {
  yield all([
    takeLatest(fetchNewsListAction.TRIGGER, fetchNews),
    takeLatest(fetchNewsDetailsAction.TRIGGER, fetchNewsDetails),
    takeLatest(fetchNewsPreviewAction.TRIGGER, fetchNewsPreview),
  ])
}

export default newsWatcher