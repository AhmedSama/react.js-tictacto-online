import React, { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client"
import Create from "./pages/create";
import Game from "./pages/game";
import ID from "./pages/id";
import Join from "./pages/join";




export const context = createContext()

const server = "http://localhost:3001"
const socket = io(server, { autoConnect: false })

function App() {

  const [name,setName] = useState(null)
  const [roomID,setRoomID] = useState(null)
  const [myTurn,setMyTurn] = useState(false)
  const [xo,setXO] = useState("")

  useEffect(()=>{
    socket.connect()
    socket.on("joined",data=>{
      console.log(data)
      if(data.ok){
        setMyTurn(data.yourTurn)
        setXO(data.xo)
      }
    })
  },[])

  return (
    <context.Provider value={socket}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create setRoomID={setRoomID} setName={setName} />} />
        <Route path="/join" element={<Join setRoomID={setRoomID} setName={setName} />} />
        <Route path="/join/:roomID" element={<ID setName={setName} setRoomID={setRoomID} />} />
        <Route path="/game" element={<Game  xo={xo} setXO={setXO} myTurn={myTurn} setMyTurn={setMyTurn} name={name} roomID={roomID} />} />
      </Routes>
    </BrowserRouter>
    </context.Provider>
  );
}

export default App;
