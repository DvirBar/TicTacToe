import React, { useEffect } from 'react';
import WaitingRoom from './Components/WaitingRoom/WaitingRoom';
import "./App.css"
import { SocketContext, useSocket } from "./context/SocketContext";
import { iUser } from './types';
import GameBoard from './Components/GameRoom/GameRoom';
import { useContext } from 'react';

function App() {
  const socket = useSocket()

  const { 
    boardId,
    setUser
  } = useContext(SocketContext)

  socket?.on("get user", (user: iUser) => {
    setUser(user)
  })

  useEffect(() => {
    if(!sessionStorage.getItem('user')) {
      socket?.emit("get user")
    }
  }, [socket])
  
  return (
    <div className="App">
      {boardId
      ? <GameBoard />
      : <WaitingRoom />
      }
    </div>
  );
}

export default App;
