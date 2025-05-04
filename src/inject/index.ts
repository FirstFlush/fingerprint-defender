import spoofEnvironment from "@/background/spoof";
import detectEnvironment from "@/background/detect";

(async () => {
  const detected = await detectEnvironment();
  await spoofEnvironment(detected);
})();

// import { APP_NAME } from "@/config/constants";
// import spoofEnvironment from "@/background/spoof";
// import detectEnvironment from "@/background/detect";
// import { ChromeStorageKeys } from "@/data/cache/chromeStorage";


// chrome.storage.session.get(ChromeStorageKeys.SPOOFED_ENV).then(async (res) => {
//   try {
//     let spoofed = res[ChromeStorageKeys.SPOOFED_ENV];
//     if (!spoofed) {
//       const detected = await detectEnvironment();
//       spoofed = await spoofEnvironment(detected);
  
//       await chrome.storage.session.set({ [ChromeStorageKeys.SPOOFED_ENV]: spoofed });
  
//     } else {
//       await spoofEnvironment(spoofed); // just re-apply spoof values
//     }
  
//     (window as any).__spoofedEnv = spoofed;
//   } catch (err) {
//     console.warn(`[${APP_NAME}] failed to spoof:`, err);
//   }
// });


// import detectEnvironment from "@/background/detect";
// import spoofEnvironment from "@/background/spoof";
// import { ChromeStorageKeys } from "@/data/cache/chromeStorage";

// (async () => {
//   console.log("[inject] script running");

//   // Try to get spoofed env from local storage
//   const result = await chrome.storage.local.get(ChromeStorageKeys.SPOOFED_ENV);
//   let spoofedEnv = result[ChromeStorageKeys.SPOOFED_ENV];

//   if (!spoofedEnv) {
//     console.log("[inject] No cached spoofedEnv — generating");
//     const detected = await detectEnvironment();
//     spoofedEnv = await spoofEnvironment(detected);
//     await chrome.storage.local.set({ [ChromeStorageKeys.SPOOFED_ENV]: spoofedEnv });
//   } else {
//     console.log("[inject] Using cached spoofedEnv");
//     await spoofEnvironment(spoofedEnv);
//   }

//   (window as any).__spoofedEnv = spoofedEnv;
// })();
