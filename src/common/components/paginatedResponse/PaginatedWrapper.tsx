import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { store } from '~/common/store'
import { PaginatedResponse } from '~/common/types/general'


interface Props<T> {
  selector: (state: typeof store) => PaginatedResponse<T> & {loading: boolean}
}

function PaginatedWrapper<T>(props: PropsWithChildren<Props<T>>) {

  const {total, loading} = useSelector(props.selector)

  return (
    <div>
      {loading ? (
        'loading'
      ) : (
        <>
          {props.children}
          Всего: {total}
        </>
      )}
    </div>
  )
}

export default PaginatedWrapper
