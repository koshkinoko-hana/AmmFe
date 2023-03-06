import './dialogue.scss'
import dialogueOptions from '@common/components/dialogue/options'
import { getDialogue, getOpened } from '@common/ducks/selectors/dialogue'
import { closeDialogueAction } from '@common/ducks/slice/dialogue'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dialogue: React.FC = () => {
  const opened = useSelector(getOpened)
  const dialogueType = useSelector(getDialogue)
  const dispatch = useDispatch()

  const close = useCallback(() => {
    dispatch(closeDialogueAction())
    if(dialogueType) dispatch(dialogueOptions[dialogueType].onCloseAction())
  }, [])

  if(!opened || !dialogueType) return null

  return (
    <>
      <div className="background">
      </div>
      <div className="dialogue">
        <div className="dialogue__content">
          <h2 className="dialogue__header">{dialogueOptions[dialogueType].header}</h2>
          <button className="dialogue__close" onClick={close}>x</button>
          {dialogueOptions[dialogueType].body}
        </div>
      </div>
    </>
  )
}

export default Dialogue
