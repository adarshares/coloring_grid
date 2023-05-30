import React from 'react';
import "./../App.css";

function Box(props) {
  return (
    <div style={{backgroundColor:props.boxColor,}} id={props.id} className="customBox" onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}/>
  )
}

export default Box;