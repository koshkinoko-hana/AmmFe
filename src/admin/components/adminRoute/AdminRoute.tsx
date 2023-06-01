import './adminRoute.scss'
import Header from '@admin/components/header'
import Menu from '@admin/components/menu'
import { clearErrorAction } from '@admin/ducks/actions/apiError'
import { fetchMeAction } from '@admin/ducks/actions/user'
import { getError } from '@admin/ducks/selectors/apiError'
import { getUserRoles } from '@admin/ducks/selectors/user'
import { ApiError } from '@admin/ducks/types/apiError'
import { Role } from '@admin/ducks/types/user'
import Dialogue from '@common/components/dialogue'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { AdminRoutes } from '~/common/types/routes'
import { token } from '~/common/utils/token'

const AdminRoute: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const roles: Role[] = useSelector(getUserRoles)
  const error = useSelector(getError)

  useEffect(() => {
    if(error) {
      switch (error) {
      case ApiError.UNAUTHORIZED:
        navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
        break
      case ApiError.FORBIDDEN:
      case ApiError.NOT_FOUND:
        break
      }
      dispatch(clearErrorAction())
    }
  }, [error])

  useEffect(() => {
    if (!token()) {
      navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
    }
    else if (!roles.length) {
      dispatch(fetchMeAction())
    }
  }, [])

  
  return (
    <>
      <Header/>
      <Menu/>
      <Dialogue/>
      <div className="admin-page">
        <Outlet />
      </div>
    </>
  )
}

export default AdminRoute
