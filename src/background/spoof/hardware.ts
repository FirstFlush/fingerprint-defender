import { BatteryManager, DeviceType, Hardware } from "@/types/environment";
import { CommonBrowser, InferredBrowser } from "@/types/inferredBrowser";

const spoofHardwareConcurrency = (deviceType: DeviceType) => {
    Object.defineProperty(navigator, "hardwareConcurrency", {
        get: () => {
            const concurrencyValues = deviceType === "mobile" ? [2, 4] : [2, 4, 8];
            return concurrencyValues[Math.floor(Math.random() * concurrencyValues.length)]
        },
        configurable: true,
    })
}

const spoofDeviceMemory = (browser: CommonBrowser, deviceType: DeviceType) => {

    if (browser === "Firefox") {
        Object.defineProperty(navigator, "deviceMemory", {
            get: () => undefined,
            configurable: true,
        })
    } else {
        Object.defineProperty(navigator, "deviceMemory", {
            get: () => {
                return deviceType === "desktop" ? 8 : [2, 4][Math.floor(Math.random() * 2)]
            },
            configurable: true,
        })
    } 
}

const spoofMaxTouchPoints = (deviceType: DeviceType) => {
    const nonDesktopRange = [5, 6, 7, 8, 9, 10];
    Object.defineProperty(navigator, "maxTouchPoints", {
        get: () => deviceType === "desktop" ? 0 : nonDesktopRange[Math.floor(Math.random() * nonDesktopRange.length)],
        configurable: true,
    })
}
const spoofBattery = (browser: CommonBrowser) => {
    if (browser === "Firefox") {
        Object.defineProperty(navigator, "getBattery", {
            value: () => Promise.resolve(undefined),
            configurable: true,
        });
    } else {
        Object.defineProperty(navigator, "getBattery", {
            value: () =>
                Promise.resolve({
                    level: Math.min(1, Math.max(0, 0.75 + (Math.random() * 0.4 - 0.2))),
                    charging: false,
                    dischargingTime: Infinity,
                    chargingTime: 0,
                    onchargingchange: null,
                    onlevelchange: null,
                    onchargingtimechange: null,
                    ondischargingtimechange: null,
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    dispatchEvent: () => false,
                } satisfies BatteryManager),
            configurable: true,
        });
    }
};

export const getBattery = async (browser: CommonBrowser): Promise<BatteryManager | undefined> => {
    if (browser === "Firefox") return undefined;
    const battery = await (navigator as any).getBattery();
    return battery;
};


export const spoofHardware = async (inferredBrowser: InferredBrowser): Promise<Hardware> => {
    spoofHardwareConcurrency(inferredBrowser.deviceType)
    spoofDeviceMemory(inferredBrowser.browser, inferredBrowser.deviceType)
    spoofMaxTouchPoints(inferredBrowser.deviceType)
    spoofBattery(inferredBrowser.browser)
    return {
        concurrency: navigator.hardwareConcurrency,
        deviceMemory: (navigator as any).deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
        battery: await getBattery(inferredBrowser.browser)
    }

}

