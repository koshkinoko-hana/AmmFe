import { RootState } from '~/common/store'

export const getPhotos = (state: RootState) => state.admin.gallery.photos
export const getPhotosTotal = (state: RootState) => state.admin.gallery.total
export const getPhotosLoading = (state: RootState) => state.admin.gallery.loading