import { useAppDispatch } from 'app/hooks'
import { authActions } from 'features/auth/authSlice'
import * as React from 'react'

export interface AdminLayoutProps{

}

export const AdminLayout = ()=>{
    const dispatch = useAppDispatch()
    const handleLogout = () =>{
        dispatch(authActions.logout())
    }
    return (
        <div>
            addmin
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}