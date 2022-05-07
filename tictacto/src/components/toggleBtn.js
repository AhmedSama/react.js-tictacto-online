import React, { useRef } from 'react'

export default function ToggleBtn({onClick}) {

    function toggle(e){
        e.target.classList.toggle("active")
        onClick()
    }
    return (
        <div className='toggle'>
            <div onClick={toggle}  className='toggle-circle'></div>
        </div>
    )
}
