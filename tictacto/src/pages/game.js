import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../App.js'
import Cell from '../components/cell.js'
import GameDetails from '../components/gameDetails.js'
import Invite from '../components/invite.js'
import Popup from '../components/popup.js'

export default function Game({name,roomID,myTurn,setMyTurn,xo,gameData,
  setGameData,setMyData,myData,setOtherPlayerData,otherPlayerData}) {
  const socket = useContext(context)
  const navigate = useNavigate()
  const [popupMsg, setPopupMsg] = useState("the winner is ")
  useEffect(()=>{
    if(name === null || roomID === null){
      navigate("/")
    }
  },[])
  
  useEffect(() => {
    socket.on("played",data=>{
      otherPlayerPlay(Number(data.index),data.xo,data.name)
      
    })

    return () => {
      socket.off("played")
    }
  }, [])


  const [showInvite,setShowInvite] = useState(true)
  // listen here for the play event where you can put the index of the cell
  const [grid,setGrid] = useState(["","","","","","","","",""])
  const [endgame,setEndGame] = useState(false)
  const [winner,setWinner] = useState(null)
  const [showPopup,setShowPopup] = useState(false)
  const winStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  const checkWin = () => {
    for(let i = 0; i < winStates.length; i++){
      const [x,y,z] = winStates[i]
      if(grid[x] !== "" && grid[x]===grid[y] && grid[x]===grid[z]){
        return true
      }
    }
    return false
  }
  const checkDraw = () => {
    let counter = 0
    for(let i = 0; i < grid.length; i++){
      if(grid[i] !== ""){
        counter++
      }
    }
    return counter === grid.length
  }

  function otherPlayerPlay(index,x_or_o,name_){
    const newGrid = grid
    newGrid[index] = x_or_o
    setGrid(newGrid)

    if(checkWin()){
      setPopupMsg("The winner is ")
      setWinner(x_or_o)
      // const data = {
      //   name : name_,
      //   roomID : roomID
      // }
      // socket.emit("win",data)
      setShowPopup(true)
      setEndGame(true)
    }
    else if(checkDraw()){
      setPopupMsg("no one wins it is a ")
      setWinner("draw")
      setShowPopup(true)
      setEndGame(true)
    }
    setMyTurn(true)
  }
  const hanldeClick = (index) => {
    console.log(myTurn)
    if( endgame ) return //show modal with the state of the game
    if(grid[index] !== "") return
    if(!myTurn) return

    const newGrid = grid
    newGrid[index] = xo
    setGrid(newGrid)

    if(checkWin()){
      setPopupMsg("The winner is ")
      setWinner(xo)
      const data = {
        name : name,
        roomID : roomID
      }
      socket.emit("win",data)
      setShowPopup(true)
      setEndGame(true)
    }
    else if(checkDraw()){
      setPopupMsg("no one wins it is a ")
      setWinner("draw")
      setShowPopup(true)
      setEndGame(true)
    }
    // send to other user before changing the xo
    socket.emit("play",{roomID:roomID,index:index,xo:xo,name:name})
    setMyTurn(false)
  }

  return (
    <>
      {showInvite &&
        <Invite setShowInvite={setShowInvite} roomID={roomID} />
      }
      {
        gameData ?
        <GameDetails gameData={gameData} />
        :
        <button onClick={()=>{
          setShowInvite(true)
          }} className='btn mb-10'>
          Invite
        </button>
        
      }
      
      <div className='grid'>
        {grid.map((item,key)=>{
          return <Cell hanldeClick={()=>hanldeClick(key)} key={key} item={item} />
        })}
        
      </div>
      {showPopup &&
        <Popup setShowPopup={()=>setShowPopup(!showPopup)} msg={popupMsg} winner={winner.toUpperCase()} />
      }
    </>
    
  )
}
