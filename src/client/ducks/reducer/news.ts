import {
  fetchNewsDetailsAction,
  fetchNewsListAction,
  fetchNewsPreviewAction,
} from '@client/ducks/actions/news'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { newsCard, newsDetails, NewsState } from '../types/news'
  
  
const initialState: NewsState = {
  loading: false,
  news: [],
  newsPreview: [],
  details: {} as newsDetails,
}
  
const news = createReducer(initialState, {
  [fetchNewsListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsListAction.SUCCESS]: (state, action: PayloadAction<{news: newsCard[]}>) => {
    const { news } = action.payload
    return { ...state, loading: false, news }
  },
  [fetchNewsListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchNewsPreviewAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsPreviewAction.SUCCESS]: (state, action: PayloadAction<{newsPreview: newsCard[]}>) => {
    const { newsPreview } = action.payload
    return { ...state, loading: false, newsPreview }
  },
  [fetchNewsPreviewAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchNewsDetailsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsDetailsAction.SUCCESS]: (state, action: PayloadAction<{details: newsDetails}>) => {
    const { details } = action.payload
    return { ...state, loading: false, details }
  },
  [fetchNewsDetailsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})
  
export default news
  