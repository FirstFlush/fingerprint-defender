


export type Platform =
  | "Win32"
  | "MacIntel"
  | "Linux x86_64"
  | "Linux armv7l"
  | "iPhone"
  | "iPad"
  | "Android";


export interface ProfileTemplate {
    label: string;
    platform: Platform;
    userAgentPool: string[];
    screen: {
      widthRange: [number, number];
      heightRange: [number, number];
      devicePixelRatioRange: [number, number];
    };
    hardwareConcurrencyOptions: number[];
    deviceMemoryOptions: number[];
    languagePool: string[][];
    vendorOptions: string[];
    oscpuOptions?: string[]; // Firefox only
    doNotTrackOptions: (string | null)[];
    pluginLengthRange: [number, number];
    mimeTypeLengthRange: [number, number];
    timezoneOffset: number; // e.g., -480 for PST
    timezonePool: string[]; // e.g., ["America/Los_Angeles", "Canada/Vancouver"]
  }
  














export interface BrowserProfile {
    label: string;
    platform: string;
    userAgent: string;
    screen: {
      width: number;
      height: number;
      availWidth: number;
      availHeight: number;
      devicePixelRatio: number;
    };
    hardwareConcurrency: number;
    languages: string[];
    timezone: string;
  }
  






export const profiles: BrowserProfile[] = [
    {
      "label": "Windows 10 Laptop (Mid-Range)",
      "platform": "Win32",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0",
      "screen": {
        "width": 1366,
        "height": 768,
        "availWidth": 1366,
        "availHeight": 728,
        "devicePixelRatio": 1.25
      },
      "hardwareConcurrency": 4,
      "languages": ["en-US", "en"],
      "timezone": "America/New_York"
    },
    {
      "label": "MacBook Pro 16” (M1)",
      "platform": "MacIntel",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      "screen": {
        "width": 1728,
        "height": 1117,
        "availWidth": 1728,
        "availHeight": 1080,
        "devicePixelRatio": 2
      },
      "hardwareConcurrency": 8,
      "languages": ["en-US", "en"],
      "timezone": "America/Los_Angeles"
    },
    {
      "label": "Linux Dev Box (Hi-Res)",
      "platform": "Linux x86_64",
      "userAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
      "screen": {
        "width": 1920,
        "height": 1080,
        "availWidth": 1920,
        "availHeight": 1040,
        "devicePixelRatio": 1
      },
      "hardwareConcurrency": 8,
      "languages": ["en-US", "en"],
      "timezone": "UTC"
    },
    {
      "label": "Budget Chromebook",
      "platform": "Linux armv7l",
      "userAgent": "Mozilla/5.0 (X11; CrOS armv7l 15054.123.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.217 Safari/537.36",
      "screen": {
        "width": 1366,
        "height": 768,
        "availWidth": 1366,
        "availHeight": 728,
        "devicePixelRatio": 1.25
      },
      "hardwareConcurrency": 2,
      "languages": ["en-US"],
      "timezone": "America/Chicago"
    }
  ]
  