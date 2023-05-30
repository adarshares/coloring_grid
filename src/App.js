import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Box from './components/Box';

function App() {
  const [color,setColor] = useState("black");

  const [colorList,setColorList] = useState(Array(4).fill('white'));

  function handleClick(event){
    console.log(event.target.id);
  }
  function handleMouseEnter(event){
    event.target.style = `background-color:${color};`;
  }
  function handleMouseLeave(event){
    event.target.style = `background-color:${colorList[event.target.id]};`
  }
  return (
    <>
    
    <div className="globalContainer">
      <div className="colourPicker">
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
