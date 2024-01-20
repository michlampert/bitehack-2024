import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function TopBarComponent() {
    return <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <PsychologyIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Addiction Duel
                </Typography>
            </Toolbar>
        </AppBar>
    </>
}
