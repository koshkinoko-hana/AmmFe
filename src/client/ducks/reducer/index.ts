import department from '@client/ducks/reducer/department'
import news from '@client/ducks/reducer/news'
import gallery from '@client/ducks/reducer/gallery'
import { combineReducers } from '@reduxjs/toolkit'
import direction from './direction'
import employee from '@client/ducks/reducer/employee'
import position from '@client/ducks/reducer/position'
import app from '@client/ducks/reducer/app'

const clientReducer = combineReducers({
  app,
  department,
  employee,
  position,
  news,
  direction,
  gallery
})


export default clientReducer