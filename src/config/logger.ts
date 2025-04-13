const DEBUG = true;

export const log = (...args: any[]) => {
  if (DEBUG) console.log("[FPD]", ...args);
};

export const warn = (...args: any[]) => {
  if (DEBUG) console.warn("[FPD][warn]", ...args);
};

export const error = (...args: any[]) => {
  console.error("[FPD][error]", ...args);
};
