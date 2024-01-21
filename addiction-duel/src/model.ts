export interface User {
    name: string,
    status: "ok" | "fail",
    progress?: number,
}

export interface Event {
    id: string,
    name: string,
    startTime: Date,
    endTime: Date,
    freeTime: number,
    users: User[],
    blacklist: string[],
    state: "inProgress" | "done" | "future",
}
