import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList(){
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityActions.fetchCityListSuccess(response))
    } catch (error) {
        console.log(error)
        yield put(cityActions.fetchCityListfail())
    }
}
export default function* citySaga(){
    yield takeLatest(cityActions.fetchCityList.type,fetchCityList)
}