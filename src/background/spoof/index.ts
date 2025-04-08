import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { Environment } from "@/types/environment";
import { inferBrowser } from "./inferBrowser";
import { spoofBrowserIdentity } from "./browserIdentity";
import { spoofDisplay } from "./display";
import { spoofHardware } from "./hardware";
import { spoofLocalization } from "@/types/localization";
import { spoofPrivacySignals } from "./privacySignals";

const spoofEnvironment = async (detectedEnvironment: DetectedEnvironment): Promise<Environment> => {

    const inferredBrowser = inferBrowser(detectedEnvironment.deviceType);

    return {
        browser: spoofBrowserIdentity(inferredBrowser),
        display: spoofDisplay(inferredBrowser),
        hardware: await spoofHardware(inferredBrowser),
        localization: spoofLocalization(detectedEnvironment.localization),
        privacySignals: await spoofPrivacySignals(inferredBrowser),
    }
}

export default spoofEnvironment;