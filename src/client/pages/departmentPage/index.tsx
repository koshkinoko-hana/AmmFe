import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'
import * as React from 'react'
import { cards } from './constants'
import DepartmentCard from '~/client/components/DepartmentCard'
import './departmentPage.scss'
import { useSelector } from 'react-redux'
import { getDepartments } from '~/client/ducks/selectors/department'

const DepartmentPage: React.FC = () => {
  const departments = useSelector(getDepartments)
  return (
    <>
      <div>
        <Header 
          header={'Кафедры'} 
          description={'Здесь вы можете узнать информацию о кафедрах факультета ПММ'} 
          path={{
            [PathKey.DEPARTMENTS]: ClientRoutes.departments
          }}
        />
      </div>
      <div className='department-container'>
        {departments.map((e, i) => (
          <DepartmentCard
            key={e.id}
            title={e.name}
            link={e.id.toString()}
            eId={cards[i]}
          />
        ))}      </div>
    </>
  )

}
export default DepartmentPage