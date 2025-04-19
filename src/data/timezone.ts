
export const TZ_REGIONS = [
    "Africa",
    "America",
    "Asia",
    "Atlantic",
    "Australia",
    "Europe",
    "Indian",
    "Pacific",
] as const;


// Most Atlantic/ timezones are deprecated, but some are not:
export const TZ_VALID_ATLANTIC = new Set([
    "Atlantic/Reykjavik",
    "Atlantic/Azores",
    "Atlantic/Bermuda",
    "Atlantic/Madeira",
]); 

// Most Pacific/ timezones are deprecated, but some are not:
export const TZ_VALID_PACIFIC = new Set([
    "Pacific/Auckland",
    "Pacific/Fiji",
    "Pacific/Guam",
    "Pacific/Honolulu",
    "Pacific/Port_Moresby",
    "Pacific/Tongatapu",
  ]);


export const TZ_AWARE_LANGUAGES = {
    Africa: [
        "en-GB",
        "fr-FR",
        "ar-SA",        // Arabic
    ],

    AmericaMiddle: [    // Florida, Quebec, Colombia, Peru, Cuba
        "en-US",
        "es-ES",
        "fr-FR",
    ],
    AmericaNorth: [
        "en-US",
        "es-ES",
        "fr-FR",
        "de-DE",
        "zh-CN",
        "hi-IN",
        "nl-NL",
        "it-IT",
        "ja-JP",
    ],
    AmericaSouth: [
        "pt-BR",
        "es-ES",
        "en-US",
    ],
    AsiaEast: [
        "zh-CN",
        "ja-JP",
        "ko-KR",
        "en-US",
    ],
    AsiaSouth: [
        "hi-IN",        // Hindi
        "en-GB",
        "bn-BD",        // Bengali
        "ur-PK",        // Urdu
    ],
    AsiaWest: [
        "en-GB",
        "ar-SA",
        "fa-IR",        // Farsi
        "tr-TR",        // Turkish
        "he-IL",        // Hebrew
    ],
    Atlantic: [
        "en-GB",
        "es-ES",
        "fr-FR",
    ],
    Australia: [
        "en-GB",
        "en-US",
        "fr-FR",
        "zh-CN",
        "ja-JP",
    ],
    Europe: [
        "en-GB",
        "fr-FR",
        "es-ES",
        "de-DE",
        "it-IT",
        "nl-NL",
        "ru-RU",
    ],
    Indian: [
        "en-GB",
        "hi-IN",
        "ar-SA",
    ],
    Pacific: [
        "en-US",
        "ja-JP",
        "fr-FR",
    ],
}