import { apiAdmin } from '~/common/consts/general'
import { errorWrapper } from './sagaWrapper'
import { get } from '~/common/utils/fetch'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchCurrentQuestionAction, fetchFaqListAction } from '../actions/faq'
import { Faq } from '../types/faq'
import { PayloadAction } from '@reduxjs/toolkit'

function* fetchFaqs() {
  yield errorWrapper(function* () {
    try {
      const res: Faq[] = yield call(get, `${apiAdmin}/faqs`)
      yield put({ type: fetchFaqListAction.SUCCESS, payload: {faqs: res} })
    } catch (e: unknown) {
      yield put({ type: fetchFaqListAction.FAILURE })
      throw e
    }
  })
}

function* fetchCurrentQuestion(action: PayloadAction<{ id: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: Faq = yield call(get, `${apiAdmin}/faqs/${action.payload.id}`)
      yield put({ type: fetchCurrentQuestionAction.SUCCESS, payload: { faq: res } })
    } catch (e: unknown) {
      yield put({ type: fetchCurrentQuestionAction.FAILURE })
      throw e
    }
  })
}

function* faqWatcher() {
  yield all([
    takeLatest(fetchFaqListAction.TRIGGER, fetchFaqs),
    takeLatest(fetchCurrentQuestionAction.TRIGGER, fetchCurrentQuestion),    
  ])
}
  
export default faqWatcher
  