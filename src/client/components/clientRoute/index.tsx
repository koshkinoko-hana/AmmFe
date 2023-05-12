import './clientRoute.scss'
import Header from '@client/components/header'
import Menu from '@admin/components/menu'
import Dialogue from '@common/components/dialogue'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ClientRoute: React.FC = () => {
  
  return (
    <>
      <Header/>
      <Menu/>
      <Dialogue/>
      <Outlet />
    </>
  )
}

export default ClientRoute
