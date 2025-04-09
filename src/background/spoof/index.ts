import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { Environment } from "@/types/environment";
import { inferBrowser } from "./inferBrowser";
import { spoofBrowserIdentity } from "./browserIdentity";
import { spoofDisplay } from "./display";
import { spoofHardware } from "./hardware";
import { spoofLocalization } from "@/types/localization";
import { spoofPrivacySignals } from "./privacySignals";
import { spoofMediaCapabilities } from "./media";
import { spoofNetwork } from "./network";

const spoofEnvironment = async (detectedEnvironment: DetectedEnvironment): Promise<Environment> => {

    const inferredBrowser = inferBrowser(detectedEnvironment.deviceType);

    return {
        browser: spoofBrowserIdentity(inferredBrowser),
        display: spoofDisplay(inferredBrowser),
        deviceType: inferredBrowser.deviceType,
        hardware: await spoofHardware(inferredBrowser),
        localization: spoofLocalization(detectedEnvironment.localization),
        privacy: await spoofPrivacySignals(inferredBrowser),
        media: await spoofMediaCapabilities(inferredBrowser.browser),
        network: await spoofNetwork(inferredBrowser.browser),
    }
}

export default spoofEnvironment;