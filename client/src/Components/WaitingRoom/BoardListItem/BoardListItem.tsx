import React from 'react'
import { useContext } from 'react';
import { SocketContext, useSocket } from '../../../context/SocketContext';
import { Status } from '../types';
import styles from "./BoardListItem.module.css";

interface IProps {
    id: string;
    name: string;
    status?: Status;
    isAvailable: boolean;
}

function BoardListItem({ id, name, isAvailable, status }: IProps) {
    const socket = useSocket()

    const {
        user,
    } = useContext(SocketContext)
    
    const joinGame = () => {
        if(isAvailable) {
        socket?.emit("join board", user?.id, id)
        }
    }

    return (
        <div onClick={() => joinGame()} className={styles.boardListItem}>
            <span>{name}</span>
            {isAvailable
            ?   <span>Available</span>
            :   <span>{status}</span>
            }
        </div>
    )
}

export default BoardListItem
