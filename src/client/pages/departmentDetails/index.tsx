import EmployeeCard from '@client/pages/departmentDetails/components/EmployeeCard'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ClientRoutes } from '@common/types/routes'
import { Compass, Letter, PhoneBig } from '@common/icons'
import { useAppDispatch, useAppSelector } from '@common/store'

import Header from '@client/components/pageHeader'
import { PathKey } from '@client/components/pageHeader/types'
import noname from '~/assets/noname.svg'
import './departmentPage.scss'
import { getCurrentDepartment, getDepartmentLoading } from '@client/ducks/selectors/department'
import { fetchDepartmentAction } from '@client/ducks/actions/department'
import HeadDepartmentCard from './components/HeadDepartmentCard'

const DepartmentPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const departmentLoading = useAppSelector(getDepartmentLoading)
  const department = useAppSelector(getCurrentDepartment)

  useEffect(() => {
    dispatch(fetchDepartmentAction(id))
  }, [ id ])

  return (
    <>
      {departmentLoading || !department ? (<div>Loading...</div>) : (
        <>
          <div>
            <Header
              header={department.name || ''}
              description={''}
              path={{
                [PathKey.DEPARTMENTS]: ClientRoutes.departments
              }}/>
          </div>
          <div className="depart">
            <div className="depart__box">
              <div className="depart__box__menu">
                <ul className="depart__box__menu__list">
                  <li className="depart__box__menu__list__item">
                    <a href="#head">Заведующий кафедрой</a>
                  </li>
                  <li className="depart__box__menu__list__item">
                    <a href="#description">Описание работы кафедры</a>
                  </li>
                  <li className="depart__box__menu__list__item">
                    <a href="#employees">Сотрудники</a></li>
                  <li className="depart__box__menu__list__item">
                    <a href="#contscts">Контакты</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="depart__body">
              <div>
                <h2 id="head">Заведующий кафедрой</h2>
                <HeadDepartmentCard
                  img={department.head.photoPath || noname}
                  name={`${department.head.lastName} ${department.head.firstName} ${department.head.middleName || ''}`}
                  description={department.head.description || ''}/>
              </div>
              <div>
                <div>
                  <h2 id="description">Описание работы кафедры</h2>
                  <p>{department.description || ''}</p>
                </div>
                <h2 id="employees">Сотрудники</h2>
                <div className="depart__body__employees">
                  {
                    department.employees.map((e) => {
                      return (<EmployeeCard
                        key={e.id}
                        img={e.photoPath || noname}
                        name={`${e.firstName} ${e.middleName} ${e.lastName}`}
                        positions={e.positions}
                      />
                      )
                    })
                  }
                </div>
                <h2 id="contscts">Контакты</h2>
                <div className="depart__body__contacts">
                  <div className="depart__body__contacts__column__item">
                    <p className="p2">
                      <p className="link">
                        <span className="span-svg"><Compass/></span>
                        <span className="span-text">{department.address}</span>
                      </p>
                    </p>
                  </div>
                  <div className="depart__body__contacts__column__item">
                    {
                      department.phones.map((p, i) => (
                        <p className="p2" key={i}>
                          <a href={`tel:${p}`} className="link">
                            <span className="span-svg"> <PhoneBig/> </span>
                            <span className="span-text">{p}</span>
                          </a>
                        </p>
                      ))
                    }

                  </div>
                  <div className="depart__body__contacts__column__item">
                    <p className="p2">
                      <a href={`mailto:${department.email}`} className="link">
                        <span className="span-svg"><Letter/></span>
                        <span className="span-text">{department.email}</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default DepartmentPage
