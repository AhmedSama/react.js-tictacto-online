import React, { useRef,useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { context } from '../App'

export default function Create({setName,setRoomID}) {
    const socket = useContext(context)
    const name = useRef()
    const navigate = useNavigate()
    const hand = () => {
        if(name.current.value.length === 0) return
        // send it throw socket to server with create event
        const data = {
          name : name.current.value,
        }
        socket.emit("create",data)       
    }
    // LISTENERS
    useEffect(() => {

      socket.on("create",data=>{
        if(data.ok){
          console.log(data)
          setName(data.name)
          setRoomID(data.roomID)
          navigate("/game")
        }
        else{
          alert(data.error)
        }
      })
      return () => {
        socket.off("create")
      }
    }, [])
    

  return (
      <>
        <div className='form'>
            <h1 className='title center'>Create A game</h1>
            <input ref={name} className='form-input' placeholder='username...' />
            <button onClick={hand} className='btn primary upper'>create</button>
        </div>
        <p className='small m-10'> <Link to={"/join"}>Join</Link> a game by ID</p>
      </>
    
  )
}
