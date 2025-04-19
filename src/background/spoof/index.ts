import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { Environment } from "@/types/environment";
import { inferBrowser } from "./inferBrowser";
import { spoofBrowserIdentity } from "./browserIdentity";
import { spoofDisplay } from "./display";
import { spoofHardware } from "./hardware";
import { spoofLocalization } from "@/background/spoof/localization";
import { spoofPrivacySignals } from "./privacySignals";
import { spoofMediaCapabilities } from "./media";
import { spoofNetwork } from "./network";
import { spoofStorage } from "./storage";
import { spoofSensorAccess } from "./sensors";
import { spoofPerformanceTiming } from "./performanceTiming";

const spoofEnvironment = async (detectedEnvironment: DetectedEnvironment): Promise<Environment> => {

    const inferredBrowser = await inferBrowser(detectedEnvironment.deviceType);

    return {
        browser: spoofBrowserIdentity(inferredBrowser),
        deviceType: inferredBrowser.deviceType,
        display: spoofDisplay(inferredBrowser),
        hardware: await spoofHardware(inferredBrowser),
        localization: spoofLocalization(detectedEnvironment.localization),
        performanceTiming: spoofPerformanceTiming(),
        privacy: await spoofPrivacySignals(inferredBrowser),
        media: await spoofMediaCapabilities(inferredBrowser.browser),
        network: await spoofNetwork(inferredBrowser.browser),
        sensors: spoofSensorAccess(inferredBrowser),
        storage: await spoofStorage(inferredBrowser.browser),


    }
}

export default spoofEnvironment;