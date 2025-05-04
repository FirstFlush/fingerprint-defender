/**
 * content.ts
 *
 * This script runs in the **content script context** of the extension.
 * It cannot directly override browser APIs like `navigator`, `screen`, etc.,
 * because it's sandboxed by the extension's environment.
 *
 * Instead, it dynamically injects `inject.js` as a `<script>` tag
 * into the page's DOM at `document_start`. This causes the spoofing code
 * to execute in the **page context**, giving it full access to redefine
 * sensitive browser properties via `Object.defineProperty`.
 *
 * Once loaded, the script tag removes itself to reduce footprint.
 */
const script = document.createElement("script");
script.src = chrome.runtime.getURL("inject.js");
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);


// const injectScript = document.createElement("script");
// injectScript.src = chrome.runtime.getURL("inject.js");
// injectScript.onload = () => injectScript.remove();
// (document.head || document.documentElement).appendChild(injectScript);
