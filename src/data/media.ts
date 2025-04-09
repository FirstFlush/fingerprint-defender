import { CommonBrowser } from "@/types/inferredBrowser";

export const COMMON_MEDIA_DEVICES = [
    {
        kind: "audioinput",
        label: "Default - Microphone Array (Realtek(R) Audio)",
        // deviceId: "default",
        // groupId: "bd52627781f577379947aaabaa2ca3f1e98ea95a888ea8d7b50c0c95ca6e67f9",
    },
    {
        kind: "audioinput",
        label: "Communications - Microphone Array (Realtek(R) Audio)",
        // deviceId: "communications",
        // groupId: "bd52627781f577379947aaabaa2ca3f1e98ea95a888ea8d7b50c0c95ca6e67f9",
    },
    {
        kind: "audioinput",
        label: "Microphone Array (Realtek(R) Audio)",
        // deviceId: "87c77f85e34098939f22269dbb9d4c91391e1babf4644b5fa3297d9c6bb84759",
        // groupId: "bd52627781f577379947aaabaa2ca3f1e98ea95a888ea8d7b50c0c95ca6e67f9",
    },
    {
        kind: "videoinput",
        label: "HP TrueVision HD Camera (0408:5365)",
        // deviceId: "c5c274b1cbd9b0627c17ab85fecd50229f7a21b293917f56b511fe865c286a41",
        // groupId: "5ecbc08c5ca245a293e12303ddf5f63f4db1d3f56426677593212c375e5e29bd",
    },
    {
        kind: "audiooutput",
        label: "Speaker (Realtek(R) Audio)",
        // deviceId: "db35fce83c8fefc147d6f76e678aec103356ab4943cedc927c7e324ae2ccbaa4",
        // groupId: "bd52627781f577379947aaabaa2ca3f1e98ea95a888ea8d7b50c0c95ca6e67f9",
    },
] as const;
  


export const COMMON_MIME_TYPES = [
    {
        type: "application/pdf",
        description: "Portable Document Format",
        suffixes: "pdf",
        pluginId: "pdf-viewer",
    },
    {
        type: "application/x-google-chrome-pdf",
        description: "Portable Document Format",
        suffixes: "pdf",
        pluginId: "pdf-viewer",
    },
] as const;


export const COMMON_PLUGINS = [
    {
        id: "pdf-viewer",
        name: "PDF Viewer",
        description: "Portable Document Format",
        filename: "internal-pdf-viewer",
        requiredForBrowsers: ["Firefox", "Chrome", "Edge"] as CommonBrowser[],
    },
    {
        id: "chrome-pdf",
        name: "Chrome PDF Viewer",
        description: "Portable Document Format",
        filename: "internal-pdf-viewer",
        requiredForBrowsers: ["Chrome"] as CommonBrowser[],
    },
    {
        id: "chromium-pdf",
        name: "Chromium PDF Viewer",
        description: "Portable Document Format",
        filename: "internal-pdf-viewer",
        requiredForBrowsers: ["Chrome"] as CommonBrowser[],
    },
    {
        id: "edge-pdf",
        name: "Microsoft Edge PDF Viewer",
        description: "Portable Document Format",
        filename: "internal-pdf-viewer",
        requiredForBrowsers: ["Edge"] as CommonBrowser[],
    },
] as const;
