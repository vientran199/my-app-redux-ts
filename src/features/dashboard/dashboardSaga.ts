import cityApi from "api/cityApi"
import studentApi from "api/studentApi"
import { City, ListResponse, Student } from "models"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { dashboardAction, RankingByCity } from "./dashboardSlice"

function* fetchStatistics(){
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'male'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'female'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_gte: 8}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_lte: 5}),
    ])
    const statisticsList = responseList.map(x => x.pagination._totalRows)
    const [maleCount,femaleCount,highMarkCount,lowMarkCount] = statisticsList
    yield put(dashboardAction.setStatistics({maleCount,femaleCount,highMarkCount,lowMarkCount}))
}
function* fetchHighestStudentList(){
    const {data} : ListResponse<Student> = yield call(studentApi.getAll,{_page: 1, _limit: 5, _sort: 'mark', _order: 'desc'})
    yield put(dashboardAction.setHighestStudentList(data))
}
function* fetchLowestStudentList(){
    const {data} : ListResponse<Student> = yield call(studentApi.getAll,{_page: 1, _limit: 5, _sort: 'mark', _order: 'asc'})
    yield put(dashboardAction.setLowestStudentList(data))
}
function* fetchRankingByCityList(){
    const {data: cityList} : ListResponse<City> = yield call(cityApi.getAll)
    const callList = cityList.map((x) => 
        call(studentApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            code : x.code
        })
    )
    const responseList : Array<ListResponse<Student>> = yield all(callList)
    const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        rankingList: x.data,
    }));
    yield put(dashboardAction.setRankingByCity(rankingByCityList))
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