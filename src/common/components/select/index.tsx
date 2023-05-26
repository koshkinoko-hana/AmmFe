import './textarea.scss'
import { Option } from '@common/components/select/types'
import {UseFormRegisterReturn} from 'react-hook-form/dist/types/form'
import React, {FC} from 'react'

import SelectInput, { SingleValue } from 'react-select'
import { MultiValue } from 'react-select/dist/declarations/src/types'

type Props = {
  label?: string
  error?: string
  register: UseFormRegisterReturn
  classList?: string
  isMulti?: boolean
  defaultValue: Option[]
  options: Option[]
  onChange: (values: MultiValue<Option> | SingleValue<Option>) => void
}

const Select: FC<Props> = ({
  label,
  error,
  register,
  classList='',
  isMulti,
  defaultValue,
  options, //опции для выбора
  onChange
}: Props) => {

  const onChangeCLick = (values: MultiValue<Option> | SingleValue<Option>) => {
    onChange(values)
  }

  return (
    <>
      {
        label &&
          <p className={'p3'}>{label}</p>
      }
      <div className="input__container">

        {
          error &&
          <p className={'input__error'}>{
            error === 'required' ?
              'Обязательное поле' :
              'error.message'
          } </p>
        }
        <SelectInput
          className={`${error ? 'is-invalid' : ''} ${classList}`}
          isMulti={isMulti}
          options={options}
          defaultValue={defaultValue}
          {...register}
          onChange={onChangeCLick}
        />
      </div>
    </>
  )
}

export default Select
