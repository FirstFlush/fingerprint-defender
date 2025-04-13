import { BrowserIdentity, ProductSub } from "@/types/environment";
import { CommonBrowser, InferredBrowser } from "@/types/inferredBrowser";


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


const spoofProuctSub = ( browser: CommonBrowser ): ProductSub => {
    if (browser == "Firefox") return "20100101"
    return "20030107";
}

export const spoofBrowserIdentity = (
    inferredBrowser: InferredBrowser,
): BrowserIdentity => {
    return {
        appName: "Netscape",
        product: "Gecko",
        platform: inferredBrowser.platform,
        userAgent: inferredBrowser.userAgent,
        vendor: inferredBrowser.vendor,
        productSub: spoofProuctSub(inferredBrowser.browser),
        oscpu: spoofOscpu(inferredBrowser),
        appVersion: inferredBrowser.userAgent,
    }
}









