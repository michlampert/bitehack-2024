import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Container, Chip, Stack, Typography, Box, LinearProgress } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Event } from '../model'
import FaceIcon from '@mui/icons-material/Face'
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DoneIcon from '@mui/icons-material/Done';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export default function EventComponent(props: { event: Event }) {
    return <>
        <Container maxWidth="sm">
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
                                        <DoneIcon color="success" /> :
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
                                    props.event.blacklist.map(url => <Chip icon={<LinkOffIcon />} label={url} />)
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={3}>
                        {props.event.users.map((u, id) => <ProgressWithLabel key={id} label={u.name} value={u.progress ? u.progress : 0} status={u.status} />)}
                    </Stack>
                </AccordionDetails>
            </Accordion>

        </Container>
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
