import { Event, User } from './model'

const URL: string = "http://localhost:8000/"


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
        id: "dsa",
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

    // let response = await fetch(url + "get-user-events?user_id=" + id);
    // let data = await response.json();

    // let events: event[] = []
    // for (let i = 0; i < data.length; i++) {
    //     let eventstatusresponse = await fetch(
    //         url + "get-event-status",
    //         {
    //             method: "get",
    //             body: json.stringify({event_id: data[i].id})
    //         }
    //     );
    //     let challengestatus = await challengestatusresponse.json();

    //     let challengeconstraintsresponse = await fetch(url + "get-challenge-constraints?challenge_id=" + data[i].id);
    //     let challengeconstraints = await challengeconstraintsresponse.json();

    //     events.push({
    //         name: challengestatus.title,
    //         time: challengestatus.end,
    //         users: object.keys(challengestatus.participants).map((key) => { return {name: key, status: challengestatus.participants[key].failed}})
    //         blacklist: challengeconstraints.map((constraint) => { return constraint[1] }),
    //         state: new date() < new date(challengestatus.end) ? "inprogress" : "done"
    //     })
    // }

    // return events
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
