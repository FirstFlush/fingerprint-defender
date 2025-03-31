

export type DeviceType = "mobile" | "tablet" | "desktop";
export type Language = [string, ...string[]];
export interface ScreenSize {
    width: number
    height: number
};

export interface RealEnvironment {
    deviceType: DeviceType
    screen: ScreenSize
    language: Language
    timezone: string
};