import { COMMON_MIME_TYPES, COMMON_PLUGINS } from "@/data/media";


export type PluginInternal = (typeof COMMON_PLUGINS)[number];
export type Plugin = Omit<PluginInternal, "id" | "requiredForBrowsers">
// export type PluginId = PluginInternal["id"];     // not in use, but might need it

export type MimeTypeInternal = (typeof COMMON_MIME_TYPES)[number];
export type MimeType = Omit<MimeTypeInternal, "pluginId"> & {
    enabledPlugin: Plugin;
};

export type DeviceKind = "audioinput" | "videoinput" | "audiooutput";
export type MediaDeviceTemplate = {
    kind: DeviceKind;
    label: string;
};
export type MediaDevice = MediaDeviceTemplate & {
    deviceId: string;
    groupId: string;
    toJSON: () => any;
    getCapabilities?: () => any;
}

