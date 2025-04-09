

// effectiveType read-only property of the NetworkInformation interface must be one of 4 ttypes
// https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType

export const KNOWN_EFFECTIVE_TYPES = [
    "slow-2g",
    "2g",
    "3g",
    "4g",
] as const;

export const SPOOFED_EFFECTIVE_TYPES = [
    "4g",
] as const;