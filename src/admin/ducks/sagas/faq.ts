import { apiAdmin } from '~/common/consts/general'
import { errorWrapper } from './sagaWrapper'
import { get, post, putRequest } from '~/common/utils/fetch'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchCurrentQuestionAction, fetchFaqListAction, saveCurrentQuestionAction, updateCurrentQuestionAction } from '../actions/faq'
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

function* saveCurrentQuestion(action: PayloadAction<Faq>) {
  console.log('🚀 ~ file: faq.ts:44 ~ yielderrorWrapper ~ Question:', action.payload)
  yield errorWrapper(function* () {
    const res: Faq = yield call(post, `${apiAdmin}/faqs`, action.payload)
    console.log('🚀 ~ file: faq.ts:44 ~ yielderrorWrapper ~ Question:', res)
    yield put({ type: saveCurrentQuestionAction.SUCCESS, payload: res })
  })
}

function* updateCurrentQuestion(action: PayloadAction<Faq>) {
  console.log('🚀 ~ file: faq.ts:44 ~ saveCurrentQuestionAction ~ Question:', action.payload)
  yield errorWrapper(function* () {
    const res: Faq = yield call(putRequest, `${apiAdmin}/faqs/${action.payload.id}`,action.payload)
    console.log('🚀 ~ file: faq.ts:44 ~ saveCurrentQuestionAction ~ Question:', res)
    yield put({ type: updateCurrentQuestionAction.SUCCESS, payload: res })
  })
}

function* faqWatcher() {
  yield all([
    takeLatest(fetchFaqListAction.TRIGGER, fetchFaqs),
    takeLatest(fetchCurrentQuestionAction.TRIGGER, fetchCurrentQuestion),    
    takeLatest(saveCurrentQuestionAction.TRIGGER, saveCurrentQuestion),
    takeLatest(updateCurrentQuestionAction.TRIGGER, updateCurrentQuestion),
  ])
}
  
export default faqWatcher
  