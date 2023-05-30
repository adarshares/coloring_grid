import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Box from './components/Box';
import { CirclePicker } from 'react-color';

function App() {
  const [color,setColor] = useState("white");

  const [colorList,setColorList] = useState(Array(4).fill('white'));

  function handleClick(event){
    let prevColorList = colorList;
    prevColorList[+event.target.id] = color;
    setColorList(colorList);
  }
  function handleMouseEnter(event){
    event.target.style = `background-color:${color};`;
  }
  function handleMouseLeave(event){
    event.target.style = `background-color:${colorList[event.target.id]};`
  }
  function handleColorPick(colorName,mouseEvent){
    console.log(colorName.hex)
    setColor(colorName.hex);
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
      </div>
    </div>

    </>
  );
}

export default App;
