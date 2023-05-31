import {
  fetchCurrentQuestionAction,
  fetchFaqListAction,
} from '@admin/ducks/actions/faq'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { Faq, FaqState } from '@admin/ducks/types/faq'
  
const initialState: FaqState = {
  faqs: [],
  loading: false, 
}
  
const faq = createReducer(initialState, {
  [fetchFaqListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchFaqListAction.SUCCESS]: (state, action: PayloadAction<{faqs: Faq[]}>) => {
    const { faqs } = action.payload
    return { ...state, loading: false, faqs }
  },
  [fetchFaqListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [fetchCurrentQuestionAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchCurrentQuestionAction.SUCCESS]: (state, action: PayloadAction<{faq: Faq}>) => {
    return {  ...state, current: action.payload.faq, loading: false  }
  },
  [fetchCurrentQuestionAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

})
  
export default faq
  