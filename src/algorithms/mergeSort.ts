import sleep from "./sleep";

let arrBars: number[] = [];

const green = "bg-green-700";
const purple = "bg-purple-700";

const addToSelected = (index: number, color: string, setSelected: any, selectedArr: SelectedItem[]) => {
  let item: SelectedItem = {
    index: index,
    color: color,
  }

  selectedArr.push(item);

  setSelected([...selectedArr]);
}

const mergeVisualizer = async (bars: number[], setBars: any, setSelected: any, pace: number, iStart: number, iEnd: number) => {
  let array = arrBars;
  let partLen = iEnd - iStart;

  console.log(iStart, iEnd);

  if (partLen > 2) {


    let midPoint = Math.floor((iEnd - iStart) / 2) + iStart;

    let arrayFirst = await mergeVisualizer(bars, setBars, setSelected, pace, iStart, midPoint);
    let arraySecond = await mergeVisualizer(bars, setBars, setSelected, pace, midPoint, iEnd);

    console.log("Arrfirst:  ", arrayFirst);
    console.log("Arraysecond: ", arraySecond);

    let i = iStart, j = midPoint, len = (arrayFirst.length + arraySecond.length);
    let newArr: number[] = [];
    let selectedArr: SelectedItem[] = [];

    setSelected([]);

    for (let c = 0; c < len; c++) {
      if (i === midPoint) {
        while (j < iEnd) {
          newArr.push(arraySecond[j]);
          j++;
          c++;

          let tempArr = arrBars.slice(0, iStart).concat(newArr, arrBars.slice(c + iStart));

          addToSelected(iStart + newArr.length - 1, purple, setSelected, selectedArr);

          setBars([...tempArr]);

          await sleep(100);
        }

        break;
      }

      if (j === iEnd) {
        while (i < midPoint) {
          newArr.push(arrayFirst[i]);
          i++;
          c++;

          let tempArr = arrBars.slice(0, iStart).concat(newArr, arrBars.slice(c + iStart));

          addToSelected(iStart + newArr.length - 1, purple, setSelected, selectedArr);

          setBars([...tempArr]);

          await sleep(150);
        }


        break;
      }

      if (arrayFirst[i] >= arraySecond[j]) {
        newArr.push(arraySecond[j]);
        j++;

        addToSelected(iStart + newArr.length - 1, purple, setSelected, selectedArr);
      } else {
        newArr.push(arrayFirst[i]);
        i++;

        addToSelected(iStart + newArr.length - 1, purple, setSelected, selectedArr);
      }

      let tempArr = arrBars.slice(0, iStart).concat(newArr, arrBars.slice(c + iStart + 1));

      console.log(tempArr);

      setBars([...tempArr]);

      await sleep(150);
    }

    setSelected([]);

    arrBars = arrBars.slice(0, iStart).concat(newArr, arrBars.slice(iEnd));

    setBars([...arrBars]);
    sleep(100);

    return arrBars;
  } else if (partLen === 2) {
    // sort them
    if (array[iStart] > array[iStart + 1]) {
      let temp = array[iStart + 1];
      array[iStart + 1] = array[iStart];
      array[iStart] = temp;
    }

    arrBars = array;

    let item1: SelectedItem = {
      index: iStart,
      color: green,
    };

    let item2: SelectedItem = {
      index: iStart + 1,
      color: green,
    };

    setSelected([item1, item2]);

    await sleep(500);

    setBars([...arrBars]);

    await sleep(250);

    return arrBars;


  } else {
    return array;
  }
}



const mergeSort = async (bars: number[], setBars: any, setSelected: any, pace: number) => {
  arrBars = bars;
  let arr = await mergeVisualizer(bars, setBars, setSelected, pace, 0, bars.length);
  console.log(arr);
  setBars([...arr]);
};

export default mergeSort;