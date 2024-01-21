import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


export async function getEvents(id: string): Promise<Event[]> {
    //const f = (name: string): User => ({name, status: "ok"})
    //const tmp: Event = { name: "asd", time: "3h", users: [f("Michał"), f("Wojtek"), {name: "Tomek", status: "fail"}, f("Mati")], blacklist: ["youtube.com"], state: "inProgress"}

    let response = await fetch(URL + "get-user-events?user_id=" + id);
    let data = await response.json();

    let events: Event[] = []
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        let eventStatusResponse = await fetch(
            URL + "get-event-status",
            {
                method: "GET",
                body: JSON.stringify({ event_id: data[i].id })
            }
        );
        let challengeStatus = await challengeStatusResponse.json();

        let challengeConstraintsResponse = await fetch(URL + "get-challenge-constraints?challenge_id=" + data[i].id);
        let challengeConstraints = await challengeConstraintsResponse.json();

        events.push({
            name: challengeStatus.title,
            time: challengeStatus.end,
            users: Object.keys(challengeStatus.participants).map((key) => { return { name: key, status: challengeStatus.participants[key].failed } })
            blacklist: challengeConstraints.map((constraint) => { return constraint[1] }),
            state: new Date() < new Date(challengeStatus.end) ? "inProgress" : "done"
        })
    }

    return events
}

export async function addEvent(): Promise<void> {
    let response = await fetch(
        URL + "add-challenge",
        {
            method: "POST",
            body: JSON.stringify({
                title: event.name,
                start: event.time,
                participants: event.users.map((user) => { return { user: user.name, failed: user.status == "fail" } }),
                constraints: event.blacklist.map((url) => { return { url: url } })
            })
        }
    );
    let data = await response.json();
}

export async function addUserToEvent(id: string): Promise<void> {

}
