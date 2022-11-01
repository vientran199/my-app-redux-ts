import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
export const selectDashboardLoading = (state: DashboardState) => state.loading
export const selectDashboardStatistics = (state: DashboardState) => state.statistics
export const selectDashboardHighestStudentList = (state: DashboardState) => state.highestStudentList
export const selectDashboardLowestStudentList = (state: DashboardState) => state.lowestStudentList
export const selectDashboardRankingByCity = (state: DashboardState) => state.rankingByCityList

const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer