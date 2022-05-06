import React, { useContext } from 'react'
import { context } from '../App'


export default function Cell({item,hanldeClick}) {
const socket = useContext(context)
  return (
    <div onClick={hanldeClick} className={"cell " + item}>
        <div className='content'></div>
    </div>
  )
}
