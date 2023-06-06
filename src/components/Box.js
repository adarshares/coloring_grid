import React, { memo, useState } from 'react';
import "./../App.css";

const Box = memo((props)=>{
  const [hover,setHover] = useState(false);
  const handleMouseEnter=()=>{
    setHover(true);
  }
  const handleMouseLeave = () => {
    setHover(false);
  }
  const handleClick = () => {
    props.onClick({type:"CHANGE_CELL_COLOR",id:+props.id})
  }
  //console.log(`component ${props.id} rendered`)
  return (
    <div style={{backgroundColor:hover?props.selectedColor:props.boxColor}} id={props.id} className="customBox" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
  )
})

export default Box;