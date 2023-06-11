import './gallery.scss'
import ListItem from './listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPhotoListAction } from '~/admin/ducks/actions/gallery'
import { getPhotos, getPhotosLoading, getPhotosTotal } from '~/admin/ducks/selectors/gallery'
import { Pagination } from '~/common/components/Pagination'
import List from '~/common/components/list'

const Gallery: React.FC = () => {

  const dispatch = useDispatch()
  const photos = useSelector(getPhotos)
  const total = useSelector(getPhotosTotal)
  const loading = useSelector(getPhotosLoading)
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(fetchPhotoListAction({offset, limit: 10}))
  }, [offset])

  const createPhoto = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.gallery}/create`)
  }

  return (
    loading ?
      <div>loading</div> :
      photos ?
        <div className="container gallery">
          <div className="gallery__header">
            <h1>Галерея</h1>
            <button onClick={createPhoto}>Новая</button>
          </div>
          <List itemsRender={[
            <ListItem key="header" bold={true}/>,
            ...photos.map(photo => <ListItem key={photo.id} photo={photo}/>)
          ]}/>
          <Pagination offset={offset} setOffset={setOffset} limit={10} total={total} />
        </div> 
        : <div>no photos</div>
  )
}

export default Gallery
