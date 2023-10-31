import { Role } from '@admin/ducks/types/user'


export interface MeState {
  loggedIn: boolean
  roles: Role[]
  loading: boolean
}

export type LoginRequestPayload = {
  login: string
  password: string
}

export type LoginSuccessPayload = {
  token: string
  roles: Role[]
}

export type LoginResponse = {
  authToken: string
  role: Role
}
