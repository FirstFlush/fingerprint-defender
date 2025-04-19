import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
import { DeviceType } from "@/types/environment";
import { InferredBrowser, CommonBrowser, CommonPlatform } from "@/types/inferredBrowser";
import { getUserAgent } from "@/api/userAgents";

const chooseBrowser = (userAgent: string): CommonBrowser => {
    for (const { signature, name } of COMMON_BROWSER_MAPPING) {
        if (userAgent.includes(signature)) return name;
    }
    return "Chrome";
};

export const inferBrowser = async (deviceType: DeviceType): Promise<InferredBrowser> => {
    const ua = await getUserAgent(deviceType)
    return {
        browser: chooseBrowser(ua.userAgent),
        deviceType: deviceType,
        platform: ua.platform as CommonPlatform,
        userAgentObject: ua,
    }
}



// const getConnection = (ua: UserAgent): NetworkInformation | undefined => {
//     const conn = ua.connection;
//     if (!conn) return undefined;
//     const { downlink, effectiveType, rtt } = conn;
//     if (downlink === undefined || rtt === undefined || effectiveType === undefined) {
//         return undefined;
//     }
//     return (KNOWN_EFFECTIVE_TYPES as readonly string[]).includes(effectiveType)
//         ? { downlink, effectiveType: effectiveType as EffectiveType, rtt }
//         : undefined;
// }