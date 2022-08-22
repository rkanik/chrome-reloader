import type { Interval } from "@/types";

export const INTERVALS: Interval[] = [
  {
    value: 1000,
    text: "1 sec",
  },
  {
    value: 1000 * 5,
    text: "5 sec",
  },
  {
    value: 1000 * 10,
    text: "10 sec",
  },
  {
    value: 1000 * 30,
    text: "30 sec",
  },
  {
    value: 1000 * 60,
    text: "1 min",
  },
  {
    value: 1000 * 60 * 5,
    text: "5 min",
  },
  {
    value: 1000 * 60 * 10,
    text: "10 min",
  },
  {
    value: 1000 * 60 * 20,
    text: "20 min",
  },
  {
    value: 1000 * 60 * 30,
    text: "30 min",
  },
  {
    value: 1000 * 60 * 60,
    text: "1 hour",
  },
  {
    value: 1000 * 60 * 60 * 6,
    text: "6 hour",
  },
  {
    value: 1000 * 60 * 60 * 12,
    text: "12 hour",
  },
];
