import {
  clearNewsAction,
  fetchNewsAction,
  fetchNewsListAction,
  saveNewsAction,
  updateNewsAction
} from '@admin/ducks/actions/news'
import { News, NewsLight, NewsState } from '@admin/ducks/types/news'
import { PaginatedResponseWrapper } from '@admin/ducks/types/paginatedResponseWrapper'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: NewsState = {
  newsList: [],
  loading: false,
  total: 0
}

const news = createReducer(initialState, {
  [fetchNewsListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsListAction.SUCCESS]: (state, action: PayloadAction<{news: PaginatedResponseWrapper<NewsLight>}>) => {
    const { news } = action.payload
    return { ...state, loading: false, newsList: news.data, total: news.total }
  },
  [fetchNewsListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchNewsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsAction.SUCCESS]: (state, action:  PayloadAction<{news: News}>) => {
    return { ...state, current: action.payload.news, loading: false }
  },
  [fetchNewsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [saveNewsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateNewsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [saveNewsAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [updateNewsAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [saveNewsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [updateNewsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [clearNewsAction.type]: (state) => {
    return { ...state, current: undefined }
  },
})

export default news
