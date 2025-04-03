import { DetectedCanvasFingerprint } from "@/types/detectedEnvironment";

/**
 * Runs a canvas winding rule test to detect how the browser handles overlapping shape fills.
 * This uses the 'evenodd' rule to test rendering behavior that varies subtly across platforms.
 * 
 * Returns:
 * - true: common in Chrome/macOS
 * - false: common in Firefox/Linux
 */
const windingRuleTest = (ctx: CanvasRenderingContext2D): boolean => {
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);      // Big outer circle
    ctx.arc(50, 50, 30, 0, Math.PI * 2, false);     // Smaller inner circle
    ctx.fill("evenodd");                            // Fill with 'evenodd' rule
    return ctx.isPointInPath(50, 50, "evenodd");    // true is common on Chrome/macOS, false on Firefox/Linux
  
}

/**
 * Renders stylized text onto the canvas and returns its pixel output as a data URL.
 * The rendering result varies subtly depending on OS, browser, font smoothing, etc.
 * 
 * - Uses Arial because it's commonly installed but renders differently on most systems.
 * - These rendering quirks are highly fingerprintable.
 */
const textRendering = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): string => {
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";      
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Fingerprint!", 2, 15);
    return canvas.toDataURL();
  
}

export const getCanvasFingerPrint = (): DetectedCanvasFingerprint => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new TypeError("Can not get 2d context from canvas element for canvas fingerprinting!")
    const winding = windingRuleTest(ctx);
    const text = textRendering(canvas, ctx);
    return {
        winding: winding,
        text: text,
    };
};
