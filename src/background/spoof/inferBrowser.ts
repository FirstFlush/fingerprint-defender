import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
import { COMMON_PLATFORMS } from "@/data/platforms";
import { DeviceType } from "@/types/environment";
import { InferredBrowser, CommonBrowser, CommonPlatform } from "@/types/inferredBrowser";
import { UserAgentObject, UserAgentResponse } from "@/types/userAgent";
import { USERAGENT_API, USERAGENT_API_LIMIT, USERAGENT_MAX_RETRIES } from "@/config/constants";
import { fetchJson } from "@/api/baseFetch";
import { sleep } from "@/utils/time";

const fetchUserAgents = async (params: Record<string, any>): Promise<UserAgentObject[]> => {
    const res = await fetchJson<UserAgentResponse>(USERAGENT_API, params)
    if (res && res.success === true && res.data.length > 0) {
        return res.data
    }
    throw new Error(`Can not retrieve user-agent data from API: ${USERAGENT_API}`)
}

const getUserAgent = async (deviceType: DeviceType): Promise<UserAgentObject> => {
    for (let attempt = 1; attempt <= USERAGENT_MAX_RETRIES; attempt++) {
        const userAgents = await fetchUserAgents({
            deviceType,
            limit: USERAGENT_API_LIMIT,
        });

        for (const ua of userAgents) {
            const hasCommonOS = COMMON_PLATFORMS.includes(ua.platform);
            const hasCommonBrowser = COMMON_BROWSER_MAPPING.some(browser =>
                ua.userAgent.includes(browser.signature)
            );
            if (hasCommonOS && hasCommonBrowser) return ua;
        }

        // Add jitter: 300–1000ms
        const jitter = 300 + Math.random() * 700;
        await sleep(jitter);
    }
    throw new Error(`No valid user agent found after ${USERAGENT_MAX_RETRIES} attempts.`);
};

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