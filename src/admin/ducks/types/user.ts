export enum Role {
  ADMIN = 'admin',
  NEWS_MODERATOR = 'news_moderator',
  SCHEDULE_MODERATOR = 'schedule_moderator',
  CONTENT_MODERATOR = 'content_moderator',
  TEACHER_MODERATOR = 'teacher_moderator',
  COMPANY_MODERATOR = 'company_moderator',
}


export interface UserLight {
  id?: number
  login: string
  fullName?: string
  roles: Role[]
}


export interface User extends UserLight {
  companyId?: number
  companyName?: string
  companyDescription?: string
}

export interface UserState {
  users: UserLight[]
  current?: User
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
