import React, { useState } from 'react'

import EventComponent from '../../components/Event'
import TopBarComponent from '../../components/TopBar'
import EventInputComponent from '../../components/EventInput'
import { Event } from '../../model'
import HistoryList from '../../components/UserHistory';

import './App.css'
import { getEvents } from '../../api'

export default function App() {

  const [events, setEvents] = useState<Event[]>([])

  const historyItems = [
    { id: 1, url: 'https://www.youtube.com/watch?v=SiVG-bu8Vjs' },
    { id: 2, url: 'https://www.youtube.com/watch?v=v18Q4WBu30g' },
    { id: 3, url: 'https://www.youtube.com/watch?v=stD5O9YnM04' },
    { id: 4, url: 'https://facebook.com' }
  ];


  getEvents("user_id").then(setEvents)

  return <>
    <TopBarComponent />
    <EventInputComponent />
    {
      events.map((e, idx) => <EventComponent key={idx} event={e}></EventComponent>)
    }
    <HistoryList historyItems={historyItems} />;
  </>
}
