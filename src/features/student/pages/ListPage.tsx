import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams } from 'models';
import * as React from 'react';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

const ListPage = () => {
  const dispatch = useAppDispatch()

  const studentList = useAppSelector(selectStudentList)
  const loading = useAppSelector(selectStudentLoading)
  const filter = useAppSelector(selectStudentFilter)
  const pagination = useAppSelector(selectStudentPagination)
  const cityMap = useAppSelector(selectCityMap)
  const cityList = useAppSelector(selectCityList);

  const classes = useStyles()

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  }

  const handleSearchChange = (newFilter: ListParams) =>{
    dispatch(studentActions.setFilterWithDebounce(newFilter))
  }
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      <Box mb={3}>
        <StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange} />
      </Box>
      
      {/* StudentTable */}
      <StudentTable studentList={studentList} cityMap={cityMap}/>

      {/* Pagination */}
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}
export default ListPage