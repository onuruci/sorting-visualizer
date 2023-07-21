import sleep from "./sleep";
import { green, purple } from "../utils/colors";

let array: number[];

const swapView = (index1: number, index2: number, pivot: number, setSelected: any) => {
  let item1: SelectedItem = {
    index: index1,
    color: green,
  }

  let item2: SelectedItem = {
    index: index2,
    color: green,
  }

  let pivotItem: SelectedItem = {
    index: pivot,
    color: purple,
  }

  setSelected([item1, item2, pivotItem]);

}

const implementQuick = async (bars: number[], iStart: number, iEnd: number, setBars: any, setSelected: any) => {
  if (iStart >= iEnd || iStart < 0) {
    return;
  }

  let p = await partition(array, iStart, iEnd, setBars, setSelected);

  await implementQuick(array, iStart, p - 1, setBars, setSelected);

  setBars([...array]);

  await implementQuick(array, p, iEnd, setBars, setSelected);

  setBars([...array]);

  return;
};

const partition = async (array: number[], iStart: number, iEnd: number, setBars: any, setSelected: any) => {
  let pivot = array[iEnd];
  let pivotIndex = iStart - 1;

  for (let i = iStart; i < iEnd; i++) {
    if (array[i] <= pivot) {
      pivotIndex++;
      let temp = array[pivotIndex];
      array[pivotIndex] = array[i];
      array[i] = temp;

      swapView(i, pivotIndex, iEnd, setSelected);
      await sleep(100);

      setBars([...array]);
      await sleep(100);
    }
  }

  pivotIndex++;
  let temp = array[pivotIndex];
  array[pivotIndex] = array[iEnd];
  array[iEnd] = temp;
  swapView(iEnd, pivotIndex, iEnd, setSelected);
  await sleep(100);

  setBars([...array]);
  await sleep(100);

  return pivotIndex;
}

const quickSort = async (bars: number[], setBars: any, setSelected: any, pace: number) => {
  array = [...bars];

  await implementQuick(array, 0, array.length - 1, setBars, setSelected);

  setSelected([]);
  setBars([...array]);


};

export default quickSort;