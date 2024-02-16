import {
  createAlbumAction,
  deleteAlbumAction,
  fetchAlbumAction,
  fetchAlbumListAction, updateAlbumAction
} from '@admin/ducks/actions/album'
import { Album, AlbumLight, AlbumState } from '@admin/ducks/types/album'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'
  
  
const initialState: AlbumState = {
  albums: [],
  total: 0,
  album: null,
  loading: false
}
  
const album = createReducer(initialState, {
  [fetchAlbumListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchAlbumListAction.SUCCESS]: (state, action: PayloadAction<{albums: AlbumLight[], total: number}>) => {
    const { albums, total } = action.payload
    return { ...state, loading: false, albums, total }
  },
  [fetchAlbumListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [fetchAlbumAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchAlbumAction.SUCCESS]: (state, action: PayloadAction<{album: Album}>) => {
    const { album } = action.payload
    return { ...state, album, loading: false }
  },
  [fetchAlbumAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [createAlbumAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [createAlbumAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [createAlbumAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [updateAlbumAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateAlbumAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [updateAlbumAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },

  [deleteAlbumAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [deleteAlbumAction.SUCCESS]: (state, action: PayloadAction<{id: number}>) => {
    return { 
      ...state, 
      photos: state.albums.filter(album => album.id !== action.payload.id),
      photo: state.album?.id !== action.payload.id ? state.album : null,
      loading: false
    }
  },
  [deleteAlbumAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})
  
export default album
