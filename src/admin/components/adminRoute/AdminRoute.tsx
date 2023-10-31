import './adminRoute.scss'
import Header from '@admin/components/header'
import Menu from '@admin/components/menu'
import { clearErrorAction } from '@admin/ducks/actions/apiError'
import { showDeleteToastAction, showSaveToastAction, showUpdateToastAction } from '@admin/ducks/actions/app'
import { fetchMeAction, logoutAction } from '@admin/ducks/actions/me'
import { getError, getErrorMessage } from '@admin/ducks/selectors/apiError'
import { getShowDeleteToast, getShowSaveToast, getShowUpdateToast } from '@admin/ducks/selectors/app'
import { getMeLoggedIn, getMeRoles } from '@admin/ducks/selectors/me'
import { ErrorCode } from '@admin/ducks/types/apiError'
import { Role } from '@admin/ducks/types/user'
import Dialogue from '@common/components/dialogue'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AdminRoutes, CommonRoutes } from '~/common/types/routes'
import { setToken, token } from '~/common/utils/token'
import 'react-toastify/dist/ReactToastify.css'

const AdminRoute: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const roles: Role[] = useSelector(getMeRoles)
  const loggedIn: boolean = useSelector(getMeLoggedIn)
  const error = useSelector(getError)
  const errorMessage = useSelector(getErrorMessage)
  const showSaveToast = useSelector(getShowSaveToast)
  const showUpdateToast = useSelector(getShowUpdateToast)
  const showDeleteToast = useSelector(getShowDeleteToast)

  useEffect(() => {
    if(error) {
      switch (error) {
      case ErrorCode.BAD_REQUEST:
      case ErrorCode.CONFLICT:
        notifyError(errorMessage)
        break
      case ErrorCode.BACKEND_ERROR:
        notifyError()
        break
      case ErrorCode.FORBIDDEN:
      case ErrorCode.UNAUTHORIZED:
        notifyError('Время сессии истекло')
        setToken('')
        dispatch(logoutAction())
        navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
        break
        return
      case ErrorCode.NOT_FOUND:
        notifyError('Страница не найдена')
        navigate(`/${AdminRoutes.root}/${CommonRoutes.notFound}`)
        break
      }
      dispatch(clearErrorAction())
    }
  }, [error])

  useEffect(() => {
    if(showSaveToast) {
      toast.info('Успешно сохранено')
      dispatch(showSaveToastAction())
    }
  }, [showSaveToast])

  useEffect(() => {
    if(showUpdateToast) {
      toast.info('Успешно обновлено')
      dispatch(showUpdateToastAction())
    }
  }, [showUpdateToast])

  useEffect(() => {
    if(showDeleteToast) {
      toast.info('Успешно удалено')
      dispatch(showDeleteToastAction())
    }
  }, [showDeleteToast])

  const notifyError = (message?: string) => toast.error(message || 'Возникла ошибка, попробуйте позже')

  useEffect(() => {
    if (!token()) {
      navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
    }
    else if (!roles.length) {
      dispatch(fetchMeAction())
    }
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      navigate(`/${AdminRoutes.root}/${AdminRoutes.login}`)
    }
  }, [loggedIn])

  
  return (
    <>
      <Header/>
      <Menu/>
      <Dialogue/>
      <div className="admin-page">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default AdminRoute
