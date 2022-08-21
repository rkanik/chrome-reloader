import { Storage } from "../common";

console.log("Hello App.js");

Storage.onChanged((storage) => {
  console.log({ storage: storage });
});


