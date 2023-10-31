export interface GalleryPhoto {
    id: number
    title?: string
    path: string
}

export interface CreateGalleryPhotoRequest {
    title?: string
    path: string
}

export interface GalleryState {
    loading: boolean
    total: number
    photo: GalleryPhoto | null
    photos: GalleryPhoto[]
  }
