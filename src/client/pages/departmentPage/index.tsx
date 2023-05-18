import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'
import * as React from 'react'
import './departmentPage.scss'
import { cards } from './constants'
import DepartmentCard from '~/client/components/DepartmentCard'

const DepartmentPage: React.FC = () => {
  console.log( ' ')
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