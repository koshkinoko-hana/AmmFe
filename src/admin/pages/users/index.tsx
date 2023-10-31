import './adminUsers.scss'
import Dialogue from '@admin/components/Dialogue'
import { deleteEmployeeAction, fetchEmployeeListAction } from '@admin/ducks/actions/employee'
import { getUserLoading, getUsers } from '@admin/ducks/selectors/user'
import ListItem from '@admin/pages/users/listItem'
import { AdminRoutes } from '@common/types/routes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '~/common/components/list'

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector(getUsers)
  const loading = useSelector(getUserLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchEmployeeListAction())
  }, [])

  const createUser = () => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.users}/create`)
  }

  const updateUser = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.users}/${id}`)
  }

  const deleteUser = (id: number) => {
    dispatch(deleteEmployeeAction({ id }))
    users.filter(u => u.id !== id)
  }

  return (
    loading ? (<>Загрузка...</>) : (
      <div className="container admin-users">
        <div className="admin-users__header">
          <h1>Пользователи админпанели</h1>
          <div className="admin-users__header__btn">
            <button
              onClick={createUser}
            >Новый
            </button>
          </div>
        </div>
        <List
          itemsRender={[
            <ListItem key="header" bold={true}/>,

            users.map((u) => {
              return (
                <ListItem
                  user={u}
                  key={u.id}
                  onClick={() => updateUser(u.id!)}
                  onDelete={() => deleteUser(u.id!)}
                />
              )
            }),
          ]}
        />
      </div>
    )
  )
}
export default Users

