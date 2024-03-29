import React from 'react'
import ReactDOM from 'react-dom'

export default function Popup({winner,setShowPopup,msg}) {
    const hanlde = (event) => {
        if(event.target.classList.contains("popup-container")){
            setShowPopup()
        }
    }
  return ReactDOM.createPortal(
    <div onClick={hanlde} className='popup-container'>
        <div className='popup-content'>
            <h1 className='title center'>
                {msg} <b>{winner}</b>
            </h1>
        </div>
    </div>,
    document.getElementById("portal"))
}
