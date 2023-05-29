import './galleryPage.scss'
import React, { useEffect } from 'react'
import Header from '~/client/components/pageHeader'
import { ClientRoutes } from '~/common/types/routes'
import { Pagination } from '~/client/components/Pagination'
import { PathKey } from '~/client/components/pageHeader/types'
import { useAppSelector, useAppDispatch } from '~/common/store'
import { fetchGalleryListAction } from '~/client/ducks/actions/gallery'
import GalleryCard from './components/GalleryCard'

const limit = 8

const Gallery: React.FC = () => {
  const [offset, setOffset] = React.useState(0)

  const {photos} = useAppSelector(state => state.client.gallery)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGalleryListAction(offset))
  }, [offset])

  useEffect(() => {
    console.log(photos)
  }, [photos])

  return (
    <div className="client__main">
      <Header
        header={'Галерея'} 
        description={'Здесь вы можете увидеть важные, забавные, интересные моменты жизни нашего факультета. Загляните сюда - может быть и вы попадёте в его историю?'} 
        path={{
          [PathKey.NEWS]: ClientRoutes.gallery
        }}
      />
      <div className="gallery-container">
        {photos.map(photo => (
          <GalleryCard key={photo.id} title={photo.title || ''} id={photo.id} path={photo.path} createdAt={photo.createdAt} size={'small'}/>
        ))}
      </div>
      <Pagination offset={offset} setOffset={setOffset} limit={limit} total={1} />
    </div>
  )
}

export default Gallery