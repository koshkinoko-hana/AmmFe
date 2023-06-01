import {
  fetchQuestionAction,
  fetchQuestionListAction,
  saveQuestionAction, 
} from '@client/ducks/actions/faq'
import { QuestionStr, QuestionState } from '@client/ducks/types/faq'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'
  
  
const initialState: QuestionState = {
  QuestionList: [],
  loading: false
}
  
const Question = createReducer(initialState, {
  [fetchQuestionListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchQuestionListAction.SUCCESS]: (state, action: PayloadAction<{QuestionList: QuestionStr[]}>) => {
    const { QuestionList } = action.payload
    return { ...state, loggedIn: true, loading: false, QuestionList }
  },
  [fetchQuestionListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchQuestionAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchQuestionAction.SUCCESS]: (state, action:  PayloadAction<{Question: QuestionStr}>) => {
    return { ...state, current: action.payload.Question, loading: false }
  },
  [fetchQuestionAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [saveQuestionAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [saveQuestionAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [saveQuestionAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  // [updateQuestionAction.SUCCESS]: (state) => {
  //   return { ...state, loading: false }
  // },
  // [updateQuestionAction.TRIGGER]: (state) => {
  //   return { ...state, loading: true }
  // },
  // [updateQuestionAction.FAILURE]: (state) => {
  //   return { ...state, loading: false }
  // },

})
  
export default Question
  