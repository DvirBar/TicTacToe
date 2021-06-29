import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import BoardListItem from './BoardListItem/BoardListItem'
import NewGame from './NewGame/NewGame'
import styles from "./WaitingRoom.module.css"


function WaitingRoom(): JSX.Element {
    const {
        boards,
    } = useContext(SocketContext)
    
    return (
        <div className={styles.waitingRoom}>
            <div className={styles.roomsContainer}>
                <h1>Tic Tac Toe</h1>
                <div>
                    {Object.keys(boards).map(boardKey => 
                        <BoardListItem 
                        key={boardKey}
                        id={boardKey}
                        status={boards[boardKey].status}
                        name={boards[boardKey].name}
                        isAvailable={!boards[boardKey].guest} />
                    )}
                </div>
                <NewGame />
            </div>
        </div>
    )
}

export default WaitingRoom
