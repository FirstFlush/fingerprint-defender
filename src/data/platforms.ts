
export const KNOWN_PLATFORMS: string[] = [
    "Win32",               // Windows (32-bit & 64-bit)
    "Win64",               // Rare, but exists in some Edge versions
    "MacIntel",            // Intel Macs (pre-M1)
    "MacARM",              // Apple Silicon (M1/M2/M3)
    "Linux x86_64",        // Standard 64-bit Linux
    "Linux armv8l",        // ARM Linux (RPi 4+, modern Android)
    "Linux i686",          // Legacy 32-bit Linux
    "iPhone",              // iOS phones
    "iPad",                // iOS tablets
    "Android",             // Generic Android (deprecated in modern browsers)
    "Android armv8l",      // Modern Android ARM
    "Android x86_64",      // ChromeOS/Android x86
    "FreeBSD amd64",       // BSD variants
    "CrOS x86_64",        // ChromeOS 
] as const;