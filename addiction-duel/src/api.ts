import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


export async function getEvents(id: string): Promise<Event[]> {
    const f = (name: string): User => ({ name, status: "ok", progress: 80 })
    const tmp: Event = {
        name: "asd", freeTime: 180, users: [f("Michał"), f("Wojtek"), { name: "Tomek", status: "fail", progress: 60 }, f("Mati")], blacklist: ["youtube.com"], state: "inProgress",
        startTime: new Date(),
        endTime: new Date()
    }
    return [tmp, tmp, tmp]
}

export async function addEvent(): Promise<void> {
    let response = await fetch(
        URL + "add-challenge",
        {
            method: "POST",
            body: JSON.stringify({
                title: event.name,
                start: event.time,
                participants: event.users.map((user) => { return {user: user.name, failed: user.status == "fail"}}),
                constraints: event.blacklist.map((url) => { return {url: url}})
            })
        }
    );
    let data = await response.json();
}

export async function addUserToEvent(id: string): Promise<void> {

}
