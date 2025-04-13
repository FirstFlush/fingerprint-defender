import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
import { COMMON_PLATFORMS } from "@/data/platforms";
import { DeviceType, NetworkInformation } from "./environment";
import { UserAgentObject } from "./userAgent";

export type CommonBrowser = (typeof COMMON_BROWSER_MAPPING)[number]["name"];
export type CommonPlatform = (typeof COMMON_PLATFORMS)[number];


export interface InferredBrowser {
    userAgentObject: UserAgentObject
    browser: CommonBrowser;
    deviceType: DeviceType;
    connection?: NetworkInformation;
    platform: CommonPlatform;
}




// import { COMMON_BROWSER_MAPPING } from "@/data/browsers";
// import { COMMON_PLATFORMS } from "@/data/platforms";
// import { DeviceType, NetworkInformation } from "./environment";
// import UserAgent from "user-agents";

// export type CommonBrowser = (typeof COMMON_BROWSER_MAPPING)[number]["name"];
// export type CommonPlatform = (typeof COMMON_PLATFORMS)[number];
// type Data = InstanceType<typeof UserAgent>["data"];

// export interface InferredBrowser
//     extends Omit<
//         Data,
//         | "appName"
//         | "connection"
//         | "platform"
//         | "random"
//         | "deviceCategory"
//         | "connection"
//     > {
//     browser: CommonBrowser;
//     deviceType: DeviceType;
//     connection?: NetworkInformation;
//     platform: CommonPlatform;
// }
