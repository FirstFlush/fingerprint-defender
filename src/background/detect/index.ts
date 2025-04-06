import { DetectedEnvironment } from "@/types/detectedEnvironment";
import {
    getBrowserIdentity,
    getDeviceType,
    getDisplay,
    getHardware,
    getLocalization,
    getNetworkInfo,
    getPerformanceTiming,
    getPrivacySignals,
    getSensorAccess,
    getStorageInfo,
} from "./basic";
import { getAudioFingerprint } from "./audio";
import { getMediaCapabilities } from "./media";
import { getCanvasFingerPrint } from "./canvas";
import { getFontFingerprint } from "./font";
import { getWebGLFingerprint } from "./webgl";


export const detectEnvironment = async (): Promise<DetectedEnvironment> => {

    const display = getDisplay();

    return {
        audioFingerprint: getAudioFingerprint(),
        browserIdentity: getBrowserIdentity(),
        canvasFingerprint: getCanvasFingerPrint(),
        display: display,
        deviceType: getDeviceType(display),
        fontFingerprint: getFontFingerprint(),
        hardware: getHardware(),
        localization: getLocalization(),
        mediaCapabilities: await getMediaCapabilities(),
        networkInfo: getNetworkInfo(),
        performanceTiming: getPerformanceTiming(),
        privacySignals: await getPrivacySignals(),
        sensorAccess: getSensorAccess(),
        storageInfo: await getStorageInfo(),
        webGLFingerprint: getWebGLFingerprint(),
    }
};
