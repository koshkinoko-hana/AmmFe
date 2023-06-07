import Header from '~/client/components/pageHeader'
import React, { useEffect } from 'react'
import { ClientRoutes } from '~/common/types/routes'
import { PathKey } from '~/client/components/pageHeader/types'
import './departmentPage.scss'
import DepartmentHead from '~/assets/Shashkin.png'
import noname from '~/assets/noname.svg'
import { Link, useParams } from 'react-router-dom'
import { Compass, Letter, PhoneBig } from '~/common/icons'
import { useSelector } from 'react-redux'
import { getEmployeeLoading } from '~/client/ducks/selectors/employee'
import { fetchEmployeeAction, fetchEmployeeListAction } from '~/client/ducks/actions/employee'
import EmployeeCard from './components/EmployeeCard'
import HeadDepartmentCard from './components/HeadDepartmentCard'
import { fetchDepartmentListAction } from '~/client/ducks/actions/department'
import { useAppDispatch, useAppSelector } from '~/common/store'

const DepartmentPage: React.FC = () => {
  const { id: id_department } = useParams()
  const { employees } = useAppSelector(state => state.client.employee)
  const headDepart = useAppSelector(state => state.client.employee.current)
  const { departments} = useAppSelector(state => state.client.department)
  const dispatch = useAppDispatch()
  //  const [headDepart, setHeadDepart ] = useState<Employee>()
  const loading = useSelector(getEmployeeLoading)

  useEffect(() => {
    Promise.all([
      dispatch(fetchEmployeeListAction()),
      dispatch(fetchDepartmentListAction()),
    ]).then(() => {
      if(id_department)
      {
        const employee = employees.find(
          (e) => (e.departments.some(department => department.id === Number(id_department)) && e.positions.some(id_position => id_position.id === 1))
        )
        if( employee && employee.id ){
          dispatch(fetchEmployeeAction( { id: employee.id } ))
        }
      }
    })
  }, [])

  if(departments){
    console.log('🚀 ~ file: index.tsx:36 ~ departments:',Number(id_department))
  }
  
  return (
    <>
      <div>
        <Header 
          header={departments.at(Number(id_department)-1)?.name || ''} 
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
          <HeadDepartmentCard img={DepartmentHead} name={`${headDepart?.lastName} ${headDepart?.firstName} ${headDepart?.middleName}`} descripton={headDepart?.description || ''} /> 
          <div>
            <div>
              <h2 id="description">Описание работы кафедры</h2>        
              <p>{departments.at(Number(id_department)-1)?.description || ''}</p>
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
