import React from 'react'
import { Props } from '@client/components/pageHeader/types'
import './pageHeader.scss'
import { Link } from 'react-router-dom'
import { ClientRoutes } from '~/common/types/routes'
import { Home } from '~/common/icons/Home'
import { NavItems } from './helpers'

const PageHeader: React.FC<Props> = ({path, header, description}) => {
  console.log(path)
  return (
    <div className="news_header">
      <ul className="news_header_links">
        <li className="news_header_links__item">
          <Link to={`/${ClientRoutes.home}`}>
            <Home/>
          </Link>
        </li>
        <NavItems path={path}/>
      </ul>
      <h1 className="news_header__title">{header}</h1>
      {description && <p className="news_header__desc">{description}</p>}
    </div>
  )
}

export default PageHeader
