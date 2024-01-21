import React, { useState, useEffect } from 'react'

import EventComponent from '../../components/Event'
import EventInputComponent from '../../components/EventInput'
import CreateEvent from '../../components/CreateEvent'
import { Event } from '../../model'

import { getEvents } from '../../api'
import { Container, Divider, Stack, Typography } from '@mui/material'
import { getId } from '../../utils'

export default function Home() {

    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        (async () => {
            const id = await getId();
            const events = await getEvents(id);
            setEvents(events);
        })();
    }, []);

    const handleEventCreated = (newEvent: Event) => {
        console.log("Event created");
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

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
                    <CreateEvent onEventCreated={handleEventCreated}></CreateEvent>
                    <Typography gutterBottom variant="h5" component="div">
                        ...or just join existing one
                    </Typography>
                    <EventInputComponent onEventJoin={handleEventCreated} />
                </Stack>
            </Stack>
        </Container>
    </>
}
