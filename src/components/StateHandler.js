import { KEY_COLOR,KEY_COLOR_LIST,KEY_STACK,KEY_STACK_INDEX,KEY_STACK_POINTER } from './../constant/constants';


const initializeColorList = () => {
    let colorList = window.localStorage.getItem(KEY_COLOR_LIST);
    if(colorList){
      colorList = colorList.split(",");
    }
    else{
      colorList = Array(256).fill("white");
    }
    return colorList;
}


const initializeColor = () => {
    let color = window.localStorage.getItem(KEY_COLOR);
    if(color){
        color = color.split(",")
    }
    else{
      color = ["white"];
    }
    return color;
}


const initializeStack = () => {
    let stack = window.localStorage.getItem(KEY_STACK);
    if(stack){
      stack = stack.split(",");
    }
    else{
      stack = [];
    }
    return stack;
}


const initializeStackIndex = () => {
    let stackIndex = window.localStorage.getItem(KEY_STACK_INDEX);
    if(stackIndex){
      stackIndex = stackIndex.split(',');
    }
    else{
      stackIndex = [];
    }
    return stackIndex;
}


const initializeStackPointer = () => {
    let stackPointer = window.localStorage.getItem(KEY_STACK_POINTER);
    if(stackPointer){
        stackPointer = stackPointer.split(",");
    }
    else{
      stackPointer = ["-1"];
    }
    return stackPointer;
}
  

const handleLocalStorageColorList=(colorList)=>{
    window.localStorage.setItem(KEY_COLOR_LIST,colorList.toString());
}


const handleLocalStorageColor=(color)=>{
    window.localStorage.setItem(KEY_COLOR,color.toString());
}


const handleLocalStorageStack=(stack)=>{
    window.localStorage.setItem(KEY_STACK,stack.toString());
}


const handleLocalStorageStackIndex=(stackIndex)=>{
    window.localStorage.setItem(KEY_STACK_INDEX,stackIndex.toString());
}


const handleLocalStorageStackPointer=(stackPointer)=>{
    window.localStorage.setItem(KEY_STACK_POINTER,stackPointer.toString());
}


export const color = initializeColor();
export const colorList = initializeColorList();
export const stack = initializeStack();
export const stackIndex = initializeStackIndex();
export const stackPointer = initializeStackPointer();

// const [color,setColor] = useState(initializeColor());
// const [colorList,setColorList] = useState(initializeColorList());
// const [stack,setStack] = useState(initializeStack());
// const [stackIndex,setStackIndex] = useState(initializeStackIndex());
// const [stackPointer,setStackPointer] = useState(initializeStackPointer());


export const handleClick=(id)=>{
  
  let prevColor = colorList[+id];

  if(+stackPointer[0]%2 == 0){
    stack.length = +stackPointer[0];
    stackIndex.length = +stackPointer[0];
    stack.push(prevColor);
    stack.push(color[0]);
    stackIndex.push(id.toString());
    stackIndex.push(id.toString());
    stackPointer[0] = +stackPointer[0] + 1;
  }
  else{
    stack.push(prevColor);
    stack.push(color[0]);
    stackIndex.push(id.toString());
    stackIndex.push(id.toString());
    stackPointer[0] = +stackPointer + 2;
  }
  stackPointer[0] = stackPointer[0].toString();
  colorList[+id] = color[0];

  handleLocalStorageColorList(colorList);
  handleLocalStorageStack(stack);
  handleLocalStorageStackIndex(stackIndex);
  handleLocalStorageStackPointer(stackPointer);
}


export const handleColorPick=(colorName)=>{
  color[0] = colorName.hex;
  handleLocalStorageColor(colorName.hex);
}


export const handleResetButton = () => {
  color[0] = "white";
  handleLocalStorageColor(color);

  for(let i = 0;i<colorList.length;i++){
    colorList[i] = "white";
  }
  handleLocalStorageColorList(colorList);

  stack.length = 0;
  handleLocalStorageStack(stack);

  stackIndex.length = 0;
  handleLocalStorageStackIndex(stackIndex);

  stackPointer[0] = "-1";
  handleLocalStorageStackPointer(stackPointer);
}


export const handleUndoButton = () => {
  if(stackPointer[0] === "-1" || stackPointer[0] === "0"){return;}

  if(+stackPointer[0]%2 === 0){
    stackPointer[0] = +stackPointer[0] - 2;
  }
  else{
    stackPointer[0] = +stackPointer[0] - 1;
  }
  stackPointer[0] = stackPointer[0].toString();
  colorList[+stackIndex[+stackPointer[0]]] = stack[+stackPointer[0]];

  handleLocalStorageColorList(colorList);
  handleLocalStorageStackPointer(stackPointer);
}


export const handleRedoButton = () => {
  if((+stackPointer[0] + 1) >= stack.length){
    return;
  }
  if(stackPointer[0]%2 == 0){
    stackPointer[0] = +stackPointer[0] + 1;
  }
  else{
    stackPointer[0] = +stackPointer[0] + 2;
  }
  stackPointer[0] = stackPointer[0].toString();
  colorList[+stackIndex[+stackPointer[0]]] = stack[+stackPointer[0]];

  handleLocalStorageStackPointer(stackPointer);
  handleLocalStorageColorList(colorList);
}