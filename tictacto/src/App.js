import React, { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client"
import Create from "./pages/create";
import Game from "./pages/game";
import ID from "./pages/id";
import Join from "./pages/join";
import Container from "./components/container"



export const context = createContext()

const server = "http://localhost:3001"
const socket = io(server, { autoConnect: false })

function App() {

  const [name,setName] = useState(null)
  const [myData,setMyData] = useState(null)
  const [otherPlayerData,setOtherPlayerData] = useState(null)
  const [gameData,setGameData] = useState(null)
  const [roomID,setRoomID] = useState(null)
  const [myTurn,setMyTurn] = useState(false)
  const [xo,setXO] = useState("")

  console.log(name)

  useEffect(()=>{
    socket.connect()
    socket.on("joined",data=>{
      if(data.ok){
        setMyTurn(data.yourTurn)
        setXO(data.xo)
      }
    })
  },[])

  useEffect(()=>{
    socket.on("users-data",data=>{
      setGameData(data)  
    })
    socket.on("win",data=>{
      setGameData(data)
    })
    return ()=>{
      socket.off("users-data")
      socket.off("win")
    }
  },[])
  

  return (
    <context.Provider value={socket}>
    <Container>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create setRoomID={setRoomID} setName={setName} />} />
        <Route path="/join" element={<Join setRoomID={setRoomID} setName={setName} />} />
        <Route path="/join/:roomID" element={<ID setName={setName} setRoomID={setRoomID} />} />
        <Route path="/game" element={<Game gameData={gameData} setGameData={setGameData} myData={myData} setMyData={setMyData} otherPlayerData={otherPlayerData} setOtherPlayerData={setOtherPlayerData} xo={xo} setXO={setXO} myTurn={myTurn} setMyTurn={setMyTurn} name={name} roomID={roomID} />} />
      </Routes>
    </BrowserRouter>
    </Container>
    </context.Provider>
  );
}

export default App;
