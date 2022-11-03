import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentList, studentActions } from '../studentSlice';
const useStyles = makeStyles((theme) => ({
    root: {},
  
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      marginBottom: theme.spacing(4),
    },
  }));

const ListPage = () =>{
    const dispatch = useAppDispatch()
    const studentList = useAppSelector(selectStudentList)
    
    const classes = useStyles()

    React.useEffect(()=>{
        dispatch(studentActions.fetchStudentList({_page: 1, _limit: 16}))
    },[dispatch])
    return (
        <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      {/* StudentTable */}
      <StudentTable studentList={studentList} />

      {/* Pagination */}
    </Box>
    )
}
export default ListPage