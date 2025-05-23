import { KNOWN_PLATFORMS, KNOWN_UAD_PLATFORMS } from "@/data/platforms";
import { MimeType, Plugin } from "./media";
import { KNOWN_MEMORY_VALUES } from "@/data/hardware";
import { KNOWN_EFFECTIVE_TYPES } from "@/data/network";
import { KNOWN_PERMISSIONS } from "@/data/permissions";
import { COMMON_HARDWARE_CONCURRENCY_VALUES } from "@/data/hardware";
// ======================
// CORE TYPES
// ======================
export type DeviceType = "mobile" | "tablet" | "desktop";
export type Languages = readonly [string, ...string[]];
export type PermissionName = (typeof KNOWN_PERMISSIONS)[number];
export type Platform = (typeof KNOWN_PLATFORMS)[number];
export type DeviceMemory = (typeof KNOWN_MEMORY_VALUES)[number];
export type EffectiveType = (typeof KNOWN_EFFECTIVE_TYPES)[number];
export type UserAgentDataPlatform = (typeof KNOWN_UAD_PLATFORMS)[number];
export type ProductSub = "20030107" | "20100101";   // 20030107 for Chrome/Edge/Safari, 2010010 for Firefox
export type HardwareConcurrency = (typeof COMMON_HARDWARE_CONCURRENCY_VALUES)[number]

export interface BatteryManager {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;                    // typeof Infinity for spoofing
    onchargingchange: (() => void) | null;
    onlevelchange: (() => void) | null;
    onchargingtimechange: (() => void) | null;
    ondischargingtimechange: (() => void) | null;
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
    dispatchEvent: (event: Event) => boolean;
  }

export interface UserAgentData {                // Used by Chrome
    brands: { brand: string, version: string }[];
    mobile: boolean;
    platform: UserAgentDataPlatform;
}

export interface NetworkInformation {           // navigator.connection object. Undefined on Firefox & Safari
    downlink: number;
    effectiveType: EffectiveType;
    rtt: number;
    saveData: boolean;
    onchange: null;
};

export interface StorageEstimate {              
    quota?: number;                             // Extremely rare for quota or usage to be undefined, but possible according to MDN: 
    usage?: number;                             // https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate#specifications
}

// ======================
// HARDWARE & DISPLAY
// ======================
export interface Display {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
    colorDepth: number;
    pixelDepth: number;
    devicePixelRatio: number;
    orientation?: {
        type: OrientationType;
        angle: number;
    };
}

export interface Hardware {
    concurrency: number;
    deviceMemory?: DeviceMemory;            // 0.25, 0.5, 1, 2, 4, 8  *undefined in Firefox. undefined in chrome in non-HTTPS, non-localhost contexts
    maxTouchPoints: number;                 // spoof 0 for desktop, 5-10 for mobile and tablet
    battery?: BatteryManager;
}

// ======================
// BROWSER IDENTITY
// ======================
export interface BrowserIdentity {
    userAgent: string;
    platform: Platform;
    vendor: string;
    oscpu?: string;                         // Used by Firefox
    appName: "Netscape";
    appVersion: string;                     // deprecated alias for userAgent
    product: "Gecko";
    productSub: ProductSub;                 
    userAgentData?: UserAgentData           // Used by Chrome
}

// ======================
// LOCALIZATION
// ======================
export interface Localization {
    language: string;
    languages: Languages;
    timezone: string;
    timezoneOffset: number;
    locale: string;
}

// ======================
// PRIVACY SIGNALS
// ======================
export interface PrivacySignals {
    doNotTrack: string | null;
    globalPrivacyControl?: boolean;         // used by Firefox
    cookieEnabled: boolean;
    permissions?: Record<PermissionName, PermissionState>;  // must use permissions.query() in firefox. chrome supports. safari does not support.
}

// ======================
// MEDIA CAPABILITIES
// ======================
export interface MediaCapabilities {
    mediaDevices: MediaDeviceInfo[];
    mimeTypes: MimeType[];
    plugins: Plugin[];
    pdfViewerEnabled: boolean;
}

// ======================
// ADVANCED FINGERPRINTING
// ======================
export interface WebGLFingerprint {
    renderer: string;
    vendor: string;
    shadingLanguageVersion: string;
    parameters: Record<string, any>;
    noiseSeed: number;
}

export interface CanvasFingerprint {
    winding: boolean;
    text: string;
    noiseProfile: {
        amplitude: number;
        seed: number;
    };
}

export interface AudioFingerprint {
    context: {
        sampleRate: number;
        channelCount: number;
    };
    analyser: {
        fftSize: number;
        frequencyBinCount: number;
    };
}

export interface FontFingerprint {
    installed: string[];
    measurementNoise: number;
}

// ======================
// NETWORK & STORAGE
// ======================
export interface NetworkFingerprint {
    connection?: NetworkInformation
    webRTC: {
        leaksInternalIP: boolean;
    };
}

export interface StorageInfo {              // Undefined on Safari. Can be undefined in non-HTTPS, non-localhost contexts in Firefox/Chrome.
    estimate: StorageEstimate;
    persisted: boolean;
}

// ======================
// SENSORS
// ======================
export interface SensorAccess {
    accelerometer: boolean;
    gyroscope: boolean;
    magnetometer: boolean;
    motionAccess: boolean;
}

export interface PerformanceTiming {
    timeOrigin: number;
    clockDrift: number;
  }

// ======================
// MASTER ENVIRONMENT
// ======================
export interface Environment {
    // audio: AudioFingerprint;
    browser: BrowserIdentity;
    // canvas: CanvasFingerprint;
    deviceType: DeviceType;
    display: Display;
    // fonts: FontFingerprint;
    hardware: Hardware;
    localization: Localization;
    media: MediaCapabilities;
    network: NetworkFingerprint;
    performanceTiming: PerformanceTiming;
    privacy: PrivacySignals;
    sensors?: SensorAccess;
    storage?: StorageInfo;
    // webgl: WebGLFingerprint;
}
