import './icon.scss'
import { Props } from '@common/icons/types'
import React, { FC } from 'react'

export const SlideArrowLeft: FC<Props> = (props) => {

  return (
    <div className="svg-icon" onClick={props.onClick}>
      <svg className="svg-icon icon" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.9999 33.8917L24.0169 27.8917L29.9999 21.8917" stroke="#292929" strokeWidth="2" strokeLinecap="square"/>
        <rect x="-1" y="1" width="52" height="52" rx="26" transform="matrix(-1 0 0 1 52.4999 0.391724)" stroke="#292929" strokeWidth="2"/>
      </svg>
    </div>
  )
}
