import { useCallback, useState } from 'react';
import './App.css';
import Box from './components/Box';
import ColorPicker from './components/ColorPicker';
import Features from './components/Features';
import { colorList, handleRedoButton, handleUndoButton, handleResetButton, handleClick } from './components/StateHandler';

function App() {
  const [state,setState] = useState(colorList);

  const handleOnClick  = useCallback( () => {
    setState([...colorList]);
  },[]);
  const onRedo = () =>{
    handleRedoButton();
    setState([...colorList]);
  }

  const onUndo = () =>{
    handleUndoButton();
    setState([...colorList]);
  }

  const onReset = () =>{
    handleResetButton();
    setState([...colorList]);
  }

  return (
    <>
    
      <div className="globalContainer">
        <ColorPicker/>

        <div className="container">
          <div className="wrapper">
            {state.map((item,index) => {
              return <Box key={index} boxColor={item} id={`${index}`} onClick={handleOnClick} />;
            })}
          </div>
        </div>
        
        <Features onRedoClick={onRedo} onUndoClick={onUndo} onResetClick={onReset}/>
      </div>

    </>
  );
}

export default App;
