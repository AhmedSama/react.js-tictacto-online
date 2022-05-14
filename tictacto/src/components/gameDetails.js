import React from 'react'
import ReactDOM from 'react-dom'
export default function GameDetails({gameData}) {

  return ReactDOM.createPortal(
    <div className='game-details'>
        <div className='player'>
            <h1 className='player-name'>{gameData[0].name}</h1>
            <p className='player-score'>{gameData[0].score}</p>
        </div>
        <div className='player'>
            <h1 className='player-name'>{gameData[1].name}</h1>
            <p className='player-score'>{gameData[1].score}</p>
        </div>
    </div> , document.getElementById("game-details")
  )
}
