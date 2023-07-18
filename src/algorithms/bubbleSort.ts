import sleep from "./sleep";

// set types

const bubbleSort = async (bars: number[], setBars: any, setSelected: any) => {
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

  console.log(bars);

  setBars([...array]);
  setSelected(-1);
};

export default bubbleSort;