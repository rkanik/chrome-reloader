<script setup lang="ts">
import { reactive, ref } from "vue";
import { Storage } from "../../common";
import { hmrToMs, msToHMR } from "./helpers";

type Interval = {
  value: number;
  text: string;
};

// Storage.set("counter", 1).then(() => {
//   Storage.get().then((storage) => {
//     console.log({ storage, counter: 1 });
//   });
// });
const _location = location;

const intervals: Interval[] = [
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
];

const intervalValue = reactive({
  min: 0,
  sec: 0,
  hour: 0,
});

const currentInterval = ref<
  | Interval & {
      hmr: [number, number, number];
    }
>({
  ...intervals[2],
  hmr: msToHMR(intervals[2].value),
});

const onClickInerval = (intv: Interval) => {
  currentInterval.value = {
    ...intv,
    hmr: msToHMR(intv.value),
  };
};

const onInput = (e: Event, index: number) => {
  const hmr = currentInterval.value.hmr;
  hmr[index] = +(e.target as HTMLInputElement).value ?? 0;
  currentInterval.value = {
    hmr,
    value: hmrToMs(hmr),
    text: currentInterval.value.text,
  };
};

const twoDigit = (num: number) => {
  return num.toString().padStart(2, "0");
};
</script>

<template>
  <div
    class="bg-gradient-to-br from-purple-900 px-8 py-4 to-red-600 h-[600px] w-96"
  >
    <div class="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-md">
      <img src="./assets/img/logo.png" alt="Logo" class="h-8 w-8" />
      <div class="font-medium text-lg text-white font-robo">Reloader</div>
    </div>

    <div class="text-center mt-4 text-white">
      <div class="text-sm opacity-75">Current Tab</div>
      <div class="text-lg">{{ _location.origin }}</div>
    </div>

    <div class="mt-4">
      <h4 class="text-white">Interval</h4>

      <div class="grid grid-cols-4 gap-3 mt-2">
        <div
          class="col-span-2 h-10 rounded border border-white flex items-center justify-center text-white"
        >
          <input
            :value="twoDigit(currentInterval.hmr[0])"
            type="number"
            placeholder="00"
            class="hide-arrows h-full text-center w-8 bg-transparent focus:outline-none"
            @input="onInput($event, 0)"
          />
          <span>:</span>
          <input
            :value="twoDigit(currentInterval.hmr[1])"
            type="number"
            placeholder="00"
            class="hide-arrows h-full text-center w-8 bg-transparent focus:outline-none"
            @input="onInput($event, 1)"
          />
          <span>:</span>
          <input
            :value="twoDigit(currentInterval.hmr[2])"
            type="number"
            placeholder="00"
            class="hide-arrows h-full text-center w-8 bg-transparent focus:outline-none"
            @input="onInput($event, 2)"
          />
        </div>
        <button
          v-for="intv in intervals"
          :key="intv.value"
          :class="[
            currentInterval?.value === intv.value
              ? 'bg-white bg-opacity-100 font-medium text-red-500'
              : 'hover:bg-opacity-80 hover:text-black',
          ]"
          class="text-white bg-white bg-opacity-30 h-10 flex items-center justify-center rounded border border-white transition-all duration-300"
          @click="onClickInerval(intv)"
        >
          {{ intv.text }}
        </button>
      </div>

      <button
        class="mt-4 h-10 text-center text-white block w-full border rounded bg-blue-500 border-blue-400 uppercase text-sm tracking-wide"
      >
        Start
      </button>
    </div>
  </div>
</template>
