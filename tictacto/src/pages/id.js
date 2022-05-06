import React, { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { context } from '../App'

export default function ID({setName,setRoomID}) {
    const navigate = useNavigate()
    const params = useParams()
    const name = useRef()
    const socket = useContext(context)
    const handleFormSubmit = () => {
        if(name.current.value.length === 0) return
        // send it throw socket to server with create event
        const data = {
          name : name.current.value,
          roomID : params.roomID
        }
        socket.emit("join",data)
        
    }

    useEffect(() => {
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
        }
      }, [])


  return (
    <>
        <div className='form'>
            <h1 className='title center'>Choose a name to start a game</h1>
            <input ref={name} className='form-input' placeholder='username...' />
            <button onClick={handleFormSubmit} className='btn primary upper'>join</button>
        </div>
        <p className='small m-10'> <Link to={"/"}>Create</Link> a new game </p>
    </>
  )
}
