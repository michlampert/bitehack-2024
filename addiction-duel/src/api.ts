import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


export async function getEvents(id: string): Promise<Event[]> {
    let response = await fetch(URL + "get-user-events?user_id=" + id);
    let data = await response.json();

    let events: Event[] = []
    for (let i = 0; i < data.length; i++) {
        let eventStatusResponse = await fetch(
            URL + "get-event-status",
            {
                method: "GET",
                body: JSON.stringify({ event_id: data[i].id })
            }
        );
        let eventStatus = await eventStatusResponse.json();

        let status: "planned" | "inProgress" | "done" = "planned"

        if (new Date(data[i].end) < new Date()) {
            status = "done"
        } else if (new Date(data[i].start) > new Date()) {
            status = "inProgress"
        }

        let event: Event = {
            name: eventStatus[i].name,
            startTime: eventStatus[i].start,
            endTime: eventStatus[i].end,
            freeTime: eventStatus[i].free_time,
            users: eventStatus[i].users,
            blacklist: eventStatus[i].blacklist,
            state: status
        }
        events.push(event)
    }
    return [tmp, tmp, tmp]
}

export async function addEvent(name: string, description: string, totalTime: number, start: Date, freeTime: number, blacklist: string[]): Promise<void> {
    let response = await fetch(
        URL + "add-event",
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
}

export async function addUserToEvent(eventId: number, userId: number): Promise<void> {
    let response = await fetch(
        URL + "add-participant",
        {
            method: "POST",
            body: JSON.stringify({ event_id: eventId, user_id: userId })
        }
    );
}
