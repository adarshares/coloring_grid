import React from 'react'
import "./../App.css"
import { handleRedoButton, handleUndoButton, handleResetButton } from './StateHandler'

function Features() {
  return (
    <div className="features">
        <button onClick={handleResetButton}>RESET</button>
        <button onClick={handleUndoButton}>UNDO</button>
        <button onClick={handleRedoButton}>REDO</button>
    </div>
  )
}

export default Features