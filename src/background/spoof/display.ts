import { DeviceType, Display } from "@/types/environment";
import { InferredBrowser } from "@/types/inferredBrowser";

const spoofOrientation = (deviceType: DeviceType)  => {
    Object.defineProperty(screen.orientation, "type", {
        get: (): OrientationType => deviceType === "mobile" ? "portrait-primary" : "landscape-primary",
        configurable: true
    })

    Object.defineProperty(screen.orientation, "angle", {
        get: (): number => 0,
        configurable: true,
    })
}

export const spoofDisplay = (inferredBrowser: InferredBrowser): Display => {

    spoofOrientation(inferredBrowser.deviceType);

    return {
        width: inferredBrowser.userAgentObject.screenWidth,
        height: inferredBrowser.userAgentObject.screenHeight,
        availWidth: inferredBrowser.userAgentObject.viewportWidth,
        availHeight: inferredBrowser.userAgentObject.viewportHeight,
        pixelDepth: 24,
        colorDepth: 24,
        devicePixelRatio: 1,
        orientation: {
            type: screen.orientation.type,
            angle: screen.orientation.angle,
        }
    }
}