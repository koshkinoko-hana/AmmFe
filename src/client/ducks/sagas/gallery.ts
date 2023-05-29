import { errorWrapper } from '~/admin/ducks/sagas/sagaWrapper'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { get } from '~/common/utils/fetch'
import { apiClient } from '~/common/consts/general'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchGalleryListAction } from '../actions/gallery'
import { Response } from '../types/gallery'

function* fetchGallery(action: PayloadAction<number>) {
  yield errorWrapper(function* () {
    try {
      const res: Response = yield call(get, `${apiClient}/gallery?offset=${action.payload}&limit=8`)
      res.data = res.data.map(item => ({...item, createdAt: item.createdAt.slice(0, 10).split('-').reverse().join('.')}))
      yield put({ type: fetchGalleryListAction.SUCCESS, payload: { photos: res.data, total: res.total } })
    } catch (e: unknown) {
      yield put({ type: fetchGalleryListAction.FAILURE })
      throw e
    }
  })
}

function* galleryWatcher() {
  yield all([
    takeLatest(fetchGalleryListAction.TRIGGER, fetchGallery),
  ])
}
  
export default galleryWatcher