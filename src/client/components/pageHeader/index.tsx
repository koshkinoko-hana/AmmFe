import React from 'react'
import { Props } from '@client/components/pageHeader/types'
import './pageHeader.scss'
import { Link } from 'react-router-dom'
import { ClientRoutes } from '~/common/types/routes'
import { Home } from '~/common/icons/Home'
import { NavItems } from './helpers'


const headers = {
  'Новости': 'blue40', 
  'Кафедры': 'red40', 
  'Вопрос декану': 'yellow40', 
  'Галерея': 'red40'
}

const PageHeader: React.FC<Props> = ({path, header, description}) => {

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
      <h1 className={`news_header__title ${Object.keys(headers).includes(header) ? `news_header__title--underlined news_header__title--underlined_${headers[header as keyof typeof headers]}` : ''}`}>{header}</h1>
      {description && <p className="news_header__desc">{description}</p>}
    </div>
  )
}

export default PageHeader
