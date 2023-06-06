import './App.css';
import { useCallback, useReducer } from 'react';
import Box from './components/Box';
import ColorPicker from './components/ColorPicker';
import { KEY_STATE, INITIAL_STATE } from './constant/constants';

function handleLocalStorage(state){
  window.localStorage.setItem(KEY_STATE,JSON.stringify(state));
}

const InitializeState = (init) => {
  const state = {
    ...INITIAL_STATE,
    ...(JSON.parse(window.localStorage.getItem(KEY_STATE))),
  };
  handleLocalStorage(state);
  return state;
}

/*
selectedColor:"white",
colorOfCells:[Array(256).fill("white")],
cellsColorHistory:[],
cellsIndexHistory:[],
cellsCurrentPointer:-1,
*/
const insertStateChanges=(cellsColorHistory,cellsIndexHistory,prevColor,currentColor,id)=>{
  cellsColorHistory.push(prevColor);
  cellsColorHistory.push(currentColor);
  cellsIndexHistory.push(id);
  cellsIndexHistory.push(id);
}

const handleCellClick = (prevState,id) => {
  const prevPointer = prevState.cellsCurrentPointer;
  if(prevPointer%2 == 0){
    prevState.cellsColorHistory.splice(prevPointer);
    prevState.cellsIndexHistory.splice(prevPointer);
  }
  insertStateChanges(prevState.cellsColorHistory,prevState.cellsIndexHistory,prevState.colorOfCells[id],prevState.selectedColor,id);
  prevState.colorOfCells[id] = prevState.selectedColor;
  return {
    ...prevState,
    cellsCurrentPointer : prevPointer%2 ? prevPointer + 2 : prevPointer+1,
  }
}
const handleUndo=(prevState)=>{
  if(prevState.cellsCurrentPointer === -1 || prevState.cellsCurrentPointer === 0){return null;}
  const prevPointer = prevState.cellsCurrentPointer;
  const newPointer = prevPointer%2?prevPointer-1:prevPointer-2;
  prevState.colorOfCells[prevState.cellsIndexHistory[newPointer]] = prevState.cellsColorHistory[newPointer];

  return {
    ...prevState,
    cellsCurrentPointer: newPointer,
  }
}

const handleRedo=(prevState)=>{
  if(prevState.cellsCurrentPointer+1 >= prevState.cellsColorHistory.length){return null;}
  const prevPointer = prevState.cellsCurrentPointer;
  const newPointer = prevPointer%2?prevPointer+2:prevPointer+1;
  prevState.colorOfCells[prevState.cellsIndexHistory[newPointer]] = prevState.cellsColorHistory[newPointer];
  return {
    ...prevState,
    cellsCurrentPointer : newPointer,
  }
}

const handleReset = ()=>{
  return {
    ...INITIAL_STATE,
  };
}
const handleColorPick=(prevState,colorName)=>{
  return {
    ...prevState,
    selectedColor : colorName,
  }
}

//CHANGE_CELL_COLOR, UNDO, REDO, RESET, COLOR_PICK
function reducer(prevState,action){
  switch(action.type){
    case "CHANGE_CELL_COLOR":{//change cell color
      const newState = {
        ...prevState,
        ...handleCellClick(structuredClone(prevState),action.id),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case "UNDO":{
      const newState = {
        ...prevState,
        ...handleUndo(structuredClone(prevState)),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case "REDO":{
      const newState = {
        ...prevState,
        ...handleRedo(structuredClone(prevState)),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case "RESET":{
      const newState = {
        ...handleReset(),
      };
      handleLocalStorage(newState);
      return newState;
    }
    case "COLOR_PICK":{
      const newState = {
        ...prevState,
        ...handleColorPick(structuredClone(prevState),action.colorName),
      }
      handleLocalStorage(newState);
      return newState;
    }
    default:
      return prevState;
  }
}

function App() {

  const [state,dispatch] = useReducer(reducer,{},InitializeState);

  const features = [
    {type: 'RESET', label: 'Reset'},
    {type: 'UNDO', label: 'Undo'},
    {type: 'REDO', label: 'Redo'},
  ];
  
  return (
    <>
    
      <div className="globalContainer">
        
        <ColorPicker onChange={(colorName)=>{dispatch({type:"COLOR_PICK",colorName:colorName.hex})}}/>
        <div className="container">
          <div className="wrapper">
            {state.colorOfCells.map((item,index) => {
              return <Box key={index} boxColor={item} id={`${index}`} onClick={dispatch} selectedColor={state.selectedColor}/>;
            })}
          </div>
        </div>
        
        <div className="features">
          {features.map((item,index) => {
            return <button key={item.type} onClick={()=>{dispatch({type:item.type})}}>{item.label}</button>
            })}
        </div>

      </div>

    </>
  );
}

export default App;
