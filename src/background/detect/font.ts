import { DetectedFontFingerprint } from "@/types/detectedEnvironment";
import { FONTS } from "@/data/fonts";
import { TEST_SIZE, TEST_STRING } from "@/data/fingerprintConstants";

const BASELINE_FONTS = ["monospace", "sans-serif"];

const createSpan = (font: string): HTMLSpanElement => {
    const span = document.createElement("span");
    span.style.position = "absolute";
    span.style.left = "-9999px";
    span.style.visibility = "hidden";
    span.style.whiteSpace = "nowrap";
    span.style.fontSize = TEST_SIZE;
    span.style.fontFamily = font;
    span.innerText = TEST_STRING;
    document.body.appendChild(span);
    return span;
};

const getInstalledFonts = (): string[] => {
    const testDiv = document.createElement("div");
    document.body.appendChild(testDiv);

    const getDims = (el: HTMLElement) => ({
        width: el.offsetWidth,
        height: el.offsetHeight,
    });

    const baselines: Record<string, { width: number; height: number }> = {};
    for (const base of BASELINE_FONTS) {
        const baseSpan = createSpan(base);
        baselines[base] = getDims(baseSpan);
        testDiv.appendChild(baseSpan);
    }

    const detected: string[] = [];

    for (const font of FONTS) {
        for (const fallback of BASELINE_FONTS) {
            const testFont = `${font}, ${fallback}`;
            const span = createSpan(testFont);
            const dims = getDims(span);
            const baseDims = baselines[fallback];

            if (dims.width !== baseDims.width || dims.height !== baseDims.height) {
                detected.push(font);
                break;
            }
        }
    }

    document.body.removeChild(testDiv);
    return detected;
};

export const getFontFingerprint = (): DetectedFontFingerprint => {
    return {
        installed: getInstalledFonts(),
    };
};
