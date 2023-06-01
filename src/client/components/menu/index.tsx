import './menu.scss'
import { toggleMenuAction } from '@admin/ducks/reducer/app'
import { getMenuShown } from '@admin/ducks/selectors/app'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ClientRoutes } from '~/common/types/routes'

const Menu: React.FC = () => {
  const shown: boolean = useSelector(getMenuShown)
  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  if(shown) {
    return (
      <div className="side-menu">
        <Link to={`/${ClientRoutes.home}`} onClick={toggleMenu} className="p1">Главная</Link>
        <Link to={`/${ClientRoutes.departments}`} onClick={toggleMenu} className="p1">Кафедры</Link>
        <Link to={`/${ClientRoutes.news}`} onClick={toggleMenu} className="p1">Новости</Link>
      </div>
    )
  }
  return null
}

export default Menu
