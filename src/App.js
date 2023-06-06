import './App.css';
import { useCallback, useReducer } from 'react';
import Box from './components/Box';
import ColorPicker from './components/ColorPicker';
import { KEY_STATE } from './constant/constants';



function HandleLocalStorage(state){
  window.localStorage.setItem(KEY_STATE,JSON.stringify(state));
}

const InitializeState = (init) => {
  const state = {
    selectedColor:"white",
    colorOfCells:Array(256).fill("white"),
    cellsColorHistory:[],
    cellsIndexHistory:[],
    cellsHistoryPointer:-1,
    ...(JSON.parse(window.localStorage.getItem(KEY_STATE))),
  };
  HandleLocalStorage(state);
  return state;
}

/*
selectedColor:"white",
colorOfCells:[Array(256).fill("white")],
cellsColorHistory:[],
cellsIndexHistory:[],
cellsHistoryPointer:-1,
*/
const InsertStateChanges=(cellsColorHistory,cellsIndexHistory,prevColor,currentColor,id)=>{
  cellsColorHistory.push(prevColor);
  cellsColorHistory.push(currentColor);
  cellsIndexHistory.push(id);
  cellsIndexHistory.push(id);
}

const HandleCellClick = (prevState,id) => {
  const prevPointer = prevState.cellsHistoryPointer;
  if(prevPointer%2 == 0){
    prevState.cellsColorHistory.splice(prevPointer);
    prevState.cellsIndexHistory.splice(prevPointer);
  }
  InsertStateChanges(prevState.cellsColorHistory,prevState.cellsIndexHistory,prevState.colorOfCells[id],prevState.selectedColor,id);
  prevState.colorOfCells[id] = prevState.selectedColor;
  return {
    ...prevState,
    cellsHistoryPointer : prevPointer%2?prevPointer+2:prevPointer+1,
  }
}
const HandleUndo=(prevState)=>{
  if(prevState.cellsHistoryPointer === -1 || prevState.cellsHistoryPointer === 0){return null;}
  const prevPointer = prevState.cellsHistoryPointer;
  const newPointer = prevPointer%2?prevPointer-1:prevPointer-2;
  prevState.colorOfCells[prevState.cellsIndexHistory[newPointer]] = prevState.cellsColorHistory[newPointer];

  return {
    ...prevState,
    cellsHistoryPointer: newPointer,
  }
}

const HandleRedo=(prevState)=>{
  if(prevState.cellsHistoryPointer+1 >= prevState.cellsColorHistory.length){return null;}
  const prevPointer = prevState.cellsHistoryPointer;
  const newPointer = prevPointer%2?prevPointer+2:prevPointer+1;
  prevState.colorOfCells[prevState.cellsIndexHistory[newPointer]] = prevState.cellsColorHistory[newPointer];
  return {
    ...prevState,
    cellsHistoryPointer : newPointer,
  }
}

const HandleReset = ()=>{
  return {
    selectedColor:"white",
    colorOfCells:Array(256).fill("white"),
    cellsColorHistory:[],
    cellsIndexHistory:[],
    cellsHistoryPointer:-1,
  };
}
const HandleColorPick=(prevState,colorName)=>{
  return {
    ...prevState,
    selectedColor : colorName,
  }
}

//CELL_CLICK, UNDO, REDO, RESET, COLOR_PICK
function reducer(prevState,action){
  switch(action.type){
    case "CELL_CLICK":{
      const newState = {
        ...prevState,
        ...HandleCellClick(structuredClone(prevState),action.id),
      };
      HandleLocalStorage(newState);
      return newState;
    }

    case "UNDO":{
      const newState = {
        ...prevState,
        ...HandleUndo(structuredClone(prevState)),
      };
      HandleLocalStorage(newState);
      return newState;
    }

    case "REDO":{
      const newState = {
        ...prevState,
        ...HandleRedo(structuredClone(prevState)),
      };
      HandleLocalStorage(newState);
      return newState;
    }

    case "RESET":{
      const newState = {
        ...HandleReset(),
      };
      HandleLocalStorage(newState);
      return newState;
    }
    case "COLOR_PICK":{
      const newState = {
        ...prevState,
        ...HandleColorPick(structuredClone(prevState),action.colorName),
      }
      HandleLocalStorage(newState);
      return newState;
    }
    default:
      return prevState;
  }
}

function App() {

  const [state,dispatch] = useReducer(reducer,{},InitializeState);

  const features = [
    {type: 'RESET', label: 'Reset', onClick: 'RESET'},
    {type: 'UNDO', label: 'Undo', onClick: 'UNDO'},
    {type: 'REDO', label: 'Redo', onClick: 'REDO'},
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
            return <button key={item.type} onClick={()=>{dispatch({type:item.onClick})}}>{item.label}</button>
            })}
        </div>

      </div>

    </>
  );
}

export default App;
