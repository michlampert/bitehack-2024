import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


export async function getEvents(id: string): Promise<Event[]> {
    let response = await fetch(URL + "get-user-events?user_id=" + id);
    let data = await response.json();

    let events: Event[] = []
    for (let i = 0; i < data.length; i++) {
        let eventStatusResponse = await fetch(
            URL + "get-event-status?event_id=" + data[i][0]
        );
        let eventStatus = await eventStatusResponse.json();
        let state: "inProgress" | "done" | "future" = "future"

        if (eventStatus.end < Date.now()) {
            state = "done"
        } else if (eventStatus.end > Date.now()) {
            state = "inProgress"
        }

        let event: Event = {
            id: data[i][0],
            name: eventStatus.name,
            startTime: new Date(eventStatus.start),
            endTime: new Date(eventStatus.end),
            freeTime: eventStatus.free_time,
            users: eventStatus.users,
            blacklist: eventStatus.blacklist,
            state: state
        }

        events.push(event)
    }

    return events
}

export async function addEvent(name: string, description: string, totalTime: number, start: Date, freeTime: number, blacklist: string[]): Promise<void> {
    let response = await fetch(
        URL + "create-event",
        {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                total_time: totalTime,
                start: start,
                free_time: freeTime,
                blacklist: blacklist
            })
        }
    );
    let data = await response.json();
}

export async function addUserToEvent(id: string): Promise<void> {

}
