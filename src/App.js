import './App.css';
import { useState } from 'react';
import Box from './components/Box';
import { CirclePicker } from 'react-color';
import { KEYCOLOR,KEYCOLORLIST,KEYSTACK,KEYSTACKINDEX,KEYSTACKPOINTER } from './constant/constants';


function initializeColorList(){
  let colorList = window.localStorage.getItem(KEYCOLORLIST);
  if(colorList){
    colorList = colorList.split(",");
  }
  else{
    colorList = Array(256).fill("white");
  }
  return colorList;
}

function initializeColor(){
  let color = window.localStorage.getItem(KEYCOLOR);
  if(color){
  }
  else{
    color = "white";
  }
  return color;
}

function initializeStack(){
  let stack = window.localStorage.getItem(KEYSTACK);
  if(stack){
    stack = stack.split(",");
  }
  else{
    stack = [];
  }
  return stack;
}

function initializeStackIndex(){
  let stackIndex = window.localStorage.getItem(KEYSTACKINDEX);
  if(stackIndex){
    stackIndex = stackIndex.split(',');
  }
  else{
    stackIndex = [];
  }
  return stackIndex;
}

function initializeStackPointer(){
  let stackPointer = window.localStorage.getItem(KEYSTACKPOINTER);
  if(stackPointer == null){
    stackPointer = -1;
  }
  return stackPointer;
}


function handleLocalStorageColorList(colorList){
  window.localStorage.setItem(KEYCOLORLIST,colorList.toString());
}

function handleLocalStorageColor(color){
  window.localStorage.setItem(KEYCOLOR,color);
}

function handleLocalStorageStack(stack){
  window.localStorage.setItem(KEYSTACK,stack.toString());
}

function handleLocalStorageStackIndex(stackIndex){
  window.localStorage.setItem(KEYSTACKINDEX,stackIndex.toString());
}

function handleLocalStorageStackPointer(stackPointer){
  window.localStorage.setItem(KEYSTACKPOINTER,stackPointer);
}

function App() {
  const [color,setColor] = useState(initializeColor());
  const [colorList,setColorList] = useState(initializeColorList());
  const [stack,setStack] = useState(initializeStack());
  const [stackIndex,setStackIndex] = useState(initializeStackIndex());
  const [stackPointer,setStackPointer] = useState(initializeStackPointer());


  function handleClick(event){
    let prevColorList = [...colorList];//create a new array since directly equating gives the same object
    let prevColor = prevColorList[+event.target.id];

    let newStack = [...stack];
    let newStackIndex = [...stackIndex];
    let newStackPointer = stackPointer;

    if(newStackPointer%2 == 0){
      newStack.length = stackPointer;
      newStackIndex.length = stackPointer;
      newStack.push(prevColor);
      newStack.push(color);
      newStackIndex.push(event.target.id);
      newStackIndex.push(event.target.id);
      newStackPointer = +newStackPointer + 1;
    }
    else{
      newStack.push(prevColor);
      newStack.push(color);
      newStackIndex.push(event.target.id);
      newStackIndex.push(event.target.id);
      newStackPointer = +newStackPointer + 2;
    }

    newStackPointer = newStackPointer.toString();

    prevColorList[+event.target.id] = color;

    setColorList(prevColorList);
    handleLocalStorageColorList(prevColorList);

    setStack(newStack);
    handleLocalStorageStack(newStack);

    setStackIndex(newStackIndex);
    handleLocalStorageStackIndex(newStackIndex);

    setStackPointer(newStackPointer);
    handleLocalStorageStackPointer(newStackPointer);

  }
  function handleMouseEnter(event){
    event.target.style = `background-color:${color};`;
  }
  function handleMouseLeave(event){
    event.target.style = `background-color:${colorList[event.target.id]};`
  }
  function handleColorPick(colorName,mouseEvent){
    setColor(colorName.hex);
    handleLocalStorageColor(colorName.hex);
  }
  function handleResetButton(){
    setColor("white");
    handleLocalStorageColor("white");

    setColorList(Array(256).fill("white"));
    handleLocalStorageColorList(Array(256).fill("white"));

    setStack([]);
    handleLocalStorageStack([]);

    setStackIndex([]);
    handleLocalStorageStackIndex([]);

    setStackPointer("-1");
    handleLocalStorageStackPointer("-1");
  }
  function handleUndoButton(){
    if(stackPointer === "-1" || stackPointer === "0"){return;}

    let newStackPointer = stackPointer;

    if(newStackPointer%2 == 0){
      newStackPointer = +newStackPointer - 2;
    }
    else{
      newStackPointer = +newStackPointer - 1;
    }
    let prevColorList = [...colorList];
    prevColorList[+stackIndex[+newStackPointer]] = stack[+newStackPointer];

    newStackPointer = newStackPointer.toString();

    setColorList(prevColorList);
    handleLocalStorageColorList(prevColorList);

    setStackPointer(newStackPointer);
    handleLocalStorageStackPointer(newStackPointer);
  }
  function handleRedoButton(){
    if((+stackPointer + 1) >= stack.length){
      return;
    }
    let newStackPointer = stackPointer;
    if(newStackPointer%2 == 0){
      newStackPointer = +newStackPointer + 1;
    }
    else{
      newStackPointer = +newStackPointer + 2;
    }



    let prevColorList = [...colorList];
    prevColorList[+stackIndex[+newStackPointer]] = stack[+newStackPointer];

    newStackPointer = newStackPointer.toString();
    setStackPointer(newStackPointer);
    handleLocalStorageStackPointer(newStackPointer);

    setColorList(prevColorList);
    handleLocalStorageColorList(prevColorList);
  }
  return (
    <>
    
    <div className="globalContainer">
      <div className="colorPicker">
        <CirclePicker onChange={handleColorPick} />
      </div>

      <div className="container">
        <div className="wrapper">
          {colorList.map((item,index) => {
            return <Box key={index} boxColor={item} id={`${index}`} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>;
          })}
        </div>
      </div>

      <div className="features">
        <button onClick={handleResetButton}>RESET</button>
        <button onClick={handleUndoButton}>UNDO</button>
        <button onClick={handleRedoButton}>REDO</button>
      </div>
    </div>

    </>
  );
}

export default App;
