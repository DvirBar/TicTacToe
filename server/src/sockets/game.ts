import { Socket, Server } from "socket.io";
import { iUser } from "../data/users/types";
import { makeMove } from "../game";

export function GameController (io: Server, socket: Socket): void {
    socket.on("make move", (boardId: string, user: iUser, rowNum: number, columnNum: number) => {
        const board = makeMove(boardId, user, rowNum, columnNum);

        io.emit("make move", {
            boardId,
            board
        });
    });
}
