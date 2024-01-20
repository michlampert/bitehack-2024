export interface User {
    name: string,
    status: "ok" | "fail",
    progress?: number,
}

export interface Event {
    name: string,
    time: string,
    users: User[],
    blacklist: string[],
    state: "inProgress" | "done",
}