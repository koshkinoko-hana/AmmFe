import './ArrayInput.scss'
import React, { useState } from 'react'
import { Props } from './types'

const ArrayInput: React.FC<Props> = ({label, values, setValues, pattern}) => {

  const [value, setValue] = useState('')

  const handleDelete = (valueToDelete: string) => {
    console.log(valueToDelete)
    const filteredValues = values.filter(value => value !== valueToDelete)
    console.log(filteredValues == values)
    setValues(filteredValues)
  }

  const handleAdd = () => {
    const extendedValues = [...values, value]
    console.log(extendedValues)
    setValues(extendedValues)
  }

  return (
    <div className="input">
      <p className='p3'>{label}</p>
      <div className="input_container">
        <input
          type="text"
          value={value}
          pattern={pattern}
          onChange={(e) => setValue(e.target.value)} />
        <div className="btn" onClick={handleAdd}>
          <span>+</span>
        </div>
      </div>
      {values.length ? 
        <ul className="values">
          {values.map((value, i) => (
            <li className="values__item" key={i}>
              <p>{value}</p>
              <div className="btn" onClick={() => handleDelete(value)}>
                <span>x</span>
              </div>
            </li>
          ))}
        </ul>
        : ''}
    </div>
  )
}

export default ArrayInput
