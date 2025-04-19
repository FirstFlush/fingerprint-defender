import { StorageInfo } from "@/types/environment";
import { CommonBrowser } from "@/types/inferredBrowser";

const spoofEstimate = () => {
    Object.defineProperty(navigator.storage, "estimate", {
        configurable: true,
        get: () => async() => ({
            usage: 0,
            quota: 10_000_000_000 + Math.floor(Math.random() * 10_000_000_000),
        })
    })
}

const spoofPersisted = () => {
    Object.defineProperty(navigator.storage, "persisted", {
        configurable: true,
        get: () => async () => false,
    })
}

const spoofStorageAsUndefined = () => {
    Object.defineProperty(navigator, "storage", {
        configurable: true,
        get: () => undefined
    })
}

export const spoofStorage = async (browser: CommonBrowser): Promise<StorageInfo | undefined> => {
    if (browser === "Safari" || browser === "Firefox"){
        spoofStorageAsUndefined()
        return undefined
    }
    spoofEstimate()
    spoofPersisted()
    return {
        estimate: await navigator.storage.estimate(),
        persisted: await navigator.storage.persisted(),
    }
} 

