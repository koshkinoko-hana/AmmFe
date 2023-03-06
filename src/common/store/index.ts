import apiError from '@common/ducks/reducer/apiError'
import dialogue from '@common/ducks/slice/dialogue'
import admin from '@admin/ducks/reducer'
import rootSaga from '@admin/ducks/sagas/root'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const rootReducer = combineReducers({
  admin,
  apiError,
  dialogue,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
