// src/popup/index.ts
import './style.scss';

const output = document.getElementById("identity-output") as HTMLPreElement;
const button = document.getElementById("new-identity") as HTMLButtonElement;

chrome.storage.session.get("spoofedEnv").then((res) => {
  output.textContent = res.spoofedEnv
    ? JSON.stringify(res.spoofedEnv, null, 2)
    : "No spoofed identity found.";
});

button.addEventListener("click", async () => {
  await chrome.storage.session.remove("spoofedEnv");
  output.textContent = "(cleared — reload page)";
});
