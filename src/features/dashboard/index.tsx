import { useAppDispatch, useAppSelector } from 'app/hooks'
import * as React from 'react'
import { dashboardAction, selectDashboardHighestStudentList, selectDashboardLoading, selectDashboardLowestStudentList, selectDashboardRankingByCity } from './dashboardSlice'

const Dashboard = () =>{
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectDashboardLoading)
    const highestStudentList = useAppSelector(selectDashboardHighestStudentList)
    const lowestStudentList = useAppSelector(selectDashboardLowestStudentList)
    const rankingByCity = useAppSelector(selectDashboardRankingByCity)

    const dashboardState = useAppSelector(state => state.dashboard)
    console.log(dashboardState)
    React.useEffect(()=>{
        dispatch(dashboardAction.fetchData())
    },[dispatch])
    
    return (
        <div>dashboard</div>
    )
}

export default Dashboard