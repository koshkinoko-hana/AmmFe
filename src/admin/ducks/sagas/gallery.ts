import { errorWrapper } from '@admin/ducks/sagas/sagaWrapper'
import { closeDialogueAction, setLoadingDialogueAction } from '@common/ducks/slice/dialogue'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { apiAdmin } from '~/common/consts/general'
import { del, get, postFormData } from '~/common/utils/fetch'
import { GalleryPhoto, GalleryPhotoListItem } from '../types/gallery'
import { createPhotoAction, deletePhotoAction, fetchPhotoAction, fetchPhotoListAction } from '../actions/gallery'

function* fetchPhotos(action: PayloadAction<{offset: number, limit: number}>) {
  yield errorWrapper(function* () {
    try {
      const res: {data: GalleryPhotoListItem[], total: number} = yield call(get, `${apiAdmin}/gallery?offset=${action.payload.offset}&limit=${action.payload.limit}`)
      yield put({ type: fetchPhotoListAction.SUCCESS, payload: { photos: res.data, total: res.total } })
    } catch (e: unknown) {
      yield put({ type: fetchPhotoListAction.FAILURE })
      throw e
    }
  })
}
  
function* fetchPhoto(action: PayloadAction<{ id: number }>) {
  yield errorWrapper(function* () {
    try {
      const res: GalleryPhoto = yield call(get, `${apiAdmin}/gallery/${action.payload.id}`)
      yield put({ type: fetchPhotoAction.SUCCESS, payload: { photo: res } })
    } catch (e: unknown) {
      yield put({ type: fetchPhotoAction.FAILURE })
      throw e
    }
  })
}
  
function* deletePhoto(action: PayloadAction<{id: number}>) {
  yield errorWrapper(function* () {
    try {
      const res: number = yield call(del, `${apiAdmin}/gallery/${action.payload.id}`)
      yield put({type: deletePhotoAction, payload: {id: res}})
      yield put(closeDialogueAction())
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
} 
  
function* createPhoto(action: PayloadAction<FormData>) {
  yield errorWrapper(function* () {
    try {
      yield call(postFormData, `${apiAdmin}/gallery`, action.payload)
      yield put({type: createPhotoAction.SUCCESS})
      yield put(closeDialogueAction())
    } catch (e: unknown) {
      yield put(setLoadingDialogueAction(false))
      throw e
    }
  })
}
  
function* galleryWatcher() {
  yield all([
    takeLatest(fetchPhotoListAction.TRIGGER, fetchPhotos),
    takeLatest(fetchPhotoAction.TRIGGER, fetchPhoto),
    takeLatest(deletePhotoAction.TRIGGER, deletePhoto),
    takeLatest(createPhotoAction.TRIGGER, createPhoto),
  ])
}
  
export default galleryWatcher
  