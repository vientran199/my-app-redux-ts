import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export interface Widgetprops {
    title: string;
    children: any;
}
const Widget = ({ children, title }: Widgetprops) => {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title}</Typography>

            <Box mt={2}>{children}</Box>
        </Paper>
    )
}

export default Widget