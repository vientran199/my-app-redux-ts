import { useAppDispatch } from 'app/hooks'
import * as React from 'react'
import { dashboardAction } from './dashboardSlice'

const Dashboard = () =>{
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        console.log('dispatch')
        dispatch(dashboardAction.fetchData())
    },[dispatch])
    
    return (
        <div>dashboard</div>
    )
}

export default Dashboard