import { Role } from "./role";

export interface Employee {
    id: number;
    username: string;
    password: string;
    imageUrl: string;
    role: Role
}