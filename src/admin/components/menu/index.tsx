import './menu.scss'
import { fetchMeAction } from '@admin/ducks/actions/user'
import { getUserRoles } from '@admin/ducks/selectors/user'
import { Role } from '@admin/ducks/types/user'
import Logo from '@common/logo'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { AdminRoutes } from '~/common/types/routes'
import { token } from '~/common/utils/token'

const Header: React.FC = () => {
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
    <div className="header">
      <div className="logo-container"><Logo/><div>ПММ <br/>Админпанель</div></div>
      <div className="menu">
        <Link to="/" className="p1">Расписание</Link>
      </div>
    </div>
  )
}

export default Header
