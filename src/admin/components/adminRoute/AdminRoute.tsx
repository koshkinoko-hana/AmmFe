import Header from '@admin/components/header'
import { fetchMeAction } from '@admin/ducks/actions/user'
import { getUserRoles } from '@admin/ducks/selectors/user'
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
      <Dialogue/>
      <Outlet />
    </>
  )
}

export default AdminRoute
