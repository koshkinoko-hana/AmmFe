import './galleryPage.scss'
import React, { useEffect } from 'react'
import Header from '~/client/components/pageHeader'
import { ClientRoutes } from '~/common/types/routes'
import { Pagination } from '~/common/components/Pagination'
import { PathKey } from '~/client/components/pageHeader/types'
import { useAppSelector, useAppDispatch } from '~/common/store'
import { fetchGalleryListAction } from '~/client/ducks/actions/gallery'
import GalleryCard from './components/GalleryCard'

const limit = 8

const Gallery: React.FC = () => {
  const [offset, setOffset] = React.useState(0)

  const {photos, total} = useAppSelector(state => state.client.gallery)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGalleryListAction(offset))
  }, [offset])

  return (
    <div className="client__main">
      <Header
        header={'Галерея'} 
        description={'Здесь вы можете увидеть важные, забавные, интересные моменты жизни нашего факультета. Загляните сюда - может быть и вы попадёте в его историю?'} 
        path={{
          [PathKey.NEWS]: ClientRoutes.gallery
        }}
      />
      <div className="gallery">
        {photos.map((photo, i) => (
          <GalleryCard key={photo.id} title={photo.title || ''} id={photo.id} path={photo.path} createdAt={photo.createdAt} size={i === 0 ? 'big' : 'small'}/>
        ))}
      </div>
      <Pagination offset={offset} setOffset={setOffset} limit={limit} total={total} />
    </div>
  )
}

export default Gallery
