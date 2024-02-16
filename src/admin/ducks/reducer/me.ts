import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { loginAction, logoutAction } from '@admin/ducks/actions/me'
import { LoginSuccessPayload, MeState } from '@admin/ducks/types/me'
import { token } from '~/common/utils/token'


const initialState: MeState = {
  loggedIn: !!token(),
  roles: [],
  loading: false
}

const me = createReducer(initialState, {
  [loginAction.TRIGGER]: (state) => {
    return { ...state, loggedIn: false, loading: true }
  },
  [logoutAction.type]: (state) => {
    return { ...state, loggedIn: false, loading: false }
  },
  [loginAction.SUCCESS]: (state, action: PayloadAction<LoginSuccessPayload>) => {
    const { roles } = action.payload
    return { ...state, loggedIn: true, loading: false, roles }
  },
  [loginAction.FAILURE]: (state) => {
    return { ...state, loggedIn: false, loading: false }
  },
})

export default me
