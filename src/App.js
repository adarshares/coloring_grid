import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [colour,setColour] = useState("black");

  const [colorList,setColorList] = useState(Array(256).fill('white'));

  function handleClick(event){
    console.log(event.target.id);
  }
  function handleMouseEnter(event){
    event.target.style = `background-color:black;`;
  }
  function handleMouseLeave(event){
    event.target.style = `background-color:white;`
  }
  return (
    <>
    
    <div className="globalContainer">
      <div className="colourPicker"></div>


      <div className="container">
        <div className="wrapper">

          <div id="0" className="customBox" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
          <div id="1" className="customBox" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
          <div id="2" className="customBox" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
          <div id="3" className="customBox" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>

        </div>
      </div>


      <div className="features">
      </div>

    </div>

    </>
  );
}

export default App;
