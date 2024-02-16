import './header.scss'
import { fetchMeAction, logoutAction } from '@admin/ducks/actions/me'
import { toggleMenuAction } from '@admin/ducks/reducer/app'
import { getMeRoles } from '@admin/ducks/selectors/me'
import { Role } from '@admin/ducks/types/user'
import { Burger } from '@common/icons'
import Logo from '@common/logo'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { AdminRoutes } from '~/common/types/routes'
import { token } from '~/common/utils/token'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const roles: Role[] = useSelector(getMeRoles)

  useEffect(() => {
    if (!token()) {
      navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
    }
    else if (!roles.length) {
      dispatch(fetchMeAction())
    }
  }, [])

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  const logout = () => {
    dispatch(logoutAction())
  }

  return (
    <>
      <div className="header__substrate"></div>
      <div className="header">
        <div className="logo-container"><Logo/><div>ПММ <br/>Админпанель</div></div>
        <div className="menu">
          <Link to={`${AdminRoutes.departments}`} className="p1" >Кафедры</Link>
          <Link to={`${AdminRoutes.employees}`} className="p1">Сотрудники</Link>
          <Link to={`${AdminRoutes.directions}`} className="p1">Направления</Link>
          <Link to={`${AdminRoutes.gallery}`} className="p1">Галерея</Link>
          <a onClick={logout}>Выйти</a>
          <Burger onClick={toggleMenu}/>
        </div>
      </div>
    </>
  )
}

export default Header
