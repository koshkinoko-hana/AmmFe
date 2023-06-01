
export interface NewsLight {
  slug: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface News extends NewsLight {
  photoId?: number
  photoPath?: string
  description?: string
  article?: string
}

export interface NewsNew {
  slug: string
  name: string
  description?: string
  article?: string
  photoId?: number
}


export interface NewsState {
  loading: boolean
  current?: News
  newsList: NewsLight[]
}
