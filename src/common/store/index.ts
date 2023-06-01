import apiError from '@common/ducks/reducer/apiError'
import dialogue from '@common/ducks/slice/dialogue'
import admin from '@admin/ducks/reducer'
import adminSaga from '@admin/ducks/sagas/root'
import clientSaga from '@client/ducks/sagas/root'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import client from '~/client/ducks/reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { all } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const rootReducer = combineReducers({
  admin,
  apiError,
  dialogue,
  client, 
})

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
})

function* rootSaga() {
  yield all([
    adminSaga(),
    clientSaga()
  ])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
