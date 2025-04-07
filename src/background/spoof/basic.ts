import moment from "moment-timezone";
import { DetectedEnvironment } from "@/types/detectedEnvironment";
import { KNOWN_PERMISSIONS } from "@/data/permissions";
import { inferBrowser } from "./inferBrowser";
import UserAgent from "user-agents";
import {
    Display,
    DeviceType,
    Hardware,
    Localization,
    NetworkFingerprint,
    PerformanceTiming,
    PrivacySignals,
    SensorAccess,
    StorageInfo,
    UserAgentData, 
    NetworkInformation, 
    PermissionName
} from "@/types/environment";
import {
    DetectedDisplay,
    DetectedDeviceType,
    DetectedHardware,
    DetectedLocalization,
    DetectedNetworkFingerprint,
    DetectedPerformanceTiming,
    DetectedPrivacySignals,
    DetectedSensorAccess,
    DetectedStorageInfo,
} from "@/types/detectedEnvironment";
import { InferredBrowser } from "@/types/inferredBrowser";

