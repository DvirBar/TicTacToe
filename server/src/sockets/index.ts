import { Server, Socket } from "socket.io";
import { boards } from "../data/boards/boards";
import { addUser, deleteUser } from "../data/users/users";
import { BoardController } from "./boards";
import { GameController } from "./game";

export default function initSocket (io: Server): void {
    io.on("connection", (socket: Socket) => {
        // When a new user connects, they are assigned with an id and get a rooms list
        console.log("New user connected");
        const user = addUser(socket.id);

        socket.emit("boards list", boards);
        socket.emit("get user", user);

        BoardController(io, socket);
        GameController(io, socket);

        socket.on("disconnect", () => {
            console.log("user disconnected");
            deleteUser(socket.id);
        });
    });
}
