import React from 'react'
import "./../App.css"
import { CirclePicker } from 'react-color';
import { ColorPickerProps } from '../constant/interfaces';

function ColorPicker(props:ColorPickerProps) {
  return (
    <div className="colorPicker">
        <CirclePicker onChange={props.onChange} />
    </div>
  )
}

export default ColorPicker