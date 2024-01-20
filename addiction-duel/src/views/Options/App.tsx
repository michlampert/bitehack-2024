import React, { useState } from 'react'

import EventComponent from '../../components/Event'
import TopBarComponent from '../../components/TopBar'
import EventInputComponent from '../../components/EventInput'
import { Event } from '../../model'

import './App.css'
import { getEvents } from '../../api'

export default function App() {

  const [events, setEvents] = useState<Event[]>([])

  getEvents("user_id").then(setEvents)

  return <>
    <TopBarComponent></TopBarComponent>
    <EventInputComponent></EventInputComponent>

    {
      events.map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
    }
  </>
}
