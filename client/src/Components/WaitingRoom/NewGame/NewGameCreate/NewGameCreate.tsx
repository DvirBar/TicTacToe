import React, { useState, useRef, KeyboardEvent } from 'react'
import { useContext } from 'react';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import { SocketContext, useSocket } from '../../../../context/SocketContext';
import styles from "./NewGameCreate.module.css";

interface IProps {
    display: boolean
    setDisplay: (display: boolean) => void
}

function NewGameCreate({ display, setDisplay }: IProps): JSX.Element {
    const [name, setName] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, display, () => setDisplay(false));

    const socket = useSocket()
    const {
        user
    } = useContext(SocketContext)


    const createBoard = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            socket?.emit("create board", name, user?.id)
        }
    }
    
    return (
        <div className={`${styles.wrapper} ${display ? styles.wrapperDisplay : ""}`}>
            <input 
            ref={ref}
            className={styles.input}
            type="text" 
            value={name} 
            placeholder="Room name..."
            onKeyPress={e => createBoard(e)}
            onChange={e => setName(e.target.value)} />
        </div>
    )
}

export default NewGameCreate
