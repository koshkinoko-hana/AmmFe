import {
  fetchGalleryListAction,
} from '@client/ducks/actions/gallery'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { GalleryCard, GalleryState } from '../types/gallery'

const initialState: GalleryState = {
  loading: true,
  total: 0,
  photos: [],
}
    
const gallery = createReducer(initialState, {
  [fetchGalleryListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchGalleryListAction.SUCCESS]: (state, action: PayloadAction<{photos: GalleryCard[], total: number}>) => {
    const { photos, total } = action.payload
    return { ...state, loading: false, photos, total }
  },
  [fetchGalleryListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})
    
export default gallery
    