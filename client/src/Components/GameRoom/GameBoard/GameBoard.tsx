import React from 'react'
import { iBoard } from '../../WaitingRoom/types'
import Cell from "./Cell";
import styles from "./GameBoard.module.css";

interface iProps {
    board: iBoard,
    finished?: boolean
}

function GameBoard({ board, finished }: iProps): JSX.Element {
    let rows = []
    for(let i = 0; i <= 2; i++) {
        let columns = []

        for(let j = 0; j <= 2; j++) {
            columns.push(<Cell row={i} column={j} board={board} finished={finished} />)
        }

        rows.push(
            <tr>
                {columns}
            </tr>
        )
    }
 
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <tbody>
                    {rows}
                </tbody>
            </table>    
        </div>
        
    )
}

export default React.memo(GameBoard)
