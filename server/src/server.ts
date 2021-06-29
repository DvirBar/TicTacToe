import express from "express";
import http from "http";
import { Server } from "socket.io";
import initSocket from "./sockets/index";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client/build"));

// Sockets entry point
initSocket(io);

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
