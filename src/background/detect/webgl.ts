import { DetectedWebGLFingerprint } from "@/types/detectedEnvironment";

export const getWebGLFingerprint = (): DetectedWebGLFingerprint => {
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
