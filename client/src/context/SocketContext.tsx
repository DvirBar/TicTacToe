import React, { createContext, useEffect, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { BoardsList, Mark } from "../Components/WaitingRoom/types";
import { iUser } from "../types";
import { BoardDetails } from "./types";

const endpoint = process.env.NODE_ENV === "production" ? "http://localhost:5000" : "http://10.0.0.7:3000"

interface Context {
    socket: Socket | null
    boardId: string | null
    boards: BoardsList
    user: iUser | null
    setUser: (user: iUser | null) => void;
    setBoardId: (boardId: string | null) => void;
    setBoards: (boards: BoardsList) => void
}

export const SocketContext = createContext<Context>({
    socket: null,
    user: null,
    boards: {},
    setBoards: (boards: BoardsList) => {},
    boardId: null,
    setUser: (user: null | iUser) => {},
    setBoardId: (boardId: null | string) => {}
});

export const useSocket = () => {
    return useContext(SocketContext)?.socket
}

interface IProps {
    children: React.ReactNode
}

const SocketProvider = ({ children }: IProps): JSX.Element => {
    const [socketExport, setSocketExport] = useState<Socket | null>(null)
    const [boardId, setBoardId] = useState<string | null>(null);
    const [user, setUser] = useState<iUser | null>(null);
    const [boards, setBoards] = useState<BoardsList>({});

    const value: Context = {
        socket: socketExport,
        boardId,
        boards,
        setBoards,
        setBoardId,
        user,
        setUser
    }

    const updateBoards = (boardDetails: BoardDetails) => {
        setBoards(prevBoards => ({
            ...prevBoards,
            [boardDetails.boardId]: boardDetails.board
        }))
    }

    const updateUser = (mark?: Mark) => {
        setUser(prevUser => ({
            id: prevUser?.id || "",
            mark
        }))
    }

    useEffect(() => {
        const socket = io(endpoint)
        setSocketExport(socket);

        // Boards
        socket?.on("boards list", (boardsList: BoardsList) => {
            setBoards(boardsList)
        })

        socket?.on("create board", (board: BoardDetails) => {
            updateBoards(board)
            setBoardId(board.boardId)
            updateUser(Mark.X)
        })

        socket?.on("join board", (board: BoardDetails) => {
            updateBoards(board)
            setBoardId(board.boardId)
            updateUser(Mark.O)
        })
    
        // Games
        socket?.on("start game", (board: BoardDetails) => {
            updateBoards(board)
        })

        socket?.on("make move", (board: BoardDetails) => {
            updateBoards(board)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
