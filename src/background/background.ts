import { Storage } from "../common";

Storage.onChanged((storage) => {
  console.log({ storage });
});



