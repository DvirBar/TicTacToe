import { iUser } from "./types";

let users: iUser[] = [];

export function addUser (id: string): iUser {
    const user: iUser = { id };

    users.push(user);

    return user;
}

export function findUserById (id: string): iUser | undefined {
    const user = users.find(user => user.id === id);

    return user;
}

export function deleteUser (id: string): void {
    users = users.filter(user => user.id !== id);
}
