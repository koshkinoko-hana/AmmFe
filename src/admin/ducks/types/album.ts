import { GalleryPhoto } from '@admin/ducks/types/gallery'

export interface AlbumLight {
  id: number
  name: string
  description: string
  date: string
}

export interface Album extends AlbumLight {
  photos: GalleryPhoto[]
}

export interface AlbumState {
  loading: boolean
  total: number
  album: Album | null
  albums: AlbumLight[]
}

export interface CreateAlbumRequest {
  title: string,
  albumDate: Date,
  description: string,
  photosUploading: FormData[],
  photosLinks: string[],
  photosExistingIds: number[]
}