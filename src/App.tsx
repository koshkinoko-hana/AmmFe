import AdminRoute from '@admin/components/adminRoute/AdminRoute'
import Departments from '@admin/pages/departments'
import Employee from '@admin/pages/employee'
import Employees from '@admin/pages/employees'
import Positions from '@admin/pages/positions'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientRoute from '~/client/components/clientRoute'
import MainPage from '~/client/pages/mainPage'
import NewsPage from '~/client/pages/news'
import QuestionPage from '~/client/pages/questionPage'
import Login from './admin/pages/login'
import './common/styles/index.scss'
import { AdminRoutes, ClientRoutes } from '@common/types/routes'
import DepartmentPage from './client/pages/departmentPage'
import Department1Page from './client/pages/departments/Department1Page'

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
        <Route path={`${ClientRoutes.news}`} element={<NewsPage/>} />
        <Route path={`${ClientRoutes.deanFaq}`} element={<QuestionPage/>} />
        <Route path={`${ClientRoutes.departments}`} >
          <Route path="" element={ <DepartmentPage/>} />
          <Route path="Department1" element={<Department1Page />} />
          <Route path="Department2" element={<Department1Page />} />
          <Route path="Department3" element={<Department1Page />} />
          <Route path="Department4" element={<Department1Page />} />
          <Route path="Department5" element={<Department1Page />} />
          <Route path="Department6" element={<Department1Page />} />
          <Route path="Department7" element={<Department1Page />} />
          <Route path="Department8" element={<Department1Page />} />
          <Route path="Department9" element={<Department1Page />} />
        </Route>
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
