import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../interfaces/profile"

export interface IState {
    user: IUser,
    login: boolean
}

export interface IAction {
payload?: any
type: string
}

const initialState : IState = {
    user: {
        email: null,
        password: null
    },
    login: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials : (state: IState, action) =>{
            const {email, password} = action.payload
            state.user.email = email
            state.user.password = password
            state.login = true
            return state
        },
        logOut: (state: IState) =>{
            state.user.email = null
            state.user.password = null
            state.login = false
        },

    }
})

export const {setCredentials, logOut} = authSlice.actions
export const userCurrent = (state : IState) => state.user.email
export const passwordUserCurrent = (state : IState) => state.user.password

