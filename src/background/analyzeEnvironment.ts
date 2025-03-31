import { RealEnvironment, DeviceType, Language, ScreenSize } from "../types/environment";
import moment from "moment-timezone";

const getScreenSize = (): ScreenSize => {
    return {
        width: window.screen.width,
        height: window.screen.height
    }
}

const getLanguages = (): Language => {
    return [...navigator.languages] as [string, ...string[]]
}

const getDeviceType = ( { width }: ScreenSize ): DeviceType => {
    if (width < 768) return "mobile";
    else if (width < 1024) return "tablet";
    else return "desktop";
}

const getTimezone = (): string => {
    return moment.tz.guess();
}

const analyzeEnvironment = (): RealEnvironment => {
    const screenSize = getScreenSize();
    return {
        deviceType: getDeviceType(screenSize),
        screen: screenSize,
        language: getLanguages(),
        timezone: getTimezone(),
    };
}

export default analyzeEnvironment;