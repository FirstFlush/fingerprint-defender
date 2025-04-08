
export const KNOWN_PERMISSIONS = [
    "camera",
    "geolocation",
    "microphone",
    "midi",
    "notifications",
    "persistent-storage",
    "push",
    "screen-wake-lock",
    "storage-access",
] as const;

export const PERMISSION_PROFILES = {
    strictDesktop: {    
        camera: "denied",
        microphone: "denied",
        geolocation: "denied",
        notifications: "denied",
        push: "denied",
        midi: "denied",
        "screen-wake-lock": "prompt",
        "persistent-storage": "prompt",
        "storage-access": "prompt",
    },
    strictMobile: {
        camera: "denied",
        microphone: "denied",
        geolocation: "prompt",
        notifications: "prompt",
        push: "denied",
        midi: "denied",
        "screen-wake-lock": "prompt",
        "persistent-storage": "prompt",
        "storage-access": "prompt",
    },
    balancedDesktop: {
        camera: "denied",
        microphone: "denied",
        geolocation: "prompt",
        notifications: "prompt",
        push: "denied",
        midi: "prompt",
        "screen-wake-lock": "prompt",
        "persistent-storage": "granted",
        "storage-access": "prompt",
    },
    balancedMobile: {
        camera: "prompt",
        microphone: "prompt",
        geolocation: "prompt",
        notifications: "prompt",
        push: "denied",
        midi: "denied",
        "screen-wake-lock": "prompt",
        "persistent-storage": "granted",
        "storage-access": "prompt",
    }
} as const;