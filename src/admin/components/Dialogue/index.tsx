import './index.scss'
import { DialogueProps } from './types'
import React from 'react'

const Dialogue: React.FC<DialogueProps> = ({
  message,
  messageBtn,
  onClick,
  onCancelClick,
  showCancel,
  header
}) => {

  return (
    <>
      <div className="background">
      </div>
      <div className="dialogue">
        <div className="dialogue__content">
          <h2 className="dialogue__header">{header}</h2>
          <button className="dialogue__close" onClick={close}>x</button>
          <p>{message}</p>
          <div className="buttons">
            <button className="button" onClick={onClick}>
              {messageBtn}
            </button>
            {
              showCancel &&
              <button className="button" onClick={onCancelClick}>Отмена</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dialogue
