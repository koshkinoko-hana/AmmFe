import React, { FC } from 'react'
import { Props } from './types'
import './Pagination.scss'
import { PaginateLeft } from '~/common/icons/PaginateLeft'
import { PaginateRight } from '~/common/icons/PaginateRight'

export const Pagination: FC<Props> = ({total, offset, setOffset, limit}) => {
  return (
    <div className='pagination'>
      <div className="pagination__btn" onClick={() => setOffset(offset - limit > 0 ? offset - limit : 0)}>
        <PaginateLeft />
      </div>
      {offset - limit * 3 >= 0 && 
        <>
          <span className={'pagination__btn'} onClick={() => setOffset(0)}>{1}</span>
          {offset - limit * 4 >= 0 && <span className={'pagination__btn'}>...</span>}
        </>
      }
      {(new Array(Math.ceil(total / limit))).fill(0).map((_, i) => {
        const pagesCount = Math.ceil(offset / limit)
        return (
          (pagesCount < 3 && i < 4) 
        || (i >= pagesCount - 2 && i <= pagesCount) 
        || i === pagesCount + 1 ? <span
              key={i}
              className={'pagination__btn' + (offset === limit * i ? ' pagination__btn--active' : '')}
              onClick={() => setOffset(limit * i)}>{i + 1}
            </span> : ''
        )})}
      {offset + limit * 2 <= total && 
        <>
          {offset + limit * 3 <= total && <span className={'pagination__btn'}>...</span>}
          <span className={'pagination__btn'} onClick={() => setOffset(total - limit)}>{Math.ceil(total / limit)}</span>
        </>
      }
      <div className="pagination__btn" onClick={() => setOffset(offset + limit < total ? offset + limit : offset)}>
        <PaginateRight />
      </div>
    </div>
  )
}
