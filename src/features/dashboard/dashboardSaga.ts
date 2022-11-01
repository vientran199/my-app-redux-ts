import studentApi from "api/studentApi"
import { ListResponse, Student } from "models"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { dashboardAction } from "./dashboardSlice"

function* fetchStatistics(){
    console.log('statistics')
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'male'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'female'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_gte: 8}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_lte: 5}),
    ])
    console.log(responseList)
}
function* fetchHighestStudentList(){
    console.log('highest')
}
function* fetchLowestStudentList(){
    console.log('lowest')
}
function* fetchRankingByCityList(){
    console.log('byCity')

}
function* fetchDashboardData(){
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList)
        ])
        yield put(dashboardAction.fetchDataSuccess())
    } catch (error) {
        yield put(dashboardAction.fetchDataFailed())
    }
}
export function* dashboardSaga(){
    console.log('run dashboad saga')
    yield takeLatest(dashboardAction.fetchData.type,fetchDashboardData)
}