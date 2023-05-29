import './newsPage.scss'
import React from 'react'
import Header from '~/client/components/pageHeader'
import { ClientRoutes } from '~/common/types/routes'
import { Pagination } from '~/client/components/Pagination'
import { PathKey } from '~/client/components/pageHeader/types'

const limit = 9

const Gallery: React.FC = () => {
  const [offset, setOffset] = React.useState(0)

  return (
    <div className="client__main">
      <Header
        header={'Кафедра матиматического и прикладного анализа '} 
        description={'Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления Новости факультета, события, мероприятия и объявления '} 
        path={{
          [PathKey.NEWS]: ClientRoutes.news
        }}
      />
      <div className="gallery-container">
        {}
      </div>
      <Pagination offset={offset} setOffset={setOffset} limit={limit} total={1} />
    </div>
  )
}

export default Gallery