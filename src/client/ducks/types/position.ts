import { Option } from '@common/components/select/types'

export interface Position {
  id: number
  name: string
}

export interface PositionNew {
  name: string
}

export interface PositionState {
  positions: Position[]
  positionOptions: Option[]
  loading: boolean
  current?: Position
}
