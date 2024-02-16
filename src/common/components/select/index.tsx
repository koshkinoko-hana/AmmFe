import './select.scss'
import { Option } from '@common/components/select/types'
import React, {FC} from 'react'

import SelectInput, { SingleValue } from 'react-select'
import { MultiValue } from 'react-select/dist/declarations/src/types'

type Props = {
  label?: string
  error?: string
  classList?: string
  isMulti?: boolean
  value?:  Option
  valueMulti?:  Option[]
  options: Option[]
  onChange?: (value: Option) => void
  onChangeMulti?: (values: Option[]) => void
  required?: boolean
}

const Select: FC<Props> = ({
  label,
  classList='',
  isMulti,
  options, //опции для выбора
  value,
  valueMulti,
  onChange,
  onChangeMulti,
  required
}: Props) => {

  const onChangeCLick = (values: MultiValue<Option> | SingleValue<Option>) => {
    if(isMulti) {
      onChangeMulti && onChangeMulti(values as Option[])
    } else {
      onChange && onChange(values as Option)
    }
  }



  return (
    <>
      {
        label &&
          <p className="p3-label">{label}</p>
      }
      <div className="input__container">

        {
          required &&
          <p className={'input__error'}>Обязательное поле</p>
        }
        <SelectInput
          className={`${required ? 'is-invalid' : ''} ${classList}`}
          isMulti={isMulti}
          options={options}
          value={isMulti ? valueMulti : value}
          onChange={onChangeCLick}
        />
      </div>
    </>
  )
}

export default Select
