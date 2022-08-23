<script setup lang="ts">
import type { ReloadTimer, Interval, IntervalHMR } from "@/types";

import { Storage } from "@@/common";
import { reactive, ref, watch } from "vue";
import { INTERVALS, RELOAD_TIMER_KEY } from "@/consts";
import { hmrToMs, msToHMR, getReloadTimer, setReloadTimer } from "@/helpers";
import {
  Switch,
  SwitchGroup,
  SwitchLabel,
  SwitchDescription,
} from "@headlessui/vue";

const enabled = ref(false);

const toUrl = (url = "") => new URL(url);

const currentTab = ref<chrome.tabs.Tab>();
chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
  currentTab.value = tabs[0];
});

const currentReloadTimer = ref<ReloadTimer>();
watch(currentTab, async (v) => {
  if (!v) return;
  const timer = await getReloadTimer(new URL(v.url || "").origin);
  currentReloadTimer.value = timer;
});

const intervals = [...INTERVALS];

const intervalValue = reactive({
  min: 0,
  sec: 0,
  hour: 0,
});

const currentInterval = ref<IntervalHMR>({
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
  const target = e.target as HTMLInputElement;
  let value = +target.value ?? 0;
  if (index === 0) value = value > 24 ? 24 : value;
  else value = value > 60 ? 60 : value;
  value = value <= -1 ? 0 : value;

  target.value = value.toString();

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

const onClickButton = async () => {
  if (!currentTab) return;

  const reloadTimer: ReloadTimer = {
    isEnabled: true,
    isInterval: true,
    milliseconds: currentInterval.value.value,
    origin: new URL(currentTab.value?.url || "").origin,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setReloadTimer(reloadTimer);
  currentReloadTimer.value = reloadTimer;
};
</script>

<template>
  <div
    class="bg-gradient-to-br from-purple-900 p-5 to-red-600 min-h-[600px] w-96"
  >
    <div class="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-md">
      <img src="./assets/img/logo.png" alt="Logo" class="h-8 w-8" />
      <div class="font-medium text-lg text-white font-robo">
        Chrome Reloader
      </div>
    </div>

    <div v-if="currentTab" class="text-center mt-4 text-white">
      <div class="text-sm opacity-75">Current Tab</div>
      <div class="flex items-center justify-center space-x-3">
        <img :src="currentTab.favIconUrl" alt="Favicon" class="h-6 w-6" />
        <div class="text-lg">{{ toUrl(currentTab.url).origin }}</div>
      </div>
    </div>

    <div class="mt-4">
      <h4 class="text-white text-sm uppercase tracking-wide opacity-70">
        Intervals
      </h4>

      <div class="grid grid-cols-4 gap-3 mt-2">
        <button
          v-for="intv in intervals"
          :key="intv.value"
          :class="[
            currentInterval?.value === intv.value
              ? 'bg-white !bg-opacity-100 font-medium text-red-500'
              : 'hover:bg-opacity-80 hover:text-black',
          ]"
          class="text-base text-white bg-white bg-opacity-30 h-10 flex items-center justify-center rounded border border-white transition-all duration-300"
          @click="onClickInerval(intv)"
        >
          {{ intv.text }}
        </button>
      </div>

      <div
        class="h-12 mt-4 rounded border border-white flex items-center justify-center text-white"
      >
        <input
          :value="twoDigit(currentInterval.hmr[0])"
          type="number"
          placeholder="00"
          class="hide-arrows text-2xl h-full text-center w-8 bg-transparent focus:outline-none"
          @input="onInput($event, 0)"
        />
        <span>:</span>
        <input
          :value="twoDigit(currentInterval.hmr[1])"
          type="number"
          placeholder="00"
          class="hide-arrows text-2xl h-full text-center w-8 bg-transparent focus:outline-none"
          @input="onInput($event, 1)"
        />
        <span>:</span>
        <input
          :value="twoDigit(currentInterval.hmr[2])"
          type="number"
          placeholder="00"
          class="hide-arrows text-2xl h-full text-center w-8 bg-transparent focus:outline-none"
          @input="onInput($event, 2)"
        />
      </div>

      <div>
        <SwitchGroup as="div" class="flex items-center space-x-4 mt-4">
          <SwitchLabel class="text-white cursor-pointer text-base">
            <div>Only while in background</div>
            <SwitchDescription class="text-gray-300 text-sm">
              Notifications will be shown only while in background
            </SwitchDescription>
          </SwitchLabel>

          <Switch
            v-model="enabled"
            :class="enabled ? 'bg-white' : 'bg-gray-700'"
            class="flex-none relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none transition-all duration-500"
          >
            <span class="sr-only">Enable notifications</span>
            <span
              :class="enabled ? 'translate-x-6 bg-red-600' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-500"
            />
          </Switch>
        </SwitchGroup>
      </div>

      <button
        type="button"
        class="mt-4 h-10 text-center text-white block w-full border rounded bg-blue-500 border-blue-400 uppercase text-sm tracking-wide"
        @click="onClickButton"
      >
        Start
      </button>

      <div v-if="currentReloadTimer" class="mt-4">
        {{ currentReloadTimer }}
      </div>
    </div>
  </div>
</template>
