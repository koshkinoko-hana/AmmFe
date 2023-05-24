import React from 'react'
import AdminRoute from '@admin/components/adminRoute/AdminRoute'
import Departments from '@admin/pages/departments'
import Employee from '@admin/pages/employee'
import Employees from '@admin/pages/employees'
import Positions from '@admin/pages/positions'
import { Route, Routes } from 'react-router-dom'
import ClientRoute from '~/client/components/clientRoute'
import MainPage from '~/client/pages/mainPage'
import NewsPage from '~/client/pages/newsPage'
import Login from './admin/pages/login'
import './common/styles/index.scss'
import { AdminRoutes, ClientRoutes } from '@common/types/routes'
import NewsDetailsPage from './client/pages/newsDetailsPage'

function App() {

  return (
    <Routes>
      <Route path={`/${AdminRoutes.root}/${AdminRoutes.login}`} element={<Login />} />
      <Route path={`/${AdminRoutes.root}`} element={<AdminRoute />}>
        <Route path={`${AdminRoutes.departments}`} element={<Departments />} />
        <Route path={`${AdminRoutes.positions}`} element={<Positions />} />
        <Route path={`${AdminRoutes.employees}`}>
          <Route path="" element={<Employees />} />
          <Route path="create" element={<Employee />} />
          <Route path=":id" element={<Employee />} />
        </Route>
      </Route>
      <Route path={'/'} element={<ClientRoute/>}>
        <Route path={`${ClientRoutes.home}`} element={<MainPage/>} />
        <Route path={`${ClientRoutes.news}`} element={<NewsPage/>}/>
        <Route path={`${ClientRoutes.news}/:slug`} element={<NewsDetailsPage/>}/>
        {/* <Route path={`${ClientRoutes.positions}`} element={<Positions/>}/> */}
        {/*<Route path={`${ClientRoutes.employees}`}>*/}
        {/*  <Route path="" element={<Employees/>}/>*/}
        {/*  <Route path="create" element={<Employee/>}/>*/}
        {/*  <Route path=":id" element={<Employee/>}/>*/}
        {/*</Route>*/}
      </Route>
    </Routes>
  )
}

export default App
