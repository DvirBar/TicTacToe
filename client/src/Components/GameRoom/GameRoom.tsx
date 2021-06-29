import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import styles from "./GameRoom.module.css";
import GameBoard from './GameBoard/GameBoard';
import { Status } from '../WaitingRoom/types';
import GameStatus from './GameStatus';

function GameRoom() {
    const {
        boards,
        boardId,
        setBoardId,
        user
    } = useContext(SocketContext)
    
    if(boardId && boards[boardId]) {
        const board = boards[boardId]
        const leaveBoard = () => {
            setBoardId(null)
        }

        if(!board.status || board.status === Status.Playing) {
            return (
                <div className={styles.roomWrapper}>
                    <h1>{board.name}</h1>   
                    <div className={styles.informStatus}>
                        {!board.guest 
                        ?   <div>Waiting for an opponent</div>
                        :   <div>Game has started! You are playing as {user?.mark}</div>
                        }
                    </div>
                    {board.guest &&
                        <div className={styles.turnInfo}>
                            {board.turn === user?.mark 
                            ?   <div>It's your turn!</div>
                            :   <div>It's {board.turn}'s turn</div>
                            }
                        </div>
                    }
                    
                    <GameBoard board={board} />

                    <button className={styles.button} onClick={() => leaveBoard()}>leave</button>
                </div>
            )
        }
        
        return (
            <GameStatus status={board.status} board={board} />
        )
    }   
    
    return null
}

export default GameRoom
