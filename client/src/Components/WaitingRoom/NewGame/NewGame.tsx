import React, { useState } from 'react'
import styles from "./NewGame.module.css";
import NewGameCreate from './NewGameCreate/NewGameCreate';

function NewGame() {
    const [display, setDisplay] = useState(false)
    
    return (
        <div>
            <button 
            onClick={() => setDisplay(true)}
            className={styles.button}>
                New Game
            </button>
            <NewGameCreate
            setDisplay={setDisplay}
            display={display} />
        </div>
    )
}

export default NewGame
