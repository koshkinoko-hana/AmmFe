import * as React from 'react'

import Header from '~/client/components/pageHeader'
import DepartmentCard from '~/client/components/DepartmentCard'
import { getDepartments } from '~/client/ducks/selectors/department'
import { fetchDepartmentListAction } from '~/client/ducks/actions/department'
import { PathKey } from '~/client/components/pageHeader/types'
import { ClientRoutes } from '~/common/types/routes'

import { cards } from './constants'
import './departmentPage.scss'
import { useAppDispatch, useAppSelector } from '~/common/store'

const DepartmentPage: React.FC = () => {
  const departments = useAppSelector(getDepartments)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchDepartmentListAction())
  }, [])
  console.log('🚀 ~ file: index.tsx:13 ~ link:', departments)

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
        ))}      
      </div>
    </>
  )

}
export default DepartmentPage
