import { reasons } from '@client/pages/mainPage/constants'
import { Reason } from '@client/pages/mainPage/types'
import React from 'react'

const ReasonsBlock: React.FC = () => {

  return (
    <div className="reasons-block">
      {reasons.map((reason: Reason, i: number) => (
        <div key={i}>
          <img className="icon" src={reason.icon}/>
          <h5 className="reasons-block__header">{reason.header}</h5>
          <p className="p2">{reason.text}</p>
        </div>
      ))}
    </div>
  )
}

export default ReasonsBlock
