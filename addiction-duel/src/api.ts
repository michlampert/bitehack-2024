import { Event, User } from './model'

export async function getEvents(id: string): Promise<Event[]> {
    const f = (name: string): User => ({ name, status: "ok", progress: 80 })
    const tmp: Event = {
        name: "asd", freeTime: 180, users: [f("Michał"), f("Wojtek"), { name: "Tomek", status: "fail", progress: 60 }, f("Mati")], blacklist: ["youtube.com"], state: "inProgress",
        startTime: new Date(),
        endTime: new Date()
    }
    return [tmp, tmp, tmp]
}

export async function addEvent(event: Event): Promise<void> {

}

export async function addUserToEvent(id: string): Promise<void> {

}