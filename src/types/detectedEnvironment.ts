import {
    Hardware,
    Display,
    BrowserIdentity,
    Localization,
    WebGLFingerprint,
    CanvasFingerprint,
    AudioFingerprint,
    FontFingerprint,
    NetworkFingerprint,
    StorageInfo,
    SensorAccess,
    PrivacySignals,
    MediaCapabilities,
    PerformanceTiming,
    DeviceType,
    NetworkInformation,
} from "./environment";

export type DetectedAudioFingerprint = Pick<AudioFingerprint, "context">;
export type DetectedBrowserIdentity = Omit<
    BrowserIdentity,
    "platform" | "appName" | "product" | "productSub"
> & { platform: string; appName: string; product: string; productSub: string };
export type DetectedCanvasFingerprint = Omit<CanvasFingerprint, "noiseProfile">;
export type DetectedDeviceType = DeviceType;
export type DetectedDisplay = Omit<
    Display,
    "colorDepth" | "pixelDepth" | "orientation"
>;
export type DetectedFontFingerprint = Pick<FontFingerprint, "installed">;
export type DetectedHardware = Omit<Hardware, "battery">;
export type DetectedLocalization = Pick<Localization, "languages" | "timezone" | "timezoneOffset">;
export type DetectedMediaCapabilities = MediaCapabilities;
export type DetectedNetworkFingerprint = { connection?: Omit<NetworkInformation, "saveData" | "onchange"> }
export type DetectedPerformanceTiming = PerformanceTiming;
export type DetectedPrivacySignals = PrivacySignals;
export type DetectedStorageInfo = StorageInfo;
export type DetectedSensorAccess = SensorAccess;
export type DetectedWebGLFingerprint = Omit<WebGLFingerprint, "noiseSeed">;

export interface DetectedEnvironment {
    audioFingerprint: DetectedAudioFingerprint;
    browserIdentity: DetectedBrowserIdentity;
    canvasFingerprint: DetectedCanvasFingerprint;
    deviceType: DetectedDeviceType;
    display: DetectedDisplay;
    fontFingerprint: DetectedFontFingerprint;
    hardware: DetectedHardware;
    localization: DetectedLocalization;
    mediaCapabilities: DetectedMediaCapabilities;
    networkInfo: DetectedNetworkFingerprint;
    performanceTiming: DetectedPerformanceTiming;
    privacySignals: DetectedPrivacySignals;
    storageInfo: DetectedStorageInfo;
    sensorAccess: DetectedSensorAccess;
    webGLFingerprint: DetectedWebGLFingerprint;
}
