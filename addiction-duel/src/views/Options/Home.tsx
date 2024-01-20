import React, { useState } from 'react'

import EventComponent from '../../components/Event'
import EventInputComponent from '../../components/EventInput'
import { Event } from '../../model'

import { getEvents } from '../../api'
import { Container } from '@mui/material'

export default function Home() {

    const [events, setEvents] = useState<Event[]>([])

    getEvents("user_id").then(setEvents)

    return <>

        <Container maxWidth="md">
            {
                events.map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
            }
        </Container>

        <EventInputComponent />
    </>
}
