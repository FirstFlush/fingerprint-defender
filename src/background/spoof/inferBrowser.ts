import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
import { KNOWN_EFFECTIVE_TYPES } from "@/data/network";
import { COMMON_PLATFORMS } from "@/data/platforms";
import { DeviceType, NetworkInformation, EffectiveType } from "@/types/environment";
import { InferredBrowser, CommonBrowser, CommonPlatform } from "@/types/inferredBrowser";
import UserAgent from "user-agents";

const getUserAgent = (deviceType: DeviceType): UserAgent => {
    while (true) {
        const ua = new UserAgent([{ deviceCategory: deviceType }])
        const hasCommonOS = (COMMON_PLATFORMS as readonly string[]).includes(ua.data.platform)
        const hasCommonBrowser = COMMON_BROWSER_MAPPING.some((browser) =>
             ua.data.userAgent.includes(browser.signature)
        )
        if (hasCommonOS && hasCommonBrowser) {
            return ua
        }
    }
}

const chooseBrowser = (userAgent: string): CommonBrowser => {
    for (const { signature, name } of COMMON_BROWSER_MAPPING) {
        if (userAgent.includes(signature)) return name;
    }
    return "Chrome";
};

const getConnection = (ua: UserAgent): NetworkInformation | undefined => {
    const conn = ua.data.connection;
    if (!conn) return undefined;
    const { downlink, effectiveType, rtt } = conn;
    if (downlink === undefined || rtt === undefined || effectiveType === undefined) {
        return undefined;
    }
    return (KNOWN_EFFECTIVE_TYPES as readonly string[]).includes(effectiveType)
        ? { downlink, effectiveType: effectiveType as EffectiveType, rtt }
        : undefined;
}

export const inferBrowser = (deviceType: DeviceType): InferredBrowser => {
    const ua = getUserAgent(deviceType)
    const connection = getConnection(ua)
    return {
        browser: chooseBrowser(ua.data.userAgent),
        deviceType: deviceType,
        connection: connection,
        platform: ua.data.platform as CommonPlatform,
        userAgent: ua.data.userAgent,
        screenHeight: ua.data.screenHeight,
        screenWidth: ua.data.screenWidth,
        viewportHeight: ua.data.viewportHeight,
        viewportWidth: ua.data.viewportWidth,
        vendor: ua.data.vendor,
        pluginsLength: ua.data.pluginsLength,
    }
}