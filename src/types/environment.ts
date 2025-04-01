// ======================
// CORE TYPES
// ======================
export type DeviceType = "mobile" | "tablet" | "desktop";
export type Language = [string, ...string[]];
export type MimeType = { type: string; description: string };
export type Plugin = { name: string; filename: string };
export type Platform =
  | "Win32"                // Windows (32-bit & 64-bit)
  | "Win64"                // Rare, but exists in some Edge versions
  | "MacIntel"             // Intel Macs (pre-M1)
  | "MacARM"               // Apple Silicon (M1/M2/M3)
  | "Linux x86_64"         // Standard 64-bit Linux
  | "Linux armv8l"         // ARM Linux (RPi 4+, modern Android)
  | "Linux i686"           // Legacy 32-bit Linux
  | "iPhone"               // iOS phones
  | "iPad"                 // iOS tablets
  | "Android"              // Generic Android (deprecated in modern browsers)
  | "Android armv8l"       // Modern Android ARM
  | "Android x86_64"       // ChromeOS/Android x86
  | "FreeBSD amd64"        // BSD variants
  | "CrOS x86_64";         // ChromeOS

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
    deviceMemory?: number; // 0.25, 0.5, 1, 2, 4, 8
    maxTouchPoints: number;
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
    oscpu: string;
    appName: "Netscape";
    appVersion: string;
    product: "Gecko";
    productSub: string;
}

// ======================
// LOCALIZATION
// ======================
export interface Localization {
    language: Language;
    timezone: string;
    locale: string;
    locales: string[];
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
    noiseSeed: number; // For subtle variations
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
