export type newsCard = {
    slug: string
    name: string
    description?: string
    createdAt: string
    photoPath?: string
    photoAlt?: string
}

export type newsDetails = {
    slug: string
    name: string
    description?: string
    article?: string
    createdAt: string
    photoPath?: string
    photoAlt?: string
}

export type NewsState = {
    loading: boolean,
    total: number
    news: newsCard[],
    newsPreview: newsCard[],
    details: newsDetails
}