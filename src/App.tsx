import AdminRoute from '@admin/components/adminRoute/AdminRoute'
import { clearErrorAction } from '@admin/ducks/actions/apiError'
import { getError } from '@admin/ducks/selectors/apiError'
import { ApiError } from '@admin/ducks/types/apiError'
import Departments from '@admin/pages/departments'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './admin/pages/login'
import './common/styles/index.scss'
import { AdminRoutes } from '@common/types/routes'

function App() {
  const dispatch = useDispatch()
  const error = useSelector(getError)
  const navigate = useNavigate()

  useEffect(() => {
    if(error) {
      switch (error) {
      case ApiError.UNAUTHORIZED:
        navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
        break
      case ApiError.FORBIDDEN:
      case ApiError.NOT_FOUND:
        // navigate(`/${CommonRoutes.notFound}`)
        console.log('not found')
        break
      }
      dispatch(clearErrorAction())
    }
  }, [error])

  return (
    <Routes>
      <Route path={`/${AdminRoutes.root}/${AdminRoutes.login}`} element={<Login/>}/>
      <Route path={`/${AdminRoutes.root}`} element={<AdminRoute/>}>
        <Route path={`${AdminRoutes.departments}`} element={<Departments/>} />
      </Route>
    </Routes>
  )
}

export default App
