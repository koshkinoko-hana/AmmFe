export interface Props {
  header: string
  description?: string
  path: pathSet
}

export enum PathKey {
  NEWS='Новости',
  FAQ='Вопрос декану',
  DEPARTMENTS='Кафедры',
  DIRECTIONS='Направления'
}

export type pathSet = Partial<Record<string, string>>;
