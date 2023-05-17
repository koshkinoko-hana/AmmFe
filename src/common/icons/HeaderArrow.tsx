import React, {FC} from 'react'
import {Props} from './types'

export const HeaderArrow: FC<Props> = ({onClick}) => {
  return (
    <div className="svg-icon" onClick={onClick}>
      <svg width="4" height="6" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.957107 0.200195L0.25 0.907302L2.37132 3.02862L0.25 5.14994L0.957107 5.85705L3.78553 3.02862L0.957107 0.200195Z" fill="#9C9C9C"/>
      </svg>
    </div>
  )
}
  