import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { createPhotoAction, deletePhotoAction, fetchPhotoAction, fetchPhotoListAction } from '../actions/gallery'
import { GalleryPhoto, GalleryState } from '../types/gallery'
  
  
const initialState: GalleryState = {
  photos: [],
  total: 0,
  photo: null,
  loading: false
}
  
const gallery = createReducer(initialState, {
  [fetchPhotoListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchPhotoListAction.SUCCESS]: (state, action: PayloadAction<{photos: GalleryPhoto[], total: number}>) => {
    const { photos, total } = action.payload
    return { ...state, loading: false, photos, total }
  },
  [fetchPhotoListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [fetchPhotoAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchPhotoAction.SUCCESS]: (state, action: PayloadAction<{photo: GalleryPhoto}>) => {
    const { photo } = action.payload
    return { ...state, photo, loading: false }
  },
  [fetchPhotoAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [createPhotoAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [createPhotoAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [createPhotoAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [deletePhotoAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [deletePhotoAction.SUCCESS]: (state, action: PayloadAction<{id: number}>) => {
    return { 
      ...state, 
      photos: state.photos.filter(photo => photo.id !== action.payload.id), 
      photo: state.photo?.id !== action.payload.id ? state.photo : null, 
      loading: false
    }
  },
  [deletePhotoAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})
  
export default gallery
