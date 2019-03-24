import { Place } from "./place";

export interface Client {
    key?: string,
    password: number,
    date: string,
    in_attendance: boolean,
    uuid: string,
    place?: Place,
}
