import React from 'react'
import { useContext } from 'react';
import { SocketContext, useSocket } from '../../../context/SocketContext';
import { iBoard } from '../../WaitingRoom/types';
import styles from "./GameBoard.module.css";

interface iProps {
    row: number,
    column: number,
    board: iBoard,
    finished?: boolean
}

function Cell({ row, column, board, finished }: iProps) {
    const socket = useSocket();

    const {
        user: myUser,
        boardId
    } = useContext(SocketContext)
    
    const mark = board.moves[row][column]?.mark

    const moveAllowed = !mark && board.turn === myUser?.mark && board.guest && !finished

    const makeMove = () => {
        if(moveAllowed) {
            socket?.emit("make move", boardId, myUser, row, column)
        }
    }  

    const finishedStyle = {
        borderColor: "#fff",
        color: "#fff"
    }

    return (
        <td 
            style={finished ? finishedStyle : {}} 
            onClick={() => makeMove()} 
            className={`${styles.cell} ${moveAllowed ? styles.cellEnabled : ''}`}
        >
            {mark}
        </td>
    )
}

export default Cell
