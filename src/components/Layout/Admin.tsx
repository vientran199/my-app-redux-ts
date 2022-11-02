import * as React from 'react'
import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks'
import {Header,Sidebar }from 'components/Common';
import { authActions } from 'features/auth/authSlice'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from 'features/dashboard';
import Student from 'features/student';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '240px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,
  
      minHeight: '100vh',
    },
  
    header: {
      gridArea: 'header',
    },
    sidebar: {
      gridArea: 'sidebar',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    main: {
      gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 3),
    },
  }));

export const AdminLayout = ()=>{
    const classes = useStyles();
    const nav = useNavigate()
    React.useEffect(()=>{
      nav('/admin/dashboard')
    },[])
    return (
        <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Outlet/>
      </Box>
    </Box>
    )
}