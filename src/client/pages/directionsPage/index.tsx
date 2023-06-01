import './directionsPage.scss'
import React, { useEffect, useState } from 'react'
import Header from '~/client/components/pageHeader'
import { PathKey } from '~/client/components/pageHeader/types'
import { fetchDirectionListAction } from '~/client/ducks/actions/direction'
import { useAppDispatch, useAppSelector } from '~/common/store'
import { ClientRoutes } from '~/common/types/routes'
import DirectionCard from '@client/components/DirectionCard'
import departmentMAsk1 from '../../../assets/depIcon-red01MaskBlack.png'
import departmentMAsk2 from '../../../assets/depIcon-blue01Mask.png'
import departmentMAsk3 from '../../../assets/depIcon-yellow01.png'
import departmentMAsk4 from '../../../assets/depIcon-red02.png'
import departmentMAsk5 from '../../../assets/depIcon-blue02.png'
import departmentMAsk6 from '../../../assets/depIcon-yellow02.png'
import departmentMAsk7 from '../../../assets/depIcon-red03.png'
import departmentMAsk8 from '../../../assets/depIcon-blue03.png'
import departmentMAsk9 from '../../../assets/depIcon-yellow03.png'

const Directions: React.FC = () => {

  const dispatch = useAppDispatch()
  const directions = useAppSelector(state => state.client.direction.directions)

  const undergraduateDirections = directions.filter(direction => direction.type === 'Бакалавриат')
  const magistracyDirections = directions.filter(direction => direction.type === 'Магистратура')
  const militaryDirections = directions.filter(direction => direction.type === 'Учеюный военный центр')

  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchDirectionListAction())
  }, [])

  useEffect(() => {
    console.log(undergraduateDirections.length, magistracyDirections.length, activeCard)
  }, [activeCard])

  function getBackgroundcolor(i: number) {
    const colors = ['#F9E7E6', '#E5F7FE', '#FDFAF0']
    return colors[i % 3]
  }

  function getImg(i: number) {
    const images = [departmentMAsk1, departmentMAsk2, departmentMAsk3, departmentMAsk4, departmentMAsk5, departmentMAsk6, departmentMAsk7, departmentMAsk8, departmentMAsk9]
    return images[i % 9]
  }

  return (
    <div className="client__main">
      <Header
        header={'Направления'} 
        description={'Здесь вы можете узнать информацию о направлениях факультета ПММ'} 
        path={{
          [PathKey.DIRECTIONS]: ClientRoutes.directions
        }}
      />
      <div className="directions_container">
        {undergraduateDirections.length ? <>
          <h3 className='directions_title'>Направления бакалавриата</h3>
          <ul className='directions_list'>
            {undergraduateDirections.map((direction, i) => (
              <DirectionCard 
                key={direction.id}
                backgroundColor={getBackgroundcolor(i)} 
                img={getImg(i)} 
                direction={direction} 
                isActive={i === activeCard} 
                onClick={() => setActiveCard(i === activeCard ? null : i)} 
              />
            ))}
          </ul>
        </> : <></>}
        {magistracyDirections.length ? <>
          <h3 className='directions_title'>Направления магистратуры</h3>
          <ul className='directions_list'>
            {magistracyDirections.map((direction, i) => (
              <DirectionCard 
                key={direction.id}
                backgroundColor={getBackgroundcolor(i)} 
                img={getImg(i)} 
                direction={direction} 
                isActive={undergraduateDirections.length + i === activeCard} 
                onClick={() => setActiveCard(undergraduateDirections.length + i === activeCard ? null : undergraduateDirections.length + i)} 
              />
            ))}
          </ul>
        </> : <></>}
        {militaryDirections.length ? <>
          <h3 className='directions_title'>Учебный военный центр ВГУ</h3>
          <ul className='directions_list'>
            {militaryDirections.map((direction, i) => (
              <DirectionCard 
                key={direction.id}
                backgroundColor={getBackgroundcolor(i)} 
                img={getImg(i)} 
                direction={direction} 
                isActive={undergraduateDirections.length + magistracyDirections.length + i === activeCard}
                onClick={() => setActiveCard(undergraduateDirections.length + magistracyDirections.length + i === activeCard ? null : undergraduateDirections.length + magistracyDirections.length + i)} 
              />
            ))}
          </ul>
        </> : <></>}
      </div>
    </div>
  )
}

export default Directions
