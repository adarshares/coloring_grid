import React, { useState } from 'react';
import "./../App.css";
import { handleClick, color, colorList } from './StateHandler';
function Box(props) {
  const [state,setState] = useState(colorList[+props.id]);

  const handleOnClick = () => {
    setState(color[0]);
    handleClick(props.id);
  }

  const onMouseEnter = () => {
    setState(color[0]);
  }

  const onMouseLeave = () => {
    setState(colorList[+props.id]);
  }
  
  console.log(`rerendered ${props.id} component`);
  return (
    <div style={{backgroundColor:state,}} id={props.id} className="customBox" onClick={handleOnClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
  )
}

export default Box;