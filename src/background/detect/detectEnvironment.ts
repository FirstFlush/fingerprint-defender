import { DeviceType } from "../../types/environment";
import { DetectedEnvironment, DetectedDisplay, DetectedHardware,
    DetectedLocalization, DetectedBrowser, DetectedWebGLFingerprint 
} from "../../types/detectedEnvironment";
import moment from "moment-timezone";





const getDetectedWebGLFingerprint = (): DetectedWebGLFingerprint => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext;
    if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    
        return {
            renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "unknown",
            vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "unknown",
            shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
            parameters: {
                maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
                maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
                aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
                aliasedPointSizeRange: gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE),
                maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
            }
        }
    }
    throw new TypeError("WebGLRenderingContext not found!");
    
} 

const getLocalization = (): DetectedLocalization => {
    return {
        languages: [...navigator.languages] as [string, ...string[]],
        timezone: moment.tz.guess(),
    }
}

const getHardware = (): DetectedHardware => {
    const deviceMemory = (navigator as any).deviceMemory
    return {
        concurrency: navigator.hardwareConcurrency,
        deviceMemory: deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
    }
}


const getBrowser = (): DetectedBrowser => {
    const oscpu = (navigator as any).oscpu
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        oscpu: oscpu
    }
}

const getDisplay = (): DetectedDisplay => {
    return {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        devicePixelRatio: devicePixelRatio,
    }
}

// const getLanguages = (): Language => {
//     return [...navigator.languages] as [string, ...string[]]
// }

const getDeviceType = ( { width }: DetectedDisplay ): DeviceType => {
    if (width < 768) return "mobile";
    else if (width < 1024) return "tablet";
    else return "desktop";
}


// const detectEnvironment = (): DetectedEnvironment => {
//     const screen = getScreen();
//     return {
//         deviceType: getDeviceType(screen),
//         screen: screen,
//         language: getLanguages(),
//         timezone: getTimezone(),
//     };
// }

// export default detectEnvironment;