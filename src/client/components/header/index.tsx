import './header.scss'
import { toggleMenuAction } from '@admin/ducks/reducer/app'
import { Burger } from '@common/icons'
import Logo from '@common/logo'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  return (
    <>
      <div className="header__substrate">
        <div className="client__header">
          <div className="header-container">
            <div className="logo-container">
              <Logo/>
              <div className="logo-text">Факультет прикладной математики, информатики и механики</div>
            </div>
            <div className="menu">
              <Link to="/news" className="p1 mobile-hidden">Новости</Link>
              <Link to="/" className="p1 mobile-hidden">Кафедры</Link>
              <Link to="/gallery" className="p1 tablet-hidden">Галерея</Link>
              <Link to="/" className="p1 tablet-hidden">Контакты</Link>
              <Link to="/" className="p1 mobile-hidden">Расписание</Link>
              <Burger onClick={toggleMenu}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
