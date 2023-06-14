import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import React from 'react'
import './contacts.scss'

const ContactsMap: React.FC = () => {
  return (
    <YMaps>
      <Map defaultState={{center: [51.659060, 39.200925], zoom: 14}} className='contacts--map'>
        <Placemark
          geometry={[51.656680, 39.206423]}
          options={{
            iconColor: '#5DA0F0',
            hasBalloon: true,
            balloonContent: 'Главный корпус ВГУ, Университетская площадь, 1'
          }}
        />
      </Map>
    </YMaps>
  )
}

export default ContactsMap
