import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { studentActions } from '../studentSlice';

const ListPage = () =>{
    const dispatch = useAppDispatch()

    React.useEffect(()=>{
        dispatch(studentActions.fetchStudentList({_page: 1, _limit: 16}))
    },[dispatch])
    return (
        <>ListPage</>
    )
}
export default ListPage