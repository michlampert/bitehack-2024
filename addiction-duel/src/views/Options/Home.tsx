import React, { useState, useEffect } from 'react'

import EventComponent from '../../components/Event'
import EventInputComponent from '../../components/EventInput'
import CreateEvent from '../../components/CreateEvent'
import { Event } from '../../model'

import { getEvents } from '../../api'
import { Button, Container, Divider, Stack, Typography } from '@mui/material'
import { getId } from '../../utils'

export default function Home() {

    const [events, setEvents] = useState<Event[]>([]);
    const [showOldEvents, setShowOldEvents] = useState(false);

    useEffect(() => {
        (async () => {
            const id = await getId();
            const events = await getEvents(id);

            events.sort((a: Event, b: Event) => {
                if (a.state === b.state) {
                    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
                }
                if (a.state === 'inProgress') return -1;
                if (b.state === 'inProgress') return 1;
                if (a.state === 'future') return -1;
                if (b.state === 'future') return 1;
                return 0;
            });
            setEvents(events);
        })();
    }, []);

    const handleEventCreated = (newEvent: Event) => {
        let allEvents = [...events, newEvent];
        allEvents.sort((a: Event, b: Event) => {
            if (a.state === b.state) {
                return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
            }
            if (a.state === 'inProgress') return -1;
            if (b.state === 'inProgress') return 1;
            if (a.state === 'future') return -1;
            if (b.state === 'future') return 1;
            return 0;
        });
        setEvents(allEvents);
    };

    const handleShowOldEvents = () => {
        setShowOldEvents(!showOldEvents);
    };

    return <>
        <Container sx={{ mt: 5 }}>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Container maxWidth="md">
                    {
                        events.filter(e => e.state !== 'done' || showOldEvents).map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
                    }
                    <Button onClick={handleShowOldEvents} variant="outlined" sx={{ mt: 3 }}>{showOldEvents ? 'Hide' : 'Show'} old events</Button> {/* New button */}
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
