const get = (key?: string) => {
  return new Promise((resolve) => {
    if (!key) {
      // Get full storage
      return chrome.storage.sync.get((storage) => {
        return resolve(storage);
      });
    }

    // Get a specific key from storage
    chrome.storage.sync.get(key, (storage) => {
      if (storage && storage[key]) resolve(storage[key]);
      else resolve(undefined);
    });
  });
};

const set = (key: string, value: any) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value });
    resolve("OK");
  });
};

const clear = () => {
  return new Promise(async (resolve) => {
    await chrome.storage.sync.clear();
    resolve("OK");
  });
};

const onChanged = (callback: (res: any) => void) => {
  chrome.storage.onChanged.addListener((res) => callback(res));
};

export const Storage = {
  get,
  set,
  clear,
  onChanged,
};

export default {
  get,
  set,
  clear,
  onChanged,
};
