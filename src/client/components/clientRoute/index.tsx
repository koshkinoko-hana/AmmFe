import './clientRoute.scss'
import BugAlarm from '@client/components/BugAlarm'
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
      <BugAlarm/>
    </>
  )
}

export default ClientRoute
