import { authSaga } from 'features/auth/authSaga'
import counterSaga from 'features/counter/counterSaga'
import { dashboardSaga } from 'features/dashboard/dashboardSaga'
import studentSaga from 'features/student/studentSaga'
import {all} from 'redux-saga/effects'

export default function* rootSaga (){
    yield all([  //các function này chỉ chạy 1 lần
        counterSaga(),
        authSaga(),
        dashboardSaga(),
        studentSaga(),
    ])
}