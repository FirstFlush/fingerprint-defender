import { KNOWN_PLATFORMS, KNOWN_UAD_PLATFORMS } from "@/data/platforms";
import { KNOWN_MEMORY_VALUES } from "@/data/hardware";
import { KNOWN_EFFECTIVE_TYPES } from "@/data/network";
import { KNOWN_PERMISSIONS } from "@/data/permissions";

// ======================
// CORE TYPES
// ======================
export type DeviceType = "mobile" | "tablet" | "desktop";
export type Languages = [string, ...string[]];
export type MimeType = { type: string; description: string };
export type PermissionName = (typeof KNOWN_PERMISSIONS)[number];
export type Plugin = { name: string; filename: string };
export type Platform = (typeof KNOWN_PLATFORMS)[number];
export type DeviceMemory = (typeof KNOWN_MEMORY_VALUES)[number];
export type EffectiveType = (typeof KNOWN_EFFECTIVE_TYPES)[number];
export type UserAgentDataPlatform = (typeof KNOWN_UAD_PLATFORMS)[number];
export type ProductSub = "20030107" | "20100101";   // 20030107 for Chrome/Edge/Safari, 2010010 for Firefox

export interface UserAgentData {                // Used by Chrome
    brands: { brand: string, version: string }[];
    mobile: boolean;
    platform: UserAgentDataPlatform;
}

export interface NetworkInformation {           // navigator.connection object. Undefined on Firefox & Safari
    downlink: number;
    effectiveType: EffectiveType;
    rtt: number;
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
    battery?: {
        level: number;
        charging: boolean;
    };
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
    languages: Languages
    timezone: string;
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
    devices: MediaDeviceInfo[];
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

export interface StorageInfo {              // navigator.storage can be undefined in non-HTTPS, non-localhost contexts.
    estimate: StorageEstimate;
    persistence: boolean;
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
    browser: BrowserIdentity;
    deviceType: DeviceType;
    display: Display;
    hardware: Hardware;
    localization: Localization;
    privacy: PrivacySignals;
    media: MediaCapabilities;
    webgl: WebGLFingerprint;
    canvas: CanvasFingerprint;
    audio: AudioFingerprint;
    fonts: FontFingerprint;
    network: NetworkFingerprint;
    storage: StorageInfo;
    sensors: SensorAccess;
    performanceTiming: PerformanceTiming;
}
