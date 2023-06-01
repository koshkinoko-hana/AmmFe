import './clientRoute.scss'
import Header from '@client/components/header'
import Menu from '@client/components/menu'
import Dialogue from '@common/components/dialogue'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

const ClientRoute: React.FC = () => {
  
  return (
    <>
      <Header/>
      <Menu/>
      <Dialogue/>
      <Outlet />
      <Footer />
    </>
  )
}

export default ClientRoute
