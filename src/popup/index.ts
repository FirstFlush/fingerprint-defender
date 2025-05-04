// src/popup/index.ts
import './style.scss';
import { ChromeStorageKeys } from '@/data/cache/chromeStorage';

const output = document.getElementById("identity-output") as HTMLPreElement;
const button = document.getElementById("new-identity") as HTMLButtonElement;

chrome.storage.local.get(ChromeStorageKeys.SPOOFED_ENV).then((res) => {
  output.textContent = res.spoofedEnv
    ? JSON.stringify(res.spoofedEnv, null, 2)
    : "[popup] No spoofed identity found in local storage.";
});

button.addEventListener("click", async () => {
  await chrome.storage.local.remove(ChromeStorageKeys.SPOOFED_ENV);
  output.textContent = "(cleared — reload page)";
});
