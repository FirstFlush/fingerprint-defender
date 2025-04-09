import { COMMON_MEDIA_DEVICES, COMMON_MIME_TYPES, COMMON_PLUGINS } from "@/data/media";


export type PluginInternal = (typeof COMMON_PLUGINS)[number];
export type Plugin = Omit<PluginInternal, "id" | "requiredForBrowsers">

export type MimeTypeInternal = (typeof COMMON_MIME_TYPES)[number];
export type MimeType = Omit<MimeTypeInternal, "pluginId"> & {
    enabledPlugin: Plugin;
};

export type PluginId = PluginInternal["id"];

export type MediaDevice = (typeof COMMON_MEDIA_DEVICES)[number];

export type DeviceKind = "audioinput" | "videoinput" | "audiooutput";