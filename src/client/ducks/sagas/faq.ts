import {
  fetchQuestionAction,
  fetchQuestionListAction,
  saveQuestionAction,
} from '@client/ducks/actions/faq'
import { errorWrapper } from '@client/ducks/sagas/sagaWrapper'
import { QuestionStr } from '@client/ducks/types/faq'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiClient } from '~/common/consts/general'
import { get, post } from '~/common/utils/fetch'
  
  
  
function* fetchQuestions() {
  yield errorWrapper(function* () {
    try {
      const res: QuestionStr[] = yield call(get, `${apiClient}/faqs`)
      yield put({ type: fetchQuestionListAction.SUCCESS, payload: { QuestionList: res } })
    } catch (e: unknown) {
      yield put({ type: fetchQuestionListAction.FAILURE })
      throw e
    }
  })
}
  
function* fetchQuestion(action: PayloadAction<{ id: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: QuestionStr = yield call(get, `${apiClient}/faqs/${action.payload.id}`)
      yield put({ type: fetchQuestionAction.SUCCESS, payload: { Question: res } })
    } catch (e: unknown) {
      yield put({ type: fetchQuestionAction.FAILURE })
      throw e
    }
  })
}

function* saveQuestion(action: PayloadAction<QuestionStr>) {
  yield errorWrapper(function* () {
    try {
      const res: QuestionStr = yield call(post, `${apiClient}/faqs`, action.payload)
      yield put({ type: saveQuestionAction.SUCCESS, payload: res })
    }
    catch (e: unknown) {
      yield put({ type: fetchQuestionAction.FAILURE })
      throw e
    }})
}

  
function* QuestionWatcher() {
  yield all([
    takeLatest(fetchQuestionListAction.TRIGGER, fetchQuestions),
    takeLatest(fetchQuestionAction.TRIGGER, fetchQuestion),
    takeLatest(saveQuestionAction.TRIGGER, saveQuestion),
  ])
}
  
export default QuestionWatcher
  