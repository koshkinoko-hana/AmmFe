import app from '@admin/ducks/reducer/app'
import department from '@admin/ducks/reducer/department'
import employee from '@admin/ducks/reducer/employee'
import position from '@admin/ducks/reducer/position'
import user from '@admin/ducks/reducer/user'
import { combineReducers } from '@reduxjs/toolkit'
import direction from './direction'

const adminReducer = combineReducers({
  app,
  department,
  employee,
  position,
  user,
  direction
})


export default adminReducer
