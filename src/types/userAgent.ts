import { CommonPlatform } from "./inferredBrowser";


export interface UserAgentObject {
    deviceCategory: "desktop" | "mobile" | "tablet";
    platform: CommonPlatform;
    vendor: string;
    userAgent: string;
    appName: string;
    language: string;
    screenHeight: number;
    screenWidth: number;
    viewportHeight: number;
    viewportWidth: number;
    pluginsLength: number;
}

export interface UserAgentResponse {
    success: boolean;
    msg?: string;
    data: UserAgentObject[];
}