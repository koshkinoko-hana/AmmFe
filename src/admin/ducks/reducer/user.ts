import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { loginAction } from '@admin/ducks/actions/user'
import { LoginSuccessPayload, UserState } from '@admin/ducks/types/user'
import { token } from '~/common/utils/token'


const initialState: UserState = {
  loggedIn: !!token(),
  roles: [],
  loading: false
}

const user = createReducer(initialState, {
  [loginAction.TRIGGER]: (state) => {
    return { ...state, loggedIn: false, loading: true }
  },
  [loginAction.SUCCESS]: (state, action: PayloadAction<LoginSuccessPayload>) => {
    const { roles } = action.payload
    return { ...state, loggedIn: true, loading: false, roles }
  },
  [loginAction.FAILURE]: (state) => {
    return { ...state, loggedIn: false, loading: false }
  },
})

export default user
