import { KNOWN_PLATFORMS } from "@/data/platforms";
import { KNOWN_MEMORY_VALUES } from "@/data/hardware";

// ======================
// CORE TYPES
// ======================
export type DeviceType = "mobile" | "tablet" | "desktop";
export type Languages = [string, ...string[]];
export type MimeType = { type: string; description: string };
export type Plugin = { name: string; filename: string };
export type Platform = (typeof KNOWN_PLATFORMS)[number];
export type DeviceMemory = (typeof KNOWN_MEMORY_VALUES)[number];

  export type PermissionName =
  | "geolocation"
  | "notifications"
  | "camera"
  | "microphone"
  | "persistent-storage"
  | "midi"
  | "clipboard-read"
  | "clipboard-write";

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
        type: "portrait" | "landscape";
        angle: number;
    };
}

export interface Hardware {
    concurrency: number;
    deviceMemory?: DeviceMemory; // 0.25, 0.5, 1, 2, 4, 8  *not displayed in Firefox
    maxTouchPoints: number; // spoof 0 for desktop, 5-10 for mobile and tablet
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
    oscpu?: string; // only exposed by Firefox!
    appName: "Netscape";
    appVersion: string;
    product: "Gecko";
    productSub: "20030107" | "20100101"; // 20030107 for Chrome/Edge, 2010010 for Firefox
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
    globalPrivacyControl: boolean;
    cookieEnabled: boolean;
    permissions?: Record<PermissionName, PermissionState>;
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
    rendered: string[];
    measurementNoise: number;
}

// ======================
// NETWORK & STORAGE
// ======================
export interface NetworkInfo {
    connection?: {
        downlink: number;
        effectiveType: "slow-2g" | "2g" | "3g" | "4g";
        rtt: number;
    };
    webRTC: {
        ipLeakProtection: boolean;
    };
}

export interface StorageInfo {
    quota: number;
    usage: number;
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

// ======================
// MASTER ENVIRONMENT
// ======================
export interface Environment {
    // Core Identity
    browser: BrowserIdentity;
    deviceType: DeviceType;
    
    // Hardware/Display
    display: Display;
    hardware: Hardware;
    
    // Localization
    localization: Localization;
    
    // Privacy
    privacy: PrivacySignals;
    
    // Media
    media: MediaCapabilities;
    
    // Advanced Fingerprinting
    webgl: WebGLFingerprint;
    canvas: CanvasFingerprint;
    audio: AudioFingerprint;
    fonts: FontFingerprint;
    
    // System Capabilities
    network: NetworkInfo;
    storage: StorageInfo;
    sensors: SensorAccess;
    
    // Timestamps
    performanceTiming: {
        timeOrigin: number;
        clockDrift: number;
    };
}
