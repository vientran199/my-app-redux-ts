import * as React from 'react'
import { Navigate, Outlet, Route, RouteProps } from 'react-router-dom'

export interface PrivateRouteProps{

}
export const PrivateRoute = (props: RouteProps)=>{
    //check if user is logged in
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    if(!isLoggedIn) return <Navigate to={'/login'} replace/>
    return <Outlet/>

}