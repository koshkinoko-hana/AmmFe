import news from '@client/ducks/reducer/news'
import gallery from '@client/ducks/reducer/gallery'
import { combineReducers } from '@reduxjs/toolkit'
import direction from './direction'

const clientReducer = combineReducers({
  news,
  direction,
  gallery
})


export default clientReducer