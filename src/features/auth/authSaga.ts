import { PayloadAction } from "@reduxjs/toolkit";
import { delay, fork, take,call } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* hanleLogin(payload: LoginPayload){
    console.log('login',payload)
    yield delay(500)
    localStorage.setItem('acces_token',"áds")
}
function* handleLogout(){
    console.log('logout')
    localStorage.removeItem('access_token')
}
function* watchLoginFlow(){
    while(true){ //để chạy logout, sẽ quay lại chờ login
        const isLoggedIn = localStorage.getItem('access_token')
        if(isLoggedIn){
            const action:PayloadAction<LoginPayload> = yield take(authActions.login.type) //Chờ action login mới chạy tiếp
            yield fork(hanleLogin,action.payload)
        }
        
        yield take(authActions.logout.type) //chờ action logout mới chạy tiếp
        yield call(handleLogout) //fork: sẽ tự chạy tiếp không chờ cho xong công việc, call: chờ xong công việc
    }
}
export function* authSaga(){
    console.log('authSaga')
    yield fork(watchLoginFlow)
}