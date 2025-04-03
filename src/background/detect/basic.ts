import moment from "moment-timezone";
import { KNOWN_PERMISSIONS } from "@/data/permissions";
import {
    DetectedBrowserIdentity,
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
import { UserAgentData, NetworkInformation, PermissionName } from "@/types/environment";


export const getBrowserIdentity = (): DetectedBrowserIdentity => {
    const oscpu = (navigator as any).oscpu;
    const navUAData = (navigator as any).userAgentData;
    const userAgentData: UserAgentData | undefined =
        navUAData && Array.isArray(navUAData.brands)
            ? {
                brands: navUAData.brands,
                mobile: navUAData.mobile,
                platform: navUAData.platform,
              }
            : undefined;
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        oscpu: oscpu,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        product: navigator.product,
        productSub: navigator.productSub,
        userAgentData: userAgentData,
    };
};

export const getDeviceType = ({
    width,
}: DetectedDisplay): DetectedDeviceType => {
    if (width < 768) return "mobile";
    else if (width < 1024) return "tablet";
    else return "desktop";
};

export const getDisplay = (): DetectedDisplay => {
    return {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        devicePixelRatio: window.devicePixelRatio,
    };
};

export const getHardware = (): DetectedHardware => {
    const deviceMemory = (navigator as any).deviceMemory;
    return {
        concurrency: navigator.hardwareConcurrency,
        deviceMemory: deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
    };
};

export const getLocalization = (): DetectedLocalization => {
    return {
        languages: [...navigator.languages] as [string, ...string[]],
        timezone: moment.tz.guess(),
    };
};

export const getNetworkInfo = (): DetectedNetworkFingerprint => {
    const connection: NetworkInformation | undefined  = (navigator as any).connection
    if (connection && typeof connection !== "object") {
        throw new TypeError("navigator.connection is not a valid object.");
    }
    if (!connection) return { connection: undefined }
    return { 
        connection: {
            downlink: connection.downlink,
            effectiveType: connection.effectiveType,
            rtt: connection.rtt,            
        }
    }
}

export const getPerformanceTiming = (): DetectedPerformanceTiming => {
    return {
        timeOrigin: performance.timeOrigin,
        clockDrift: Date.now() - (performance.timeOrigin + performance.now()),
    }
}

export const getPrivacySignals = async (): Promise<DetectedPrivacySignals> => {

    const globalPrivacyControl: boolean | undefined = (navigator as any).globalPrivacyControl
    const permissions: Partial<Record<PermissionName, PermissionState>> = {};
        for (const permission of KNOWN_PERMISSIONS) {
            try {
                const permissionStatus = await navigator.permissions.query({name: permission})
                permissions[permission] = permissionStatus.state
    
            } catch (err) {
                console.warn("Permission query failed: ", err)
            }
        }
    return {
        doNotTrack: navigator.doNotTrack,
        globalPrivacyControl: globalPrivacyControl,
        cookieEnabled: navigator.cookieEnabled,
        permissions: Object.keys(permissions).length > 0
            ? permissions as Record<PermissionName, PermissionState>
            : undefined
    }
}

export const getSensorAccess = (): DetectedSensorAccess => {
    const hasAccelerometer = 'Accelerometer' in window;
    const hasGyroscope = 'Gyroscope' in window;
    const hasMagnetometer = 'Magnetometer' in window;
    const hasMotionAccess = 'DeviceMotionEvent' in window;
    return {
        accelerometer: hasAccelerometer,
        gyroscope: hasGyroscope,
        magnetometer: hasMagnetometer,
        motionAccess: hasMotionAccess,
    }
}

export const getStorageInfo = async (): Promise<DetectedStorageInfo> => {
    const estimate = await navigator.storage.estimate()
    const persistence = await navigator.storage.persist()
    return {
        quota: estimate.quota,
        usage: estimate.usage,
        persistence: persistence,
    }
}