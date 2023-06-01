import news from '@client/ducks/reducer/news'
import { combineReducers } from '@reduxjs/toolkit'
import direction from './direction'

const clientReducer = combineReducers({
  news,
  direction
})


export default clientReducer