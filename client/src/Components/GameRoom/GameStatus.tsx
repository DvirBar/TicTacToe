import React from 'react';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { iBoard, Status } from '../WaitingRoom/types';
import GameBoard from './GameBoard/GameBoard';
import styles from "./GameRoom.module.css";

interface iProps {
    status: Status | undefined
    board: iBoard
}

function GameStatus({ status, board }: iProps) {
    const {
        user
    } = useContext(SocketContext)

    const hasWon = board.winner === user?.mark

    let message = ""
    let color = ""
    
    if(status === Status.TIE) {
        message = "That's a tie"
        color = "#f7e325"
    } else if(hasWon) {
        message = "You won!"
        color = "#007d0f"
    } else {
        message = "You lost..."
        color = "#8a1200"
    }

    return (
        <div 
            style={{ backgroundColor: color }} 
            className={styles.gameStatusWrapper}
        >
            
            <div className={styles.statusMessage}>
                {message}
            </div>
            <div className={styles.identity}>
                (You were {user?.mark})
            </div>
            <GameBoard board={board} finished={true} />
        </div>
    )
}

export default GameStatus
