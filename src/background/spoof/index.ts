import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { Environment } from "@/types/environment";
import { inferBrowser } from "./inferBrowser";
import { spoofBrowserIdentity } from "./browserIdentity";
import { spoofDisplay } from "./dispay";



const spoofEnvironment = (environment: DetectedEnvironment): Environment => {

    const inferredBrowser = inferBrowser(environment.deviceType);


    return {
        browser: spoofBrowserIdentity(inferredBrowser),
        display: spoofDisplay(inferredBrowser),
    }

}

export default spoofEnvironment;