import React, { useState } from 'react'

import EventComponent from '../../components/Event'
import EventInputComponent from '../../components/EventInput'
import CreateEvent from '../../components/CreateEvent'
import { Event } from '../../model'

import { getEvents } from '../../api'
import { Container, Divider, Stack, Typography } from '@mui/material'
import { getId } from '../../utils'

export default function Home() {

    const [events, setEvents] = useState<Event[]>([])

    getId().then(getEvents).then(setEvents)

    return <>
        <Container sx={{ mt: 5 }}>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Container maxWidth="md">
                    {
                        events.map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
                    }
                </Container>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h5" component="div">
                        Create new challenge!
                    </Typography>
                    <CreateEvent></CreateEvent>
                    <Typography gutterBottom variant="h5" component="div">
                        ...or just join existing one
                    </Typography>
                    <EventInputComponent />
                </Stack>
            </Stack>
        </Container>
    </>
}
