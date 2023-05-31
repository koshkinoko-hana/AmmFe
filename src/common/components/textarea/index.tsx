import './textarea.scss'
import {UseFormRegisterReturn} from 'react-hook-form/dist/types/form'
import React, {FC} from 'react'

type Props = {
  label?: string
  error?: string
  register: UseFormRegisterReturn
  classList?: string
  disabled?: boolean
}

const Textarea: FC<Props> = ({label, error, register, classList='', disabled}: Props) => {

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
              error === 'maxLength' ?
                'Длина превышает допустимое количество символов' :
                error === 'minLength' ?
                  'Недостаточно символов' :
                  'error.message'
          } </p>
        }
        <textarea
          rows={3}
          className={`${error ? 'is-invalid' : ''} ${classList}`}
          {...register}
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default Textarea
