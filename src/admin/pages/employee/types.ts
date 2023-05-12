import { Option } from '@common/components/select/types'

export interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  description: string
  positions: Option[]
  departments: Option[]
}
