import { RootState } from '~/common/store'

export const getQuestions = (state: RootState) => state.client.faq.QuestionList
export const getQuestionLoading = (state: RootState) => state.client.faq.loading
