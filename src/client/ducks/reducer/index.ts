import news from '@client/ducks/reducer/news'
import { combineReducers } from '@reduxjs/toolkit'

const clientReducer = combineReducers({
  news
})


export default clientReducer