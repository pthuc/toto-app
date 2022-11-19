import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

type UserType = {
    username: null | string,
    email: null | string,
    level: null | string
}
type AuthType = {
    user: UserType,
    status: 'valid' | 'invalid'
}

const initialState: AuthType = {
    user: {
        username: null,
        email: null,
        level: null
    },
    status: 'invalid'
}

const { reducer, actions } = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInReducer: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
            state.status = 'valid'
        },
        signOutReducer: (state, action: PayloadAction<null>) => {
            state.user = {
                username: null,
                email: null,
                level: null
            }
            state.status = 'invalid'
        }
    }
})


export default reducer
export const { signInReducer, signOutReducer } = actions
export const statusSelector = (state: RootState) => state.auth.status
export const userSelector = (state: RootState) => state.auth.user