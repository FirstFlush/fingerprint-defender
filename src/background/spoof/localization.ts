import moment from "moment-timezone";
import { Localization, Languages } from "../../types/environment";
import { DetectedLocalization } from "../../types/detectedEnvironment";
import { TZ_REGIONS, TZ_VALID_ATLANTIC, TZ_AWARE_LANGUAGES, TZ_VALID_PACIFIC } from "@/data/timezone";
import { TzRegion } from "../../types/timezone";

const getTzRegion = (tz: string): TzRegion => {
    if (tz.startsWith("Africa/")) return "Africa"
    else if (tz.startsWith("America/")) return "America";
    else if (tz.startsWith("Atlantic/")) return "Atlantic"
    else if (tz.startsWith("Asia/")) return "Asia"
    else if (tz.startsWith("Europe/")) return "Europe"
    else if (tz.startsWith("Pacific/")) return "Pacific"
    else if (tz.startsWith("Australia/")) return "Australia"
    else throw new Error(`Unknown timezone: ${tz}`);
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
    
const adjustLanguages = (languages: string[], tz: string, tzOffset: number) => {
    while( languages.length > 2) {
        languages.pop()
    }
    if (languages.length === 2 && Math.random() < 0.5) {
        languages.pop();
    }
    if (languages.length < 3) {
        const tzAwareLanguage = getTzAwareLanguage(tz, tzOffset)
        if (!languages.includes(tzAwareLanguage) && Math.random() < 0.5) {
            languages.push(tzAwareLanguage);
        }
    }
}

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

const overrideTz = (timezone: string): void => {
    const original = Intl.DateTimeFormat.prototype.resolvedOptions;
    Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
        value: function () {
            return { ...original.call(this), timeZone: timezone };
        },
        configurable: true,
    });
};

const overrideLanguages = (languages: string[]) => {

    Object.defineProperty(navigator, "languages", {
        get: () => {
            const expanded = languages.flatMap(lang => {
                const base = lang.split("-")[0];
                return lang !== base ? [lang, base] : [lang];
            });
            return expanded;
        },
        configurable: true,
    })
}

const overrideLanguage = (languages: string[]) => {
    Object.defineProperty(navigator, "language", {
        get: () => {
            return languages[0]
        }
    })
}

const overrideLocale = (languages: string[]) => {
    const original = Intl.DateTimeFormat.prototype.resolvedOptions;
    Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
      value: function () {
        return {
          ...original.call(this),
          locale: languages[0],
        };
      },
      configurable: true,
    });
}

export const spoofLocalization = (
    detectedLocalization: DetectedLocalization
): Localization => {
    const spoofedTz = getSpoofedTz(detectedLocalization.timezoneOffset);
    overrideTz(spoofedTz);
    const languages = [...detectedLocalization.languages];
    adjustLanguages(languages, spoofedTz, detectedLocalization.timezoneOffset);
    overrideLanguages(languages);
    overrideLanguage(languages);
    overrideLocale(languages);
    return {
        timezone: Intl.DateTimeFormat.prototype.resolvedOptions().timeZone,
        timezoneOffset: detectedLocalization.timezoneOffset,
        languages: navigator.languages as Languages,
        language: navigator.language,
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
    };
};


