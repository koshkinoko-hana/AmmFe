export type Response = {
    data: GalleryCard[],
    total: number,
    offset: number,
    limit: number,
}


export type GalleryCard = {
    id: number
    title?: string
    createdAt: string
    path: string
}

export type GalleryState = {
    loading: boolean,
    total: number,
    photos: GalleryCard[],
}