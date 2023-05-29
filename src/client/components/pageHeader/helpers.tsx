import React, { FC } from 'react'
import { pathSet } from './types'
import { HeaderArrow } from '~/common/icons/HeaderArrow'
import { Link } from 'react-router-dom'

export const NavItems: FC<{path: pathSet}> = ({path}) => {
  const keys = Object.keys(path)
  let pathsTillCur = ''
  return <>
    {keys.map(key => {
      pathsTillCur += `/${path[key]}`
      return <li key={key} className="news_header_links__item">
        <HeaderArrow />
        <Link to={pathsTillCur}>
          <span>{key}</span>
        </Link>
      </li>
    })}
  </>
}