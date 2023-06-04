import React from 'react'
import "./../App.css";
import { CirclePicker } from 'react-color';
import { handleColorPick } from './StateHandler';

function ColorPicker() {
  return (
    <div className="colorPicker">
        <CirclePicker onChange={handleColorPick} />
    </div>
  )
}

export default ColorPicker