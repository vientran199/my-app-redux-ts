import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import * as React from 'react'
import StatisticItem from './components/StatisticItem'
import StudentRankingList from './components/StudentRankingList'
import Widget from './components/Widget'
import { dashboardAction, selectDashboardHighestStudentList, selectDashboardLoading, selectDashboardLowestStudentList, selectDashboardRankingByCity, selectDashboardStatistics } from './dashboardSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectDashboardLoading)
    const statistics = useAppSelector(selectDashboardStatistics)
    const highestStudentList = useAppSelector(selectDashboardHighestStudentList)
    const lowestStudentList = useAppSelector(selectDashboardLowestStudentList)
    const rankingByCityList = useAppSelector(selectDashboardRankingByCity)

    const classes = useStyles()

    const dashboardState = useAppSelector(state => state.dashboard)
    console.log(dashboardState)
    React.useEffect(() => {
        dispatch(dashboardAction.fetchData())
    }, [dispatch])

    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatRounded fontSize="large" color="primary" />}
                        label="female"
                        value={statistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatBubble fontSize="large" color="primary" />}
                        label="mark >= 8"
                        value={statistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<LinearScaleSharp fontSize="large" color="primary" />}
                        label="mark <= 5"
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>
            {/* All students rankings */}
            <Box mt={5}>
                <Typography variant="h4">All Students</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with lowest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* Rankings by city */}
            <Box mt={5}>
                <Typography variant="h4">Rankings by city</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={ranking.cityName}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard