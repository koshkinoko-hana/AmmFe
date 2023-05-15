import './icon.scss'
import { Props } from '@common/icons/types'
import React, { FC } from 'react'

export const PaginateRight: FC<Props> = (props) => {

  return (
    <div className="svg-icon" onClick={props.onClick}>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.2002L4.6 4.9502L1 8.7002" stroke="#292929" strokeWidth="1.5"/>
      </svg>
    </div>
  )
}
