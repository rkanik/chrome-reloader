export * from "@@/common/helpers";

import type { HMR } from "@/types";

export const msToHMR = (ms: number): HMR => {
  const h = Math.floor(ms / 1000 / 60 / 60);
  const m = Math.floor((ms / 1000 / 60 / 60 - h) * 60);
  const s = Math.floor(((ms / 1000 / 60 / 60 - h) * 60 - m) * 60);
  return [h, m, s];
};

export const hmrToMs = ([hour, min, sec]: HMR): number => {
  return (hour * 60 * 60 + min * 60 + sec) * 1000;
};
