import React from 'react'
import "./../App.css"
//import { handleRedoButton, handleUndoButton, handleResetButton } from './StateHandler'

function Features(props) {
  return (
    <div className="features">
        <button onClick={props.onResetClick}>RESET</button>
        <button onClick={props.onUndoClick}>UNDO</button>
        <button onClick={props.onRedoClick}>REDO</button>
    </div>
  )
}

export default Features