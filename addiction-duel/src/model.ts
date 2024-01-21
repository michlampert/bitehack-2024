export interface User {
    name: number,
    status: "ok" | "fail",
    progress?: number,
}

export interface Event {
    id: number,
    name: string,
    startTime: Date,
    endTime: Date,
    freeTime: number,
    users: User[],
    blacklist: string[],
    state: "inProgress" | "done" | "future",
}
