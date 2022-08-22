export type HMR = [number, number, number];

export type Interval = {
  value: number;
  text: string;
};

export type IntervalHMR = Interval & {
   hmr: HMR;
}
