import React, { useState } from 'react'

import EventComponent from '../../components/Event'
import TopBarComponent from '../../components/TopBar'
import { Event } from '../../model'

import './App.css'
import { getEvents } from '../../api'
import { Container } from '@mui/material'

export default function Home() {

    const [events, setEvents] = useState<Event[]>([])

    getEvents("user_id").then(setEvents)

    return <>
        <TopBarComponent></TopBarComponent>
        <Container maxWidth="md">
            {
                events.map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
            }
        </Container>
    </>
}
