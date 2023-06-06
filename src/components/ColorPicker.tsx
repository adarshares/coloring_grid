import React from 'react'
import "./../App.css"
import { CirclePicker } from 'react-color';

function ColorPicker(props) {
  return (
    <div className="colorPicker">
        <CirclePicker onChange={props.onChange} />
    </div>
  )
}

export default ColorPicker