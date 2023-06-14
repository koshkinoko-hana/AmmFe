import department from '@client/ducks/reducer/department'
import news from '@client/ducks/reducer/news'
import gallery from '@client/ducks/reducer/gallery'
import { combineReducers } from '@reduxjs/toolkit'
import direction from './direction'
import employee from '@client/ducks/reducer/employee'
import position from '@client/ducks/reducer/position'
import app from '@client/ducks/reducer/app'
import faq from '@client/ducks/reducer/faq'

const clientReducer = combineReducers({
  app,
  department,
  employee,
  position,
  news,
  gallery,
  faq,
  direction,
})


export default clientReducer