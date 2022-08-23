import { Storage } from "../common";

console.log("Hello from BG");

Storage.onChanged((storage) => {
  console.log({ storage });
});
