import React, { FC } from 'react'
import { Props } from './types'

export const CurvedArrow: FC<Props> = ({ onClick }) => {
  return (
    <div className="svg-icon" onClick={onClick}>
      <svg viewBox="150 250 200 350" height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <path
          id="path5"
          d="m 130.838,381.118 c 1.125,28.749 5.277,54.82 12.695,78.018 7.205,22.53 18.847,40.222 36.812,
          53.747 52.018,39.16 153.369,16.572 153.369,16.572 l -4.632,-32.843 72.918,42.778
          -58.597,58.775 -3.85,-27.303 c 0,0 -100.347,18.529 -163.905,-34.881 -37.659,-31.646 -53.293,
          -84.021 -51.593,-153.962 0.266,-0.247 4.728,-0.908 6.783,-0.901 z"/>
      </svg>
    </div>
  )
}
