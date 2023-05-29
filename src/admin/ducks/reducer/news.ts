import {
  clearNewsAction,
  fetchNewsAction,
  fetchNewsListAction,
  saveNewsAction,
  updateNewsAction
} from '@admin/ducks/actions/news'
import { News, NewsLight, NewsState } from '@admin/ducks/types/news'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: NewsState = {
  newsList: [],
  loading: false
}

const news = createReducer(initialState, {
  [fetchNewsListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchNewsListAction.SUCCESS]: (state, action: PayloadAction<{news: NewsLight[]}>) => {
    const { news } = action.payload
    return { ...state, loggedIn: true, loading: false, newsList: news }
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
