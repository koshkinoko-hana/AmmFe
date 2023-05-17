import {ClientRoutes} from '@common/types/routes'

export interface Props {
  header: string,
  description?: string,
  path: pathSet,
  
}

export enum PathKey {
  NEWS='Новости'
}

export type pathSet = Record<PathKey, ClientRoutes>;