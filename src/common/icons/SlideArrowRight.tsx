import './icon.scss'
import { Props } from '@common/icons/types'
import React, { FC } from 'react'

export const SlideArrowRight: FC<Props> = (props) => {
  return (
    <div className="svg-icon" onClick={props.onClick}>
      <svg className="svg-icon icon" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.9999 33.8917L30.9829 27.8917L24.9999 21.8917" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        <rect x="1.49994" y="1.39172" width="52" height="52" rx="26" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
  )
}
