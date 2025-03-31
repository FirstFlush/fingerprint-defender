import { DeviceType, Language } from "../../types/environment";
import { DetectedEnvironment, DetectedScreen } from "../../types/detectedEnvironment";
import moment from "moment-timezone";



const getScreen = (): DetectedScreen => {
    return {
        width: window.screen.width,
        height: window.screen.height
    }
}

const getLanguages = (): Language => {
    return [...navigator.languages] as [string, ...string[]]
}

const getDeviceType = ( { width }: DetectedScreen ): DeviceType => {
    if (width < 768) return "mobile";
    else if (width < 1024) return "tablet";
    else return "desktop";
}

const getTimezone = (): string => {
    return moment.tz.guess();
}

const detectEnvironment = (): DetectedEnvironment => {
    const screen = getScreen();
    return {
        deviceType: getDeviceType(screen),
        screen: screen,
        language: getLanguages(),
        timezone: getTimezone(),
    };
}

export default detectEnvironment;