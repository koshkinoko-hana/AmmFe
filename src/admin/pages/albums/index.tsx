import './album.scss'
import { getAlbumLoading, getAlbums, getAlbumTotal } from '@admin/ducks/selectors/album'
import ListItem from './listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPhotoListAction } from '~/admin/ducks/actions/gallery'
import { Pagination } from '~/common/components/Pagination'
import List from '~/common/components/list'

const Albums: React.FC = () => {

  const dispatch = useDispatch()
  const albums = useSelector(getAlbums)
  const loading = useSelector(getAlbumLoading)
  const total = useSelector(getAlbumTotal)
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
      albums ?
        <div className="container admin-gallery">
          <div className="admin-gallery__header">
            <h1>Альбомы</h1>
            <button onClick={createPhoto}>Новый</button>
          </div>
          <List itemsRender={[
            <ListItem key="header" bold={true}/>,
            ...albums.map(album => <ListItem key={album.id} album={album}/>)
          ]}/>
          <Pagination offset={offset} setOffset={setOffset} limit={10} total={total} />
        </div> 
        : <div>Альбомы отсутствуют</div>
  )
}

export default Albums
