import './icon.scss'
import { Props } from '@common/icons/types'
import React, { FC } from 'react'

export const GoToPrevPage: FC<Props> = (props) => {
  return (
    <div className="svg-icon" onClick={props.onClick}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5.5L4.49261 1V3.5C10.4565 3.5 11.1445 8.339 10.9789 11C10.7284 9.6575 10.6122 7.5 4.49261 7.5V10L1 5.5Z" stroke="#207EED" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}