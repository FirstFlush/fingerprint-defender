import { DetectedAudioFingerprint } from "@/types/detectedEnvironment"

export const getAudioFingerprint = (): DetectedAudioFingerprint => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    return {
        context: {
            sampleRate: context.sampleRate,
            channelCount: context.destination.channelCount,
        },
    };
};
