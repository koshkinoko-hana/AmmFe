import { RootState } from '~/common/store'

export const getNewsList = (state: RootState) => state.admin.news.newsList
export const getCurrentNews = (state: RootState) => state.admin.news.current
export const getNewsLoading = (state: RootState) => state.admin.news.loading
