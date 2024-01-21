import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Chip, Stack, Typography, Box, LinearProgress, Button, Snackbar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Event } from '../model'
import FaceIcon from '@mui/icons-material/Face'
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DoneIcon from '@mui/icons-material/Done';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import EventIcon from '@mui/icons-material/Event';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import { SocialIcon } from 'react-social-icons'
import { WidthNormal } from '@mui/icons-material'

export default function EventComponent(props: { event: Event }) {

    const [open, setOpen] = React.useState(false);

    return <>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1}>
                        <Stack direction="row" justifyContent="left" alignItems="center" spacing={1}>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.event.name}
                            </Typography>
                            {
                                props.event.state === "done" ?
                                    <DoneIcon color="primary" /> :
                                    props.event.state === "future" ?
                                        <EventIcon color="primary" /> :
                                        <HourglassTopIcon color="primary" />

                            }
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="left">
                            {
                                props.event.users.map(u => <Chip icon={<FaceIcon />} label={u.name} {...(u.status !== "ok" ? { disabled: true } : {})} />)
                            }
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="left">
                            {
                                props.event.blacklist.map(url => <Chip icon={<SocialIcon  network={url.split('.')[0]} style={{height: 25, width: 25}}/>} label={url} />)
                            }
                        </Stack>
                    </Stack>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={3}>
                    {props.event.users.map((u, id) => <ProgressWithLabel key={id} label={u.name} value={u.progress ? u.progress : 0} status={u.status} />)}
                    <Stack direction="row" spacing={2} justifyContent="right">
                        {
                            props.event.state === "inProgress" ?
                                <Button variant="outlined" startIcon={<EditIcon />}>
                                    Edit
                                </Button> :
                                <></>
                        }
                        {
                            props.event.state === "inProgress" ?
                                <Button variant="outlined" endIcon={<MailIcon />} onClick={() => {
                                    copy(props.event.id)
                                    setOpen(true)
                                    setInterval(() => setOpen(false), 2000)
                                }}>
                                    Invite
                                </Button> :
                                <></>
                        }
                        <Button href={`?id=${props.event.id}`} variant="outlined" endIcon={<AddCircleIcon />}>
                            More
                        </Button>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
        <Snackbar
            open={open}
            message="Event id copied to clipboard"
        />
    </>
}

function ProgressWithLabel(props: { label: string, value: number, status: string }) {
    const color = props.status === "fail" ? "error" : props.value === 100 ? "success" : "info"
    return <Stack direction="row" spacing={1} justifyContent="left" alignItems="center">
        <Box sx={{ minWidth: 50 }}>
            <Typography variant="body2" color="text.secondary">{props.label}</Typography>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={props.value} color={color} />
        </Box>
    </Stack>
}
