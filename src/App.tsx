import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [barCount, setBarCount] = useState(20);
  const [bars, setBars] = useState([1]);
  const [selectedNum, setSelected] = useState(0);

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleShuffle = async () => {
    let array = bars;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      setBars([...array]);
      await sleep(10);
    }

  };

  const handleBubbleSort = async () => {
    let array = bars;
    let sorted = false;
    let lenToLoop = array.length;

    while (!sorted) {
      let maxNum = array[0];
      sorted = true;

      for (let i = 1; i < lenToLoop; i++) {
        if (array[i] >= maxNum) {
          maxNum = array[i];
          setSelected(i);
        } else {
          let temp = array[i];
          array[i] = array[i - 1];
          array[i - 1] = temp;
          sorted = false;
          setSelected(i);
        }
        setBars([...array]);
        await sleep(50);
      }
      lenToLoop -= 1;
      console.log(lenToLoop);
    }

    setBars([...array]);
    setSelected(-1);
  };

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
      <button onClick={() => handleShuffle()}> Shuffle</button>
      <button onClick={() => handleBubbleSort()}> Sort</button>
      {selectedNum}
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
