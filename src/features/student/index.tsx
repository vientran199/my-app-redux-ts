import { useAppDispatch } from 'app/hooks'
import { cityActions } from 'features/city/citySlice'
import * as React from 'react'
import { Outlet } from 'react-router-dom'

const Student = () =>{
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        console.log('fetch city')
        dispatch(cityActions.fetchCityList())
    },[dispatch])
    return (
        <Outlet/>
    )
}

export default Student