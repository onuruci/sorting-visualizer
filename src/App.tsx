import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { handleShuffle, bubbleSort, mergeSort } from './algorithms';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

function App() {
  const [barCount, setBarCount] = useState(20);
  const [bars, setBars] = useState([1]);
  const [selectedNum, setSelected] = useState<SelectedItem[]>([]);
  const [pace, setPace] = useState(50);

  const handlePaceChange = (e: any) => {
    setPace(100 - e.target.value);
  };

  const handleDataSetSizeChange = (e: any) => {
    setBarCount(e.target.value);
  };

  const getColor = (indexNum: number) => {

    for (let i = 0; i < selectedNum.length; i++) {
      if (indexNum === selectedNum[i].index) {
        return selectedNum[i].color;
      }
    }

    return "bg-red-700";
  };

  useEffect(() => {
    let arr = [];
    let change = 400 / barCount;
    for (let i = 1; i <= barCount; i++) {
      arr.push(change * i);
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
      <div className='max-w-fit p-3 mx-auto text-left flex space-x-8 items-center'><Box width={300}>
        <Typography gutterBottom>
          Dataset Size
        </Typography>
        <Slider defaultValue={20} valueLabelDisplay="auto" min={10} max={40} marks step={10} onChange={(e) => handleDataSetSizeChange(e)} />
      </Box>
        <Box width={300}>
          <Typography gutterBottom>
            Pace
          </Typography>
          <Slider defaultValue={50} valueLabelDisplay="auto" min={10} max={90} onChange={(e) => handlePaceChange(e)} />
        </Box>
        <Button variant="contained" className='bg-cyan-300 max-h-12' onClick={() => handleShuffle(bars, setBars, pace)} >Shuffle</Button>
        <Button variant="contained" className='bg-cyan-300 max-h-12' onClick={() => mergeSort(bars, setBars, setSelected, pace)}>Sort</Button>
      </div>
      <div className='flex items-center mx-auto max-w-fit mt-20 min-h-[500px]'>
        {
          bars.map((e: number, i) => {
            return (
              <div key={e} className={"w-5 p-2 mx-1 mt-auto " + getColor(i)} style={{ "height": (e).toString() + "px" }} />
            );
          })
        }
      </div>
    </div >
  );
}

export default App;
