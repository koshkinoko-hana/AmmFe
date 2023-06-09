import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ClientRoutes } from '~/common/types/routes'
import { Compass, Letter, PhoneBig } from '~/common/icons'
import { useAppDispatch, useAppSelector } from '~/common/store'

import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { getEmployeeLoading } from '~/client/ducks/selectors/employee'
import { fetchEmployeeAction, fetchEmployeeListAction } from '~/client/ducks/actions/employee'
import { fetchDepartmentListAction } from '~/client/ducks/actions/department'
import { getDepartmentLoading } from '~/client/ducks/selectors/department'

import EmployeeCard from './components/EmployeeCard'
import HeadDepartmentCard from './components/HeadDepartmentCard'
import './departmentPage.scss'

const DepartmentPage: React.FC = () => {
  const { id: id_department } = useParams()
  const { employees } = useAppSelector(state => state.client.employee)
  const headDepart = useAppSelector(state => state.client.employee.current)
  const { departments} = useAppSelector(state => state.client.department)
  const dispatch = useAppDispatch()
  const employeeLoading = useAppSelector(getEmployeeLoading)
  const departmentLoading = useAppSelector(getDepartmentLoading)

  useEffect(() => {
    dispatch(fetchEmployeeListAction())
    dispatch(fetchDepartmentListAction())
  }, [])

  useEffect(() => {
    //headDepartment
    if(!employeeLoading && id_department && !departmentLoading)
    {
      const employee = employees.find(
        (e) => (e.departments.some(department => department.id === Number(id_department)) && 
        e.positions.some(id_position => id_position.id === 1))
      )
      if( employee && employee.id ){
        dispatch(fetchEmployeeAction( { id: employee.id } ))
      }
    }
  }, [ id_department])

  return (
    <>
      <div>
        <Header 
          header={(departments.find(department => department.id.toString() === id_department)?.name) || ''}
          description={''} 
          path={{
            [PathKey.DEPARTMENTS]: ClientRoutes.departments
          }}
        />
      </div>
      <div className='depart'>
        <div className='depart__box'>
          <div className='depart__box__menu'>
            <ul className='depart__box__menu__list'>
              <li className='depart__box__menu__list__item' >
                <a href="#head">Заведующий кафедрой</a> 
              </li>
              <li className='depart__box__menu__list__item'>
                <a href="#description">Описание работы кафедры</a>
              </li>
              <li className='depart__box__menu__list__item'>
                <a href="#employees">Сотрудники</a> </li>
              <li className='depart__box__menu__list__item'>
                <a href="#contscts">Контакты</a> 
              </li>            
            </ul>
          </div>
        </div>
        <div className='depart__body'>
          {headDepart && headDepart.photoPath && (
            <div>
              <h2 id="head">Заведующий кафедрой</h2>
              <HeadDepartmentCard
                img={headDepart.photoPath}
                name={`${headDepart.lastName} ${headDepart.firstName} ${headDepart.middleName}`}
                description={headDepart.description || ''}
              />
            </div>
          )}      
          <div>
            <div>
              <h2 id="description">Описание работы кафедры</h2>        
              <p>{departments.at(Number(id_department)-1)?.description || ''}</p>
            </div>
            <h2 id="employees">Сотрудники</h2>
            <div className='depart__body__employees'>
              {!employeeLoading && !departmentLoading && ( 
                employees.map((e) => {if (e.departments.some(department => department.id === Number(id_department))) 
                  return (<EmployeeCard 
                    key={e.id} 
                    img={e.photoPath || ''} 
                    name={`${e.firstName} ${e.middleName} ${e.lastName}`} 
                    descripton={`Должность: ${e.positions.map(e => e.name).join(', ')}`}
                  />)
                }))
              }
            </div>
            <h2 id="contscts">Контакты</h2>
            <div className='depart__body__contacts'>
              <div className='depart__body__contacts__column__item'>
                <Link to="/" className="p2">
                  <a href="#" className='link'>
                    <span className='span-svg'><Compass /></span>
                    <span className='span-text'>394000, Воронеж, Университетская площадь, 1, Факультет ПММ, кафедра ТПМ</span>
                  </a>
                </Link>
              </div>
              <div className='depart__body__contacts__column__item'>
                <Link to="/" className="p2">
                  <a href="tel:+74732789763" className='link'>
                    <span className='span-svg'> <PhoneBig /> </span>
                    <span className='span-text'> + 7 (473) 278-97-63 </span>
                  </a>
                </Link>
              </div>
              <div className='depart__body__contacts__column__item'>
                <Link to="/" className="p2">
                  <a href="#" className='link'>
                    <span className='span-svg'><Letter /></span>
                    <span className='span-text'>г. Воронеж, Университетская пл. 1</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DepartmentPage
