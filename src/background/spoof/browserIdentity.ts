import { BrowserIdentity, ProductSub } from "@/types/environment";
import { CommonBrowser, InferredBrowser } from "@/types/inferredBrowser";
import { spoofNavigatorProperty } from "@/utils/spoofProperty";

const spoofOscpu = (inferredBrowser: InferredBrowser): string | undefined => {
    if (inferredBrowser.browser !== "Firefox") return undefined;
    if (inferredBrowser.platform.startsWith("Win")) return "Windows NT 10.0";
    if (inferredBrowser.platform.startsWith("Mac")) return "Intel Mac OS X 10.15";
    if (inferredBrowser.platform.startsWith("Linux")) return "Linux x86_64";
    if (inferredBrowser.platform.startsWith("Android")) return "Android 10";
    if (inferredBrowser.platform.startsWith("iPhone") || inferredBrowser.platform.startsWith("iPad")) {
        return "iOS";
    }
    return undefined
} 

const spoofProductSub = ( browser: CommonBrowser ): ProductSub => {
    if (browser == "Firefox") return "20100101"
    return "20030107";
}

export const spoofBrowserIdentity = (
    inferredBrowser: InferredBrowser,
): BrowserIdentity => {

    spoofNavigatorProperty("userAgent", inferredBrowser.userAgentObject.userAgent)
    spoofNavigatorProperty("appVersion", inferredBrowser.userAgentObject.userAgent)
    spoofNavigatorProperty("vendor", inferredBrowser.userAgentObject.vendor)
    spoofNavigatorProperty("platform", inferredBrowser.userAgentObject.platform)
    spoofNavigatorProperty("productSub", spoofProductSub(inferredBrowser.browser))
    spoofNavigatorProperty("oscpu", spoofOscpu(inferredBrowser))

    return {
        appName: "Netscape",
        product: "Gecko",
        platform: inferredBrowser.platform,
        userAgent: inferredBrowser.userAgentObject.userAgent,
        vendor: inferredBrowser.userAgentObject.vendor,
        productSub: spoofProductSub(inferredBrowser.browser),
        oscpu: spoofOscpu(inferredBrowser),
        appVersion: inferredBrowser.userAgentObject.userAgent,
    }
}









