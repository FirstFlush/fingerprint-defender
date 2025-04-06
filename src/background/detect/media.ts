import { DetectedMediaCapabilities } from "@/types/detectedEnvironment";

const getMimeTypes = (): MimeType[] => {
    if (!navigator.mimeTypes) 
        return [];
    return Array.from(navigator.mimeTypes).map((mt) => ({
      type: mt.type,
      description: mt.description,
      enabledPlugin: mt.enabledPlugin,
      suffixes: mt.suffixes,
    }));
  };
  
const getPlugins = (): Plugin[] => {
    if (!navigator.plugins) return [];
    return Array.from(navigator.plugins).map((plugin) => ({
        description: plugin.description,
        filename: plugin.filename,
        name: plugin.name,
        length: plugin.length,
        item: plugin.item,
        namedItem: plugin.namedItem,
    }))
}

const getMediaDevices = async (): Promise<MediaDeviceInfo[]> => {

    if (!navigator.mediaDevices?.enumerateDevices) {
        return []
    }
    try {
        return await navigator.mediaDevices.enumerateDevices()
    } catch (err) {
        console.warn("Failed to enumerate any media devices")
        return []
    }
}

export const getMediaCapabilities = async (): Promise<DetectedMediaCapabilities> => {

    return {
        devices: await getMediaDevices(),
        mimeTypes: getMimeTypes(),
        plugins: getPlugins(),
        pdfViewerEnabled: (navigator as { pdfViewerEnabled?: boolean }).pdfViewerEnabled ?? false,
    }
}
