import { ClientRoutes } from '@common/types/routes'

export interface Props {
  header: string
  description?: string
  path: pathSet  
}

export enum PathKey {
  NEWS='Новости',
  FAQ='Вопрос декану'
}

export type pathSet = Partial<Record<PathKey, ClientRoutes>>;