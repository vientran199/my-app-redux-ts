import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models";
export interface LoginPayload {
    username: string;
    password: string;
}
export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User
}
const initialState:AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state,action: PayloadAction<LoginPayload>){
            state.logging = true
        },
        loginSuccess(state,action: PayloadAction<User>){
            state.logging = false
            state.currentUser = action.payload
        },
        loginFail(state,action: PayloadAction<string>){
            state.logging = false
        },

        logout(state){
            state.isLoggedIn = false
            state.currentUser = undefined
        },
    }
})
 
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectLogging = (state: any) => state.auth.logging
export const authActions = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer