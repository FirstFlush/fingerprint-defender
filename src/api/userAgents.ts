import { COMMON_PLATFORMS } from "@/data/platforms";
import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
import { DeviceType } from "@/types/environment";
import { UserAgentObject, UserAgentResponse } from "@/types/userAgent";
import { fetchJson } from "./baseFetch";
import { USERAGENT_API, USERAGENT_API_LIMIT, USERAGENT_MAX_RETRIES } from "@/config/constants";
import { sleep } from "@/utils/time";

const fetchUserAgents = async (params: Record<string, any>): Promise<UserAgentObject[]> => {
    const res = await fetchJson<UserAgentResponse>(USERAGENT_API, params)
    if (res && res.success === true && res.data.length > 0) {
        return res.data
    }
    throw new Error(`Can not retrieve user-agent data from API: ${USERAGENT_API}`)
}

export const getUserAgent = async (deviceType: DeviceType): Promise<UserAgentObject> => {
    for (let attempt = 1; attempt <= USERAGENT_MAX_RETRIES; attempt++) {
        const userAgents = await fetchUserAgents({
            deviceCategory: deviceType,
            limit: USERAGENT_API_LIMIT,
        });

        for (const ua of userAgents) {
            const hasCommonOS = COMMON_PLATFORMS.includes(ua.platform);
            const hasCommonBrowser = COMMON_BROWSER_MAPPING.some(browser =>
                ua.userAgent.includes(browser.signature)
            );
            if (hasCommonOS && hasCommonBrowser) 
                return ua;
        }

        // Add jitter: 300–1000ms
        const jitter = 300 + Math.random() * 700;
        await sleep(jitter);
    }
    throw new Error(`No valid user agent found after ${USERAGENT_MAX_RETRIES} attempts.`);
};
