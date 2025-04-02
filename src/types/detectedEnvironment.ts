import { Hardware, Display, BrowserIdentity, Localization, WebGLFingerprint,
  CanvasFingerprint, AudioFingerprint, FontFingerprint, NetworkInfo, StorageInfo,
  SensorAccess
 } from "./environment";

export type DetectedAudioFingerprint = {

}



export type DetectedDisplay = Omit<Display, "colorDepth" | "pixelDepth" | "orientation">
export type DetectedHardware = Omit<Hardware, "battery">; 
export type DetectedWebGLFingerprint = Omit<WebGLFingerprint, "noiseSeed">

export type DetectedBrowser = Pick<BrowserIdentity,
  "userAgent" |  "vendor" | "oscpu"
> & {
  platform: string;
} ;
// TODO check if userAgentData is relevant. if so, add it to the main environment.
// & { 
//   userAgentData?: {
//     brands: { brand: string; version: string }[];
//     mobile: boolean;
//     platform: string;
//   };
// };


export type DetectedCanvasFingerPrint = Omit<CanvasFingerprint, "noiseProfile">

export type DetectedLocalization = Pick<Localization, "languages" | "timezone">;

export type DetectedEnvironment = {
  // Core
  browser: DetectedBrowser;
  display: DetectedDisplay;
  hardware: DetectedHardware;
  localization: DetectedLocalization;
  
  // Advanced Fingerprinting
  webGL: {
    renderer: string;
    vendor: string;
  };
  fonts: string[]; // Actual font list
  
  // Behavioral
  touchSupport: {
    maxTouchPoints: number;
    touchEventSupport: boolean;
  };
  
  // Privacy Signals
  doNotTrack: string | null;
  cookieEnabled: boolean;
};






// export type DetectedScreen = Pick<Display, "width" | "height" | "devicePixelRatio">;
// export type DetectedEnvironment = Pick<
//     Environment,
//     "deviceType" | "localization" | "hardware"
// > & {
//     display: DetectedScreen;
//     browser: Pick<BrowserIdentity, "userAgent" | "platform">;
// };