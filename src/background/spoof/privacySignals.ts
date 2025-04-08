import { DeviceType, PrivacySignals } from "@/types/environment";
import { CommonBrowser, CommonPlatform, InferredBrowser } from "@/types/inferredBrowser";
import { PERMISSION_PROFILES } from "@/data/permissions";
import { PermissionProfile, PermissionMap } from "@/types/permissions";

const spoofDoNotTrack = () => {
    Object.defineProperty(navigator, "doNotTrack", {
        get: () => "1",
        configurable: true,
    })
}

const spoofGlobalPrivacyControl = (browser: CommonBrowser) => {

    if (browser !== "Firefox") return;

    Object.defineProperty(navigator, "globalPrivacyControl", {
        get: () => true,
        configurable: true,
    });    
}

const spoofCookiesEnabled = () => {
    Object.defineProperty(navigator, "cookieEnabled", {
        get: () => true,
        configurable: true,
    })
}

const getPermissionProfile = (browser: CommonBrowser, platform: CommonPlatform, deviceType: DeviceType): PermissionProfile => {
    if (deviceType !== "desktop") {
        return browser === "Firefox" ? "balancedMobile" : "strictMobile"
    }
    return browser === "Firefox" ? "balancedDesktop" : "strictDesktop"
}

const spoofPermissions = (permissions: PermissionMap) => {
    navigator.permissions.query = async ({ name }: { name: PermissionName}) => {
        const state = permissions[name];
        return {
            state: state || "prompt",
        } as PermissionStatus
    }
}

export const spoofPrivacySignals = async (inferredBrowser: InferredBrowser): Promise<PrivacySignals> => {

    spoofDoNotTrack();
    spoofGlobalPrivacyControl(inferredBrowser.browser);
    spoofCookiesEnabled();
    const profile = getPermissionProfile(inferredBrowser.browser, inferredBrowser.platform, inferredBrowser.deviceType)
    const permissionMap = PERMISSION_PROFILES[profile]
    spoofPermissions(permissionMap);

    const permissions: Partial<Record<PermissionName, PermissionState>> = {};
    if ("permissions" in navigator && typeof navigator.permissions.query === "function") {
        for (const name of Object.keys(permissionMap) as PermissionName[]) {
            try {
                const result = await navigator.permissions.query({ name });
                permissions[name] = result.state;
            } catch (err) {
                console.warn("Permission query failed (post-spoof):", name, err);
            }
        }
    }
    return {
        doNotTrack: navigator.doNotTrack,
        globalPrivacyControl: "globalPrivacyControl" in navigator ? (navigator as any).globalPrivacyControl : undefined,
        cookieEnabled: navigator.cookieEnabled,
        permissions: Object.keys(permissions).length > 0 
            ? permissions as Record<PermissionName, PermissionState>
            : undefined
    };  

}