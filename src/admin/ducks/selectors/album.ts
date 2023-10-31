import { RootState } from '~/common/store'

export const getAlbums = (state: RootState) => state.admin.album.albums
export const getAlbumLoading = (state: RootState) => state.admin.album.loading
export const getAlbumTotal = (state: RootState) => state.admin.album.total
