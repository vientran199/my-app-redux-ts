import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "models";

export interface DashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}
export interface RankingByCity {
    cityId: string;
    rankingList: Student[]
}
export interface DashboardState {
    loading: boolean;
    statistics: DashboardStatistics;
    highestStudentList: Student[];
    lowestStudentList: Student[];
    rankingByCityList: RankingByCity[];
}
const initialState:DashboardState = {
    loading: false,
    statistics: {
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
        maleCount: 0
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCityList: []
}
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true
        },
        fetchDataSuccess(state) {
            state.loading = false
        },
        fetchDataFailed(state) {
            state.loading = false
        },
        
        setStatistics(state, actions: PayloadAction<DashboardStatistics>){
            state.statistics = actions.payload
        },
        setHighestStudentList(state, actions: PayloadAction<Student[]>){
            state.highestStudentList = actions.payload
        },
        setLowestStudentList(state, actions: PayloadAction<Student[]>){
            state.lowestStudentList = actions.payload
        },
        setRankingByCity(state, actions: PayloadAction<RankingByCity[]>){
            state.rankingByCityList = actions.payload
        },

    }
})

export const dashboardAction = dashboardSlice.actions

//selector
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics
export const selectDashboardHighestStudentList = (state: RootState) => state.dashboard.highestStudentList
export const selectDashboardLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList
export const selectDashboardRankingByCity = (state: RootState) => state.dashboard.rankingByCityList

const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer