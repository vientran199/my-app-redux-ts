import * as React from 'react'
import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectLogging } from '../authSlice';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    box: {
        // padding: theme.spacing(3),
    },
})
const LoginPage = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const isLogging = useAppSelector(selectLogging)
    const handleLoginClick = () =>{
        dispatch(authActions.login({
            username:'',
            password:''
        }))
    }
    const handleLogoutClick =()=>{
        dispatch(authActions.logout())
    }
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>

                <Box mt={4}>
                    <Button fullWidth variant="contained" color="primary" 
                    onClick={handleLoginClick}
                    >
                        {isLogging && 
                        <CircularProgress size={20} color="secondary" />
                        }
                        &nbsp; Fake Login
                    </Button>
                    <Button fullWidth variant="contained" color="primary" 
                    onClick={handleLogoutClick}
                    >
                         Fake Loutout
                    </Button>
                </Box>
            </Paper>
        </div>
    )
}
export default LoginPage