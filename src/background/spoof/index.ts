import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { Environment } from "@/types/environment";
import { inferBrowser } from "./inferBrowser";
import { spoofBrowserIdentity } from "./browserIdentity";
import { spoofDisplay } from "./display";
import { spoofHardware } from "./hardware";

const spoofEnvironment = async (environment: DetectedEnvironment): Promise<Environment> => {

    const inferredBrowser = inferBrowser(environment.deviceType);

    return {
        browser: spoofBrowserIdentity(inferredBrowser),
        display: spoofDisplay(inferredBrowser),
        hardware: await spoofHardware(inferredBrowser),
    }
}

export default spoofEnvironment;