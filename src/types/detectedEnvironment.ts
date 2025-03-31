import { Environment, Hardware, Display, BrowserIdentity } from "./environment";


export type DetectedScreen = Pick<Display, 
  "width" | "height" | "availWidth" | "availHeight" | "devicePixelRatio"
>;

export type DetectedHardware = Pick<Hardware,
  "concurrency" | "deviceMemory" | "maxTouchPoints"
> & {
  architecture: 'x86' | 'arm'; // Critical for M1/Intel spoofing
};

export type DetectedBrowser = Pick<BrowserIdentity,
  "userAgent" | "platform" | "vendor" | "oscpu"
> & {
  // Needed for convincing spoofing
  userAgentData: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
  };
};

export type DetectedEnvironment = {
  // Core
  browser: DetectedBrowser;
  display: DetectedScreen;
  hardware: DetectedHardware;
  localization: {
    timezone: string;
    language: string;
    locale: string;
  };
  
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