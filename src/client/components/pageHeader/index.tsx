import React from 'react'
import { Props } from '@client/components/pageHeader/types'
import './pageHeader.scss'
import { Link } from 'react-router-dom'
import { ClientRoutes } from '~/common/types/routes'
import { Home } from '~/common/icons/Home'
import { NavItems } from './helpers'


const headers = {
  'Новости': 'blue40',
  'Контакты': 'yellow40',
  'Кафедры': 'red40', 
  'Вопрос декану': 'yellow40', 
  'Галерея': 'red40',
  'Направления': 'blue40'
}

const PageHeader: React.FC<Props> = ({path, header, description}) => {
  return (
    <div className="page-header">
      <ul className="page-header__links">
        <li className="page-header__links-item">
          <Link to={`/${ClientRoutes.home}`}>
            <Home/>
          </Link>
        </li>
        <NavItems path={path}/>
      </ul>
      <h1 className={`page-header__title ${Object.keys(headers).includes(header) ? `page-header__title--underlined page-header__title--underlined_${headers[header as keyof typeof headers]}` : ''}`}>{header}</h1>
      {description && <p className="page-header__desc">{description}</p>}
    </div>
  )
}

export default PageHeader
