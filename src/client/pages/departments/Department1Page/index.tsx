import Header from '~/client/components/pageHeader'
import React, { useEffect } from 'react'
import { ClientRoutes } from '~/common/types/routes'
import { PathKey } from '~/client/components/pageHeader/types'
import './departmentPage.scss'
import DepartmentHead from '../../../../assets/Shashkin.png'
import noname from '../../../../assets/noname.svg'
import { Link, useParams } from 'react-router-dom'
import { Compass, Letter, PhoneBig } from '~/common/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeLoading, getEmployees } from '~/admin/ducks/selectors/employee'
import { fetchEmployeeListAction } from '~/admin/ducks/actions/employee'
import { fetchPositionListAction } from '~/admin/ducks/actions/position'
import { getPositions } from '~/admin/ducks/selectors/position'
import EmployeeCard from './components/EmployeeCard'

const DepartmentPage: React.FC = () => {
  const { id: id_department } = useParams()
  const dispatch = useDispatch()
  const employees = useSelector(getEmployees)
  const positions = useSelector(getPositions)
  const loading = useSelector(getEmployeeLoading)

  

  useEffect(() => {
    dispatch(fetchEmployeeListAction())
  }, [])

  useEffect(() => {
    dispatch(fetchPositionListAction())
  }, [])

  return (
    <>
      <div>
        <Header 
          header={'Кафедра математического и прикладного анализа'} 
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
          <h2 id="head">Заведующий кафедрой</h2>
          <div className='depart__body__head'>
            <div className='depart__body__head__img'>
              <img src={DepartmentHead} alt="" />
            </div>
            <div className='depart__body__head__text'>
              <h3>Шашкин Александр Иванович</h3>
              <p>Доктор физико-математических наук, профессор, член президиума УМО классических университетов, академик International Academy of Refrigeration. Зам. председателя специализированного совета по защите кандидатских диссертаций (специальность – 01.02.04), член докторского совета (специальность – 01.02.04). Руководитель грантов РФФИ.</p>
            </div>
          </div>
          <div>
            <div>
              <h2 id="description">Описание работы кафедры</h2>        
              <p>Подготовка специалистов в области механики в Воронежском госуниверситете имеет глубокие корни и богатые традиции. У истоков Воронежской школы механиков стоял один из крупнейших советских ученых-механиков - Леонид Самуилович Лейбензон (1879-1951). Являясь прямым учеником Н.Е.Жуковского, он с 1913 по 1917 годы был профессором старейшего Юрьевского университета, на базе которого и был образован в 1918 году Воронежский государственный университет.</p>
            </div>
            <h2 id="employees">Сотрудники</h2>
            <div className='depart__body__employees'>
              {!loading && ( 
                employees.map((e) => {if (e.departments.some(department => department.id === Number(id_department))) 
                  return (<EmployeeCard 
                    key={e.id} 
                    img={noname} 
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
