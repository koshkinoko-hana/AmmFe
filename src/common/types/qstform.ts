import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
    name: string
    surname: string
    middlename: string
    email: string
    text: string
  }
  
export interface IPageInput {
    register: UseFormRegister<IInputs>
    errors: FieldErrors<IInputs>
  }
  