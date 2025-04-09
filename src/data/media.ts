import { CommonBrowser } from "@/types/inferredBrowser";
import { MediaDeviceTemplate } from "@/types/media";


export const COMMON_MEDIA_DEVICES: readonly MediaDeviceTemplate[] = [
  { kind: "audioinput", label: "Default - Microphone Array (Realtek(R) Audio)" },
  { kind: "audioinput", label: "Communications - Microphone Array (Realtek(R) Audio)" },
  { kind: "audioinput", label: "Microphone Array (Realtek(R) Audio)" },
  { kind: "videoinput", label: "HP TrueVision HD Camera (0408:5365)" },
  { kind: "audiooutput", label: "Speaker (Realtek(R) Audio)" },
];


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
