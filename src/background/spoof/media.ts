import { MediaCapabilities } from "@/types/environment"
import { CommonBrowser } from "@/types/inferredBrowser"
import { Plugin, PluginInternal, PluginId, MimeType, MediaDevice } from "@/types/media"
import { COMMON_PLUGINS, COMMON_MIME_TYPES } from "@/data/media"

const createInternalPlugins = (browser: CommonBrowser): PluginInternal[] => {

    if (browser === "Safari") return [];

    const basePlugins = COMMON_PLUGINS.filter((plugin) => 
        plugin.requiredForBrowsers.includes(browser)
    )
    const additionalPlugins = COMMON_PLUGINS.filter((plugin) => 
        !plugin.requiredForBrowsers.includes(browser) && Math.random() < 0.25
    )
    return [...basePlugins, ...additionalPlugins]
}

const createMimeTypes = (browser: CommonBrowser, plugins: PluginInternal[]): MimeType[] => {

    if (browser === "Safari") return [];

    const mimeTypes: MimeType[] = [];
    for (const mimeType of COMMON_MIME_TYPES) {
        const plugin = COMMON_PLUGINS.find(p => p.id === mimeType.pluginId && plugins.includes(p))
        if (!plugin) {
            console.warn("Skipping MIME type because no corresponding plugin was found: ", mimeType)
            continue
        }
        const { pluginId, ...rest} = mimeType
        mimeTypes.push({
            ...rest,
            enabledPlugin: { ...plugin},
        })
    }
    return mimeTypes;

}

const createPlugins = (pluginsInternal: PluginInternal[]): Plugin[] => {
    return pluginsInternal.map(({ id, requiredForBrowsers, ...rest }) => rest)
}

const spoofNavigatorArray = <T extends object>(
    property: "plugins" | "mimeTypes",
    items: T[],
    nameKey: keyof T,
) => {
    const arrayLikeObject = {
        ...Object.fromEntries(items.map((item, i) => [i, item])),
        length: items.length,
        item: (i: number) => items[i],
        namedItem: (name: string) => items.find(item => item[nameKey] === name),
        [Symbol.iterator]: function* () {
            yield* items;
        },
    }
    Object.defineProperty(navigator, property, {
        get: () => arrayLikeObject,
        configurable: true,
    })
}

const spoofPdfViewerEnabled = () => {
    Object.defineProperty(navigator, "pdfViewerEnabled", {
        configurable: true,
        get: () => true,
    })
}

const createMediaDevices = (browser: CommonBrowser): MediaDevice[] => {

}


export const spoofMediaCapabilities = (browser: CommonBrowser): MediaCapabilities => {
    const pluginsInternal = createInternalPlugins(browser)
    const mimeTypes = createMimeTypes(browser, pluginsInternal)
    const plugins = createPlugins(pluginsInternal);

    spoofNavigatorArray("plugins", plugins, "name");
    spoofNavigatorArray("mimeTypes", mimeTypes, "type");
    spoofPdfViewerEnabled()

    return {
        plugins: plugins,
        mimeTypes: mimeTypes,
        mediaDevices: ,
        pdfViewerEnabled: navigator.pdfViewerEnabled,
    }

}