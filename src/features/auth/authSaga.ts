import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { delay, fork, take, call, put } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* hanleLogin(payload: LoginPayload) {
    try {
        console.log('login', payload)
        yield delay(500)
        localStorage.setItem('access_token', "áds")
        yield put(authActions.loginSuccess({
            id: '1',
            name: 'vien'
        }))

        //redirect to admin page
        yield put(push('/admin'))
    } catch (error) {
        yield put(authActions.loginFail('error'))
    }

}
function* handleLogout() {
    console.log('logout')
    localStorage.removeItem('access_token')
    yield put(push('/login'))
}
function* watchLoginFlow() {
    while (true) { //để chạy logout, sẽ quay lại chờ login
        const isLoggedIn = localStorage.getItem('access_token')
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type) //Chờ đến khi nhận được action login mới chạy tiếp
            yield fork(hanleLogin, action.payload)
        }

        yield take(authActions.logout.type) //chờ đến khi nhận được action logout mới chạy tiếp
        yield call(handleLogout) //fork: sẽ tự chạy tiếp không chờ cho xong công việc, call: chờ xong công việc
    }
}
function* checkLogin() {
    const auth = localStorage.getItem('access_token')
    if(auth) yield put(push('/admin'))
}
export function* authSaga() {
    console.log('authSaga')

    yield call(checkLogin)
    yield fork(watchLoginFlow)
}