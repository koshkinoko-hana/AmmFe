import department from '@client/ducks/reducer/department'
import news from '@client/ducks/reducer/news'
import { combineReducers } from '@reduxjs/toolkit'
import employee from '@client/ducks/reducer/employee'
import position from '@client/ducks/reducer/position'
import app from '@client/ducks/reducer/app'

const clientReducer = combineReducers({
  app,
  department,
  employee,
  position,
  news,
})


export default clientReducer