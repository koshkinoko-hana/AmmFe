import app from '@admin/ducks/reducer/app'
import department from '@admin/ducks/reducer/department'
import employee from '@admin/ducks/reducer/employee'
import news from '@admin/ducks/reducer/news'
import position from '@admin/ducks/reducer/position'
import user from '@admin/ducks/reducer/user'
import gallery from '@admin/ducks/reducer/gallery'
import { combineReducers } from '@reduxjs/toolkit'
import faq from '@admin/ducks/reducer/faq'

const adminReducer = combineReducers({
  app,
  department,
  employee,
  news,
  position,
  gallery,
  user,
  faq,
})

export default adminReducer
