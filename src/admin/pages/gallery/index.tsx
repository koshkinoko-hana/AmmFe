import './gallery.scss'
import ListItem from './listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPhotoListAction } from '~/admin/ducks/actions/gallery'
import { getPhotos, getPhotosLoading } from '~/admin/ducks/selectors/gallery'
import List from '~/common/components/list'

const Gallery: React.FC = () => {

  const dispatch = useDispatch()
  const photos = useSelector(getPhotos)
  const loading = useSelector(getPhotosLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPhotoListAction())
  }, [])

  const createPhoto = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.gallery}/create`)
  }

  console.log(photos)

  return (
    loading ?
      <div>loading</div> :
      photos ?
        <div className="container employees">
          <div className="employees__header">
            <h1>Галерея</h1>
            <button onClick={createPhoto}>Новая</button>
          </div>
          <List itemsRender={[
            <ListItem key="header" bold={true}/>,
            ...photos.map(photo => <ListItem key={photo.id} photo={photo}/>)
          ]}/>
        </div> 
        : <div>no photos</div>
  )
}

export default Gallery
