import './directions.scss'
import { fetchDirectionListAction } from '@admin/ducks/actions/direction'
import { getDirectionLoading, getDirections } from '@admin/ducks/selectors/direction'
import ListItem from '@admin/pages/directions/listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '~/common/components/list'

const Directions: React.FC = () => {
  const dispatch = useDispatch()
  const directions = useSelector(getDirections)
  const loading = useSelector(getDirectionLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchDirectionListAction())
  }, [])

  const createDirection = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.directions}/create`)
  }

  const updateDirection = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.directions}/${id}`)
  } 

  return (
    loading ? (
      <>loading</>
    ) : (
      directions && (
        <div className="container employees">
          <div className="employees__header">
            <h1>Направления</h1>
            <button onClick={createDirection}>Новая</button>
          </div>
          <List
            itemsRender={[
              <ListItem key="header" bold={true} />,
              directions.map((e) => {
                {
                  return (
                    <ListItem
                      direction={e}
                      key={e.id} 
                      onClick={() => updateDirection(e.id)}
                    />
                  )
                }
              }),
            ]}
          />
        </div>
      )
    )
  )
}
export default Directions

