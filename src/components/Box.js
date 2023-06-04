import React, { useState, memo } from 'react';
import "./../App.css";
import { handleClick, color, colorList } from './StateHandler';

const Box = memo(function Box(props) {
  const [state,setState] = useState(false);

  const handleOnClick = () => {
    handleClick(props.id);
    props.onClick();
  }

  const onMouseEnter = () => {
    //setState(color[0]);
    setState(true);
  }

  const onMouseLeave = () => {
    //setState(colorList[+props.id]);
    setState(false);
  }
  
  //console.log(`rerendered ${props.id} component`);
  return (
    <div style={{backgroundColor:state?color[0]:props.boxColor,}} id={props.id} className="customBox" onClick={handleOnClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
  )
})

export default Box;