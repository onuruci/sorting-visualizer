import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { handleShuffle, bubbleSort } from './algorithms';
import Slider from '@mui/material/Slider';

function App() {
  const [barCount, setBarCount] = useState(20);
  const [bars, setBars] = useState([1]);
  const [selectedNum, setSelected] = useState(0);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= barCount; i++) {
      arr.push(20 * i);
    }
    setBars([...arr]);
    console.log(arr);
  }, [barCount]);

  return (
    <div className="App">
      <div className='bg-amber-500 p-7'>
        <div className='self-start max-w-xs'>
          <h1 className='text-white font-bold text-2xl' >
            Sorting Visualizer
          </h1>
          <h2 className='text-white font-bold'>
            by @onuruci
          </h2>
        </div>
      </div>
      <button onClick={() => handleShuffle(bars, setBars)}> Shuffle</button>
      <button onClick={() => bubbleSort(bars, setBars, setSelected)}> Sort</button>
      {bars[0]}
      <div className='flex items-center mx-auto max-w-fit mt-20'>
        {
          bars.map((e: number, i) => {
            return (
              <div key={e} className={"w-5 p-3 mx-1 mt-auto " + (i !== selectedNum ? "bg-red-700" : "bg-green-700")} style={{ "height": (e).toString() + "px" }} />
            );
          })
        }
      </div>
    </div >
  );
}

export default App;
