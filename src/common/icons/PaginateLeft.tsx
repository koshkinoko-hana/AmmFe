import './icon.scss'
import { Props } from '@common/icons/types'
import React, { FC } from 'react'

export const PaginateLeft: FC<Props> = (props) => {

  return (
    <div className="svg-icon" onClick={props.onClick}>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1.2002L1.4 4.9502L5 8.7002" stroke="#292929" strokeWidth="1.5"/>
      </svg>
    </div>
  )
}
