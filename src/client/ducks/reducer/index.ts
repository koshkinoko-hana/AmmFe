import news from '@client/ducks/reducer/news'
import gallery from '@client/ducks/reducer/gallery'
import { combineReducers } from '@reduxjs/toolkit'

const clientReducer = combineReducers({
  news,
  gallery
})


export default clientReducer