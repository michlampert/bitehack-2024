import { Event, User } from './model'

export async function getEvents(id: string): Promise<Event[]> {
    const f = (name: string): User => ({ name, status: "ok", progress: 80 })
    const tmp: Event = {
        id: "asd",
        name: "asd",
        users: [f("Michał"), f("Wojtek"), { name: "Tomek", status: "fail", progress: 60 }, f("Mati")],
        blacklist: ["youtube.com"],
        state: "inProgress",
        freeTime: 180,
        startTime: new Date(),
        endTime: new Date()
    }
    return [tmp, tmp, {
        id: "asd",
        name: "das",
        users: [{ name: "Ala", status: "fail", progress: 60 }, f("Bob")],
        blacklist: ["facebook.com", "instagram.com"],
        state: "done",
        freeTime: 180,
        startTime: new Date(),
        endTime: new Date()
    }, {
        id: "asd",
        name: "asdasdasd",
        users: [{ name: "Ala", status: "fail", progress: 60 }, f("Bob"), { name: "Ala", status: "fail", progress: 60 }],
        blacklist: ["twitter.com", "instagram.com"],
        state: "future",
        freeTime: 180,
        startTime: new Date(),
        endTime: new Date()
    }]
}

export async function addEvent(event: Event): Promise<void> {

}

export async function addUserToEvent(id: string): Promise<void> {

}