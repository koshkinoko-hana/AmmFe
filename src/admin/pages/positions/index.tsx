import './positions.scss'
import { fetchPositionListAction, setCurrentPositionAction } from '@admin/ducks/actions/position'
import { getPositionLoading, getPositions } from '@admin/ducks/selectors/position'
import { Position } from '@admin/ducks/types/position'
import ListItem from './listItem'
import { openDialogueAction } from '@common/ducks/slice/dialogue'
import { DialogueOption } from '@common/ducks/types/dialogueOption'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '~/common/components/list'

const Positions: React.FC = () => {
  const dispatch = useDispatch()
  const positions = useSelector(getPositions)
  const loading = useSelector(getPositionLoading)

  useEffect(() => {
    dispatch(fetchPositionListAction())
  }, [])

  const createPosition = useCallback(() => {
    dispatch(openDialogueAction(DialogueOption.ADMIN_POSITION))
  }, [])

  const updatePosition = useCallback((p: Position) => {
    dispatch(setCurrentPositionAction(p))
    dispatch(openDialogueAction(DialogueOption.ADMIN_POSITION))
  }, [])

  return (
    loading ?
      <>loading</> :
      positions &&
      <div className="container positions">
        <div className="positions__header">
          <h1>Должности</h1>
          <button onClick={createPosition}>Новая</button>
        </div>
        <List itemsRender={[
          <ListItem key="header" bold={true}/>,
          ...positions.map((p) => <ListItem position={p} key={p.id} onClick={updatePosition}/>)
        ]}/>
      </div>
  )
}

export default Positions
