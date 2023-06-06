import React, { memo, useState } from 'react';
import "./../App.css";

const Box = memo((props)=>{
  const [hover,setHover] = useState(false);
  const HandleMouseEnter=()=>{
    setHover(true);
  }
  const HandleMouseLeave = () => {
    setHover(false);
  }
  const HandleClick = () => {
    props.onClick({type:"CELL_CLICK",id:+props.id})
  }
  console.log(`component ${props.id} rendered`)
  return (
    <div style={{backgroundColor:hover?props.selectedColor:props.boxColor}} id={props.id} className="customBox" onClick={HandleClick} onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseLeave}/>
  )
})

export default Box;