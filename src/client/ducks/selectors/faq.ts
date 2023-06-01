import { RootState } from '~/common/store'

export const getQuestions = (state: RootState) => state.admin.faq.faqs
export const getCurrentQuestion = (state: RootState) => state.admin.faq.current
export const getQuestionLoading = (state: RootState) => state.admin.faq.loading
