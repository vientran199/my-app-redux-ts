import { authSaga } from 'features/auth/authSaga'
import counterSaga from 'features/counter/counterSaga'
import {all} from 'redux-saga/effects'
function* helloSaga(){
    console.log('hello saga')
}

export default function* rootSaga (){
    console.log('rootsaga run')

    yield all([  //các function này chỉ chạy 1 lần
        helloSaga(),
        counterSaga(),
        authSaga()
    ])
}