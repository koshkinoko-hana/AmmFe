export interface GalleryPhoto {
    id: number
    title?: string
    path: string
}
export interface GalleryPhotoListItem extends GalleryPhoto {
    createdAt: Date
}

export interface GalleryState {
    loading: boolean
    total: number
    photo: GalleryPhoto | null
    photos: GalleryPhotoListItem[]
  }