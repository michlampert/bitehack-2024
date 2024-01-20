import {Event, User} from './model'

export async function getEvents(id: string): Promise<Event[]> {
    const f = (name: string): User => ({name, status: "ok"})
    const tmp: Event = { name: "asd", time: "3h", users: [f("Michał"), f("Wojtek"), {name: "Tomek", status: "fail"}, f("Mati")], blacklist: ["youtube.com"], state: "inProgress"}
    return [tmp, tmp, tmp]
}

export async function addEvent(event: Event): Promise<void> {

}

export async function addUserToEvent(id: string): Promise<void> {

}