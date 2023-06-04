import './App.css';
import Box from './components/Box';
import ColorPicker from './components/ColorPicker';
import Features from './components/Features';
import { colorList } from './components/StateHandler';

function App() {

  return (
    <>
    
    <div className="globalContainer">
      <ColorPicker/>

      <div className="container">
        <div className="wrapper">
          {colorList.map((item,index) => {
            return <Box key={index} id={`${index}`} />;
          })}
        </div>
      </div>
      
      <Features/>
    </div>

    </>
  );
}

export default App;
