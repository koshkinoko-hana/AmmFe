import { fetchUserAction, fetchUserListAction, saveUserAction, updateUserAction } from '@admin/ducks/actions/user'
import { User, UserLight, UserState } from '@admin/ducks/types/user'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: UserState = {
  users: [],
  loading: false
}

const user = createReducer(initialState, {
  [fetchUserListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchUserListAction.SUCCESS]: (state, action: PayloadAction<UserLight[]>) => {
    return { ...state, loading: false, users: action.payload }
  },
  [fetchUserListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchUserAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchUserAction.SUCCESS]: (state, action:  PayloadAction<User>) => {
    return { ...state, current: action.payload, loading: false }
  },
  [fetchUserAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [saveUserAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateUserAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateUserAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [updateUserAction.FAILURE]: (state, action: PayloadAction<User>) => {
    return { ...state, loading: false, current: action.payload }
  },
  [saveUserAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [saveUserAction.SUCCESS]: (state, action: PayloadAction<User>) => {
    return { ...state, loading: false, current: action.payload }
  },
  [saveUserAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})

export default user
