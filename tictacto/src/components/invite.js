import React, { useEffect, useRef } from 'react'
import ReactDOM  from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloseOutline,IoCopyOutline } from "react-icons/io5"
import Draggable from 'react-draggable'

export default function Invite({roomID,setShowInvite}) {
    const link = useRef()
    const id = useRef()
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    const notify = () => toast.success('copyed to clipboard');

    function copyText(element){
        navigator.clipboard.writeText(element.innerText)
        notify()
    }

    useEffect(()=>{

    },[])

    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
      
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        e.target.style.top = (e.target.offsetTop - pos2) + "px";
        e.target.style.left = (e.target.offsetLeft - pos1) + "px";
    }
      
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    return ReactDOM.createPortal(
        <div onMouseDown={dragMouseDown} className='invite-container'>
            <div onClick={()=>setShowInvite(false)}>
                <IoCloseOutline className='close-icon' />
            </div>
            <p className='small ml-10 mt-10'>Invite by roomID</p>
            <div onClick={()=>copyText(id.current)} className='invite'>
                <IoCopyOutline className='invite-icon' />
                <div ref={id}>{roomID}</div>
            </div>
            <p className='small ml-10 mt-10'>Invite by Link</p>
            <div onClick={()=>copyText(link.current)} className='invite'>
                <IoCopyOutline className='invite-icon' />
                <div ref={link}>http://localhost:3000/join/{roomID}</div>
                <Toaster toastOptions={ {duration: 1000}} />
            </div>
            
        </div>, document.getElementById("invite")
    )
}
