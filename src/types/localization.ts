import moment from "moment-timezone";
import { Localization, Languages } from "./environment";
import { DetectedLocalization } from "./detectedEnvironment";
import { TZ_REGIONS, TZ_VALID_ATLANTIC, TZ_AWARE_LANGUAGES, TZ_VALID_PACIFIC } from "@/data/timezone";
import { TzRegion } from "./timezone";


const getTzRegion = (timezone: string): TzRegion => {
    if (timezone.startsWith("Africa/")) return "Africa"
    else if (timezone.startsWith("America/")) return "America";
    else if (timezone.startsWith("Atlantic/")) return "Atlantic"
    else if (timezone.startsWith("Asia/")) return "Asia"
    else if (timezone.startsWith("Europe/")) return "Europe"
    else if (timezone.startsWith("Pacific/")) return "Pacific"
    else if (timezone.startsWith("Australia/")) return "Australia"
    else throw new Error(`Unknown timezone: ${timezone}`);
};


const getTzAwareLanguage = (
    tz: string,
    tzOffset: number
) => {
    const tzRegion = getTzRegion(tz);
    let langRegion: keyof typeof TZ_AWARE_LANGUAGES;
    switch (tzRegion) {
        case "Asia": {
            if (tzOffset <= 240) langRegion = "AsiaWest";         // UTC+4
            if (tzOffset <= 360) langRegion = "AsiaSouth";        // Up to UTC+6
            langRegion = "AsiaEast";                              // UTC+6.5 to UTC+9+
        }
        case "America": {
            if (tzOffset >= -240) langRegion = "AmericaSouth";    // UTC-3+
            if (tzOffset >= -360) langRegion = "AmericaMiddle";   // UTC-5 to UTC-6
            langRegion = "AmericaNorth";                          // UTC-7 and earlier
        }
        default: {
            langRegion = tzRegion as keyof typeof TZ_AWARE_LANGUAGES;
        }
    }
    const langs = TZ_AWARE_LANGUAGES[langRegion]
    const length = TZ_AWARE_LANGUAGES[langRegion].length 
    return langs[Math.floor(Math.random() * length)]
};


const getSpoofedTz = (offset: number): string => {
    const tzOptions = moment.tz.names().filter((name) => {
        const [ tzRegion ] = name.split("/");
        const isValidContinent = TZ_REGIONS.includes(tzRegion as any);
        const isValidAtlantic = tzRegion !== "Atlantic" || TZ_VALID_ATLANTIC.has(name);
        const isValidPacific = tzRegion !== "Pacific" || TZ_VALID_PACIFIC.has(name);
        return (
            moment.tz(name).utcOffset() === offset &&
            isValidContinent &&
            isValidAtlantic &&
            isValidPacific
        );
    });
    return tzOptions[Math.floor(Math.random() * tzOptions.length)];
};


const spoofTz = (offset: number) => {

    const newTz = getSpoofedTz(offset)
    const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
    Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
        value: function () {
            return {
                ...originalResolvedOptions.call(this),
                timeZone: newTz,
            };
        },
        configurable: true,
    });
};


const addLanguage = (language: string, languages: [string, ...string[]]) => {
    languages.push(language);
}

const removeLanguage = (languages: string[]) => {
    languages.pop()
}
    
const adjustLanguages 


const spoofLanguages = (detectedLangauges: Languages) => {
    const langs = [...detectedLangauges];



    Object.defineProperty(navigator, "langauges", {
        get: () => spoofedLanguages,
        configurable: true,
    });
};



export const spoofLocalization = (
    detectedLocalization: DetectedLocalization
): Localization => {
    spoofTimeZone(detectedLocalization.timezoneOffset);

    return {
        timezone: Intl.DateTimeFormat.prototype.resolvedOptions().timeZone,
        timezoneOffset: detectedLocalization.timezoneOffset,
        languages: navigator.languages as Languages,
        language: navigator.language,
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
    };
};

// export interface Localization {
//     language: string;
//     languages: Languages
//     timezone: string;
//     timezoneOffset: number;
// }
