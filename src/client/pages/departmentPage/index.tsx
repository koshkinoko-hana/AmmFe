import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'
import * as React from 'react'
import { cards } from './constants'
import DepartmentCard from '~/client/components/DepartmentCard'
import './departmentPage.scss'

const DepartmentPage: React.FC = () => {
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
        {cards.map((card, index) => (<DepartmentCard key={index} {...card} />)) }
      </div>
    </>
  )

}
export default DepartmentPage