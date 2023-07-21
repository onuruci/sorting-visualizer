import sleep from "./sleep";
import { green } from "../utils/colors";

let array: number[];

const implementQuick = async (bars: number[], iStart: number, iEnd: number, setBars: any) => {
  if (iStart >= iEnd || iStart < 0) {
    return;
  }

  let p = await partition(array, iStart, iEnd, setBars);

  implementQuick(array, iStart, p - 1, setBars);

  setBars([...array]);
  //await sleep(50);

  implementQuick(array, p, iEnd, setBars);

  setBars([...array]);
  //await sleep(150);

  return;
};

const partition = async (array: number[], iStart: number, iEnd: number, setBars: any) => {
  let pivot = array[iEnd];
  let pivotIndex = iStart - 1;

  for (let i = iStart; i < iEnd; i++) {
    if (array[i] <= pivot) {
      pivotIndex++;
      let temp = array[pivotIndex];
      array[pivotIndex] = array[i];
      array[i] = temp;
      setBars([...array]);
      await sleep(100);
    }
  }

  pivotIndex++;
  let temp = array[pivotIndex];
  array[pivotIndex] = array[iEnd];
  array[iEnd] = temp;
  setBars([...array]);
  await sleep(100);

  return pivotIndex;
}

const quickSort = async (bars: number[], setBars: any, setSelected: any, pace: number) => {
  array = [...bars];

  await implementQuick(array, 0, array.length - 1, setBars);

  console.log(array);

  setBars([...array]);

};

export default quickSort;