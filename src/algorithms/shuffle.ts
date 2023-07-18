import sleep from "./sleep";

const handleShuffle = async (bars: number[], setBars: any) => {
  console.log("Shuffle");
  let array = bars;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    console.log(array);
    setBars([...array]);
    await sleep(10);
  }
};

export default handleShuffle;
