import './App.css';
import { useCallback, useReducer } from 'react';
import Box from './components/Box';
import ColorPicker from './components/ColorPicker';
import { KEY_STATE, INITIAL_STATE } from './constant/constants';
import { Action, State, ColorFromPalette } from './constant/interfaces';
import { ACTION_TYPES } from './constant/interfaces';


function handleLocalStorage(state:State){
  window.localStorage.setItem(KEY_STATE,JSON.stringify(state));
}

const InitializeState = (init:object) => {
  const state:State = {
    ...INITIAL_STATE,
    ...(JSON.parse(window.localStorage.getItem(KEY_STATE)??"{}")),
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
const insertStateChanges=(cellsColorHistory:Array<string> ,cellsIndexHistory:Array<number> ,prevColor:string ,currentColor:string ,id:number)=>{
  cellsColorHistory.push(prevColor);
  cellsColorHistory.push(currentColor);
  cellsIndexHistory.push(id);
  cellsIndexHistory.push(id);
}

const handleCellClick = (prevState:State,id:number|undefined) => {
  if(id === undefined){
    return prevState;
  }
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
const handleUndo=(prevState:State)=>{
  if(prevState.cellsCurrentPointer === -1 || prevState.cellsCurrentPointer === 0){return null;}
  const prevPointer = prevState.cellsCurrentPointer;
  const newPointer = prevPointer%2?prevPointer-1:prevPointer-2;
  prevState.colorOfCells[prevState.cellsIndexHistory[newPointer]] = prevState.cellsColorHistory[newPointer];

  return {
    ...prevState,
    cellsCurrentPointer: newPointer,
  }
}

const handleRedo=(prevState:State)=>{
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
const handleColorPick=(prevState:State,colorName:string|undefined)=>{
  if(colorName === undefined){
    return prevState;
  }
  return {
    ...prevState,
    selectedColor : colorName,
  }
}

//CHANGE_CELL_COLOR, UNDO, REDO, RESET, COLOR_PICK
function reducer(prevState:State,action:Action){
  switch(action.type){
    case ACTION_TYPES.CHANGE_CELL_COLOR:{//change cell color
      const newState = {
        ...prevState,
        ...handleCellClick(structuredClone(prevState),action.id),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case ACTION_TYPES.UNDO:{
      const newState = {
        ...prevState,
        ...handleUndo(structuredClone(prevState)),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case ACTION_TYPES.REDO:{
      const newState = {
        ...prevState,
        ...handleRedo(structuredClone(prevState)),
      };
      handleLocalStorage(newState);
      return newState;
    }

    case ACTION_TYPES.RESET:{
      const newState = {
        ...handleReset(),
      };
      handleLocalStorage(newState);
      return newState;
    }
    case ACTION_TYPES.COLOR_PICK:{
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
    {type: ACTION_TYPES.RESET, label: "Reset"},
    {type: ACTION_TYPES.UNDO, label: "Undo"},
    {type: ACTION_TYPES.REDO, label: "Redo"},
  ];
  
  return (
    <>
    
      <div className="globalContainer">
        
        <ColorPicker onChange={(colorName:ColorFromPalette)=>{dispatch({type:"COLOR_PICK",colorName:(colorName.hex).toString()})}}/>
        <div className="container">
          <div className="wrapper">
            {state.colorOfCells.map((item,index) => {
              return <Box key={index} boxColor={item} id={index} onClick={dispatch} selectedColor={state.selectedColor}/>;
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
