import Header from '@client/components/pageHeader'
import { PathKey } from '@client/components/pageHeader/types'
import { ClientRoutes } from '@common/types/routes'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Map from './Map'

const Contacts: React.FC = () => {
  const navigate = useNavigate()

  const askDean = () => {
    navigate(`/${ClientRoutes.deanFaq}`)
  }

  return (
    <>
      <div>
        <Header
          header={PathKey.CONTACTS}
          description={''}
          path={{
            [PathKey.CONTACTS]: ClientRoutes.contacts
          }}
        />
      </div>
      <div className="contacts">
        <Map/>
        <div className="contacts--info-block">
          <div className="address">г. Воронеж, Университетская площадь, 1, корпус 1, каб. 209 (деканат)</div>
          Часы работы: 10:00 - 17:00
          <a href="tel:+7 (473) 220-82-66" className="context-link">+7 (473) 220-82-66</a>
          <a href="mailto:dean@amm.vsu.ru" className="context-link">dean@amm.vsu.ru</a>
          <button onClick={askDean}>Задать вопрос декану</button>
        </div>
      </div>
    </>
  )
}

export default Contacts
