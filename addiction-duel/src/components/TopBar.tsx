import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { createUser } from '../api'

export default function TopBarComponent() {

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        let userId: number = await createUser(name);
        chrome.storage.local.set({ userId: userId });

        setOpen(false);
    }

    return <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClickOpen}>
                    <PsychologyIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Addiction Duel
                </Typography>

            </Toolbar>
        </AppBar>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Set username</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </>
}
