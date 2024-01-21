import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


export async function getEvent(id: number): Promise<Event> {
    let eventStatusResponse = await fetch(
        URL + "get-event-status?event_id=" + id
    );
    let eventStatus = await eventStatusResponse.json();
    let state: "inProgress" | "done" | "future" = "future"

    if (eventStatus.end < Date.now()) {
        state = "done"
    } else if (eventStatus.end > Date.now()) {
        state = "inProgress"
    }

    let event: Event = {
        id: id,
        name: eventStatus.name,
        startTime: new Date(eventStatus.start),
        endTime: new Date(eventStatus.end),
        freeTime: eventStatus.free_time,
        users: eventStatus.users,
        blacklist: eventStatus.blacklist,
        state: state
    }
    return event
}


export async function getEvents(id: number): Promise<Event[]> {
    let response = await fetch(URL + "get-user-events?user_id=" + id);
    let data = await response.json();

    let events: Event[] = []
    for (let i = 0; i < data.length; i++) {
        let event = await getEvent(data[i][0])
        events.push(event)
    }
    return events
}

export async function addEvent(name: string, description: string, start: string, end: string, freeTime: number, blacklist: string[]): Promise<number> {
    let response = await fetch(
        URL + "create-event",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                start: start.slice(0, -1),
                end: end.slice(0, -1),
                free_time: freeTime,
                blacklist: blacklist
            })
        }
    );
    let data = await response.json();
    return data.id
}

export async function addUserToEvent(user_id: number, event_id: number): Promise<void> {
    console.log("Adding user " + user_id + " to event " + event_id)
    let response = await fetch(
        URL + "add-participant",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                user_id: user_id,
                event_id: event_id
            })
        }
    );
    let data = await response.json();
}

export async function createUser(name: string): Promise<number> {
    console.log("Creating user " + name)
    let response = await fetch(
        URL + "create-user",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                name: name
            })
        }
    );
    let data = await response.json();
    console.log("git user id " + data.user_id)
    return data.user_id
}
