import React  from "react"
import { useState } from "react"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, IconButton, List, Stack, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from "dayjs";

export default function CreateEvent(){
    const [blacklist, setBlacklist] = useState<string[]>([])
    const [eventName, setEventName] = useState<string>('')
    const [timeToUse, setTimeToUse] = useState<number>(30)
    const [siteLink, setSiteLink] = useState<string>('');
    const [startTime, setStartTime] = useState(dayjs(new Date().toDateString()).toISOString());
    const [endTime, setEndTime] = useState(dayjs(new Date().toDateString()).toISOString());

    const handleDelete = (toDelete: string) => {
        setBlacklist((chips) => chips.filter((el) => el != toDelete))
    }

    const handleAdd = (toAdd: string) => {
        setBlacklist((chips) => chips.concat([toAdd]))
    }

    const scheduleEvent = (() => {
        console.log(111);
        console.log(startTime);
        console.log(endTime);
        console.log(startTime)
    })

    return <Container maxWidth="sm">
        <Stack direction="column" spacing={2}>
            <Box sx={{width: '100%'}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <TextField required label="Challenge name" onChange={(event) => setEventName(event.target.value)} fullWidth/>
                    <TextField type="number" defaultValue={30} required label="Time to use media [min]" onChange={(event) => setTimeToUse(Number(event.target.value))} fullWidth/>
                </Stack>
            </Box>
            <Box sx={{ width: '100%'}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        defaultValue={dayjs(new Date().toDateString())}
                        label="Start of the event"
                        onChange={(e) => setStartTime(dayjs(e).toISOString())}
                        slotProps={{ textField: { fullWidth: true } }}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                    />
                    <TimePicker
                        label="End of the event"
                        defaultValue={dayjs(new Date().toDateString())}
                        onChange={(e) => setEndTime(dayjs(e).toISOString())}
                        slotProps={{ textField: { fullWidth: true } }}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                    />
                    </LocalizationProvider>
                </Stack>
            </Box>
            <Stack direction="row">
                <TextField type="url" label="Site to be blocked" onChange={(event) => setSiteLink(event.target.value)} fullWidth/>
                <IconButton disabled={siteLink === ''} onClick={(id) => handleAdd(siteLink.replace(/^https:\/\//, '')!)}>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Stack direction="row" flex="flex" spacing={2} >
                {blacklist.map(e => 
                    <Chip label={e} onDelete={() => handleDelete(e)} />
                )}
            </Stack>

            <Button disabled={eventName === '' || blacklist.length === 0} endIcon={<CalendarMonthIcon />} onClick={() => scheduleEvent()}>Schedule event</Button>
        </Stack>
    </Container>
}