import './index.scss'
import React, { useMemo } from 'react'

interface Props {
  itemsRender: React.ReactNode[]
}

const List: React.FC<Props> = ({itemsRender}: Props) => {

  const items = useMemo(() => {
    const list = []
    for (let i = 0; i< itemsRender.length - 1; i++) {
      list.push(<div className="list-item" key={i}>{itemsRender[i]}</div>)
    }
    list.push(<div className="list-item--last" key="last">{itemsRender[itemsRender.length - 1]}</div>)
    return list
  }, [itemsRender])

  return (
    <div className="list">
      {items}
    </div>
  )
}

export default List
