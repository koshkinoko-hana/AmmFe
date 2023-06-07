import { RootState } from '~/common/store'

export const getFaqs = (state: RootState) => state.admin.faq.faqs
export const getCurrentQuestion = (state: RootState) => state.admin.faq.current
export const getFaqsLoading = (state: RootState) => state.admin.faq.loading
