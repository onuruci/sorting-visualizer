type SelectedItem = {
  index: number;
  color: string;
}

type AlgorithmType = (
  bars: number[],
  setBars: any,
  setSelected: any,
  pace: number
) => void;