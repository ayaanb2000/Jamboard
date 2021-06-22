import React, { useEffect, useRef, useState } from 'react';
import './App.css'


function App() {

  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
   
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
 
  }, []);

 


  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX,",",offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const eraseCanvas = ()=>{
  
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context.lineWidth=30;
    context.strokeStyle = "white";

  }

  const writeCanvas = ()=>{
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context.lineWidth=5;
    context.strokeStyle = "black";
       
  }



  return (
    <div style={{backgroundColor:"white"}}>
         <canvas
             
              onMouseDown={(e)=>{console.log(e);startDrawing(e)}}
              onMouseUp={finishDrawing}
              onMouseMove={draw}
              ref={canvasRef} 
              
         
         />
         <button style={{position:"absolute",top:100,left:100,height:50,width:100}} onClick={clearCanvas}>Clear</button>
         <button style={{position:"absolute",top:100,left:200,height:50,width:100}} onClick={eraseCanvas}>Erase</button>
         <button style={{position:"absolute",top:100,left:300,height:50,width:100}} onClick={writeCanvas}>Write</button>
        
    </div>
  );
}

export default App;


