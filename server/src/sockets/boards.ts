import { Socket, Server } from "socket.io";
import { boards, createBoard, joinBoard } from "../data/boards/boards";

export function BoardController (io: Server, socket: Socket): void {
    socket.on("create board", (name: string, userId: string) => {
        const board = createBoard(name, userId);
        socket.emit("create board", board);
        io.emit("boards list", {
            ...boards,
            [board.boardId]: board.board
        });
    });

    socket.on("join board", (userId: string, boardId: string) => {
        const board = joinBoard(userId, boardId);
        const boardDetails = {
            boardId,
            board
        };

        socket.emit("join board", boardDetails);
        io.emit("boards list", {
            ...boards,
            [boardId]: board
        });
        io.to(board.owner.id).emit("start game", boardDetails);
    });
}
