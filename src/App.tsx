import NewsDetails from '@admin/pages/news'
import NewsList from '@admin/pages/newsList'
import Contacts from '@client/pages/contacts'
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
import QuestionPage from '~/client/pages/questionPage'
import Login from './admin/pages/login'
import './common/styles/index.scss'
import { AdminRoutes, ClientRoutes } from '@common/types/routes'
import DepartmentsPage from './client/pages/departmentPage'
import DepartmentPage from './client/pages/departments/Department1Page'
import NewsDetailsPage from './client/pages/newsDetailsPage'
import AdminDepartmentPage from './admin/pages/departmentPage'
import AdminFaqPage from './admin/pages/deanFaqPage'
import Question from './admin/pages/deanFaq'
import GalleryAdmin from './admin/pages/gallery'
import CreatePhoto from './admin/pages/createPhoto'
import Directions from './admin/pages/directions'
import Direction from './admin/pages/direction'
import DirectionsClient from './client/pages/directionsPage'
import Gallery from './client/pages/galleryPage'

function App(): JSX.Element {

  return (
    <Routes>
      <Route path={`/${AdminRoutes.root}/${AdminRoutes.login}`} element={<Login/>}/>
      <Route path={`/${AdminRoutes.root}`} element={<AdminRoute/>}>
        <Route path={`${AdminRoutes.departments}`} element={<Departments/>}/>
        <Route path={`${AdminRoutes.department}`}>
          <Route path="" element={<AdminDepartmentPage/>}/>
          <Route path="create" element={<AdminDepartmentPage/>}/>
          <Route path=":id" element={<AdminDepartmentPage/>}/>
        </Route>
        <Route path={`${AdminRoutes.positions}`} element={<Positions/>}/>
        <Route path={`${AdminRoutes.gallery}`}>
          <Route path="" element={<GalleryAdmin/>}/>
          <Route path="create" element={<CreatePhoto/>}/>
        </Route>
        <Route path={`${AdminRoutes.employees}`}>
          <Route path="" element={<Employees/>}/>
          <Route path="create" element={<Employee/>}/>
          <Route path=":id" element={<Employee/>}/>
        </Route>
        <Route path={`${AdminRoutes.directions}`}>
          <Route path="" element={<Directions/>}/>
          <Route path="create" element={<Direction/>}/>
          <Route path=":id" element={<Direction/>}/>
        </Route>
        <Route path={`${AdminRoutes.faq}`}>
          <Route path="" element={<AdminFaqPage/>}/>
          <Route path="create" element={<Question/>}/>
          <Route path=":id" element={<Question/>}/>
        </Route>
        <Route path={`${AdminRoutes.news}`}>
          <Route path="" element={<NewsList />} />
          <Route path="create" element={<NewsDetails />} />
          <Route path=":id" element={<NewsDetails />} />
        </Route>
      </Route>
      <Route path={'/'} element={<ClientRoute/>}>
        <Route path={`${ClientRoutes.home}`} element={<MainPage/>}/>
        <Route path={`${ClientRoutes.news}`} element={<NewsPage/>}/>
        <Route path={`${ClientRoutes.news}/:slug`} element={<NewsDetailsPage/>}/>
        <Route path={`${ClientRoutes.deanFaq}`} element={<QuestionPage/>}/>
        <Route path={`${ClientRoutes.departments}`}>
          <Route path="" element={<DepartmentsPage/>}/>
          <Route path=":id" element={<DepartmentPage/>}/>
        </Route>
        <Route path={`${ClientRoutes.contacts}`} element={<Contacts/>}/>
        <Route path={`${ClientRoutes.directions}`}>
          <Route path="" element={<DirectionsClient/>}/>
          <Route path=":id" element={<DepartmentPage/>}/>
        </Route>
        {/* <Route path={`${ClientRoutes.positions}`} element={<Positions/>}/> */}
        <Route path={`${ClientRoutes.gallery}`} element={<Gallery/>}/>
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
