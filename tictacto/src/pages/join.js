import React, { useRef,useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { context } from '../App'

export default function Join({setName,setRoomID}) {

    const socket = useContext(context)

    const name = useRef()
    const roomID = useRef()
    const navigate = useNavigate()
    const handleFormSubmit = () => {
        if(name.current.value.length === 0 && roomID.current.value.length === 0) return
        // send it throw socket to server with create event
        const data = {
          name : name.current.value,
          roomID : roomID.current.value
        }
        socket.emit("join",data)
        
    }

    // LISTENERS
    useEffect(() => {
      socket.emit("test","this msg from join page")
      socket.on("join",data=>{
        if(data.ok){
          setName(data.name)
          setRoomID(data.roomID)
          navigate("/game")
        }
        else{
          alert(data.error)
        }
      })
      return () => {
        socket.off("join")
        socket.emit("test","get out from join page")
      }
    }, [])

  return (
      <>
        <div className='form'>
            <h1 className='title center'>Join A game</h1>
            <input ref={name} className='form-input' placeholder='username...' />
            <input ref={roomID} className='form-input' placeholder='room ID...' />
            <button onClick={handleFormSubmit} className='btn primary upper'>join</button>
        </div>
        <p className='small m-10'> <Link to={"/"}>Create</Link> a new game </p>
      </>
    
  )
}
