import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ClientRoutes } from '~/common/types/routes'
import { Compass, Letter, PhoneBig } from '~/common/icons'
import { useAppDispatch, useAppSelector } from '~/common/store'

import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { getEmployeeLoading } from '~/client/ducks/selectors/employee'
import { fetchEmployeesByDepartmentAction } from '~/client/ducks/actions/employee'

import EmployeeCard from './components/EmployeeCard'
import noname from '~/assets/noname.svg'
import './departmentPage.scss'
import { getDepartmentLoading, getDepartments } from '~/client/ducks/selectors/department'
import { fetchDepartmentListAction } from '~/client/ducks/actions/department'
import HeadDepartmentCard from './components/HeadDepartmentCard'
import { Employee } from '~/client/ducks/types/employee'

const DepartmentPage: React.FC = () => {
  const { id: id_department } = useParams()
  const employees = useAppSelector(state => state.client.employee.employees)
  const dispatch = useAppDispatch()
  const employeeLoading = useAppSelector(getEmployeeLoading)
  const departmentLoading = useAppSelector(getDepartmentLoading)
  const departments = useAppSelector(getDepartments)
  const [headDepart, setHeadDepart] = useState<Employee | null | undefined>(null)

  useEffect(() => {
    dispatch(fetchEmployeesByDepartmentAction({id_department:Number(id_department)}))
    if(!departments || departments.length === 0 )
      dispatch(fetchDepartmentListAction())
  }, [id_department])

  useEffect(() => {
    const foundEmployee = employees.find((employee) => employee.positions && employee.positions.some((position) => position.id === 1))
    if(foundEmployee)
      setHeadDepart(foundEmployee)
    else
      setHeadDepart(null)
  }, [employees])

  return (
    <>
      { departmentLoading  || !departments ? (<div>Loading...</div>) : (
        <><div>
          <Header
            header={(departments.find(department => department.id.toString() === id_department)?.name) || ''}
            description={''}
            path={{
              [PathKey.DEPARTMENTS]: ClientRoutes.departments
            }} />
        </div><div className='depart'>
          <div className='depart__box'>
            <div className='depart__box__menu'>
              <ul className='depart__box__menu__list'>
                <li className='depart__box__menu__list__item'>
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
            {headDepart &&
                (<div>
                  <h2 id="head">Заведующий кафедрой</h2>
                  <HeadDepartmentCard
                    img={headDepart?.photoPath || noname}
                    name={`${headDepart?.lastName || ' '} ${headDepart?.firstName || ' '} ${headDepart?.middleName || ' '}`}
                    description={headDepart?.description || ''} />
                </div>)}
            <div>
              <div>
                <h2 id="description">Описание работы кафедры</h2>
                <p>{(departments.find(department => department.id.toString() === id_department)?.description) || ''}</p>
              </div>
              <h2 id="employees">Сотрудники</h2>
              <div className='depart__body__employees'>
                {!employeeLoading && (
                  employees.map((e) => {
                    return (<EmployeeCard
                      key={e.id}
                      img={e.photoPath || noname}
                      name={`${e.firstName} ${e.middleName} ${e.lastName}`}
                      descripton={`Должность: ${e.positions.map(e => e.name).join(', ')}`} />)
                  }))}
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
        </div></>
      )}
    </>
  )
}
export default DepartmentPage