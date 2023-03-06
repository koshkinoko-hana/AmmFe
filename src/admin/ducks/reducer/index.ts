import department from '@admin/ducks/reducer/department'
import user from '@admin/ducks/reducer/user'
import { combineReducers } from '@reduxjs/toolkit'

const adminReducer = combineReducers({
  user,
  department,
})


export default adminReducer
