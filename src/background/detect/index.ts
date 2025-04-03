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

export default detectEnvironment = (): DetectedEnvironment => {};
