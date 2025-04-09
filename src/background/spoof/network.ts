import { CommonBrowser } from "@/types/inferredBrowser";
import { NetworkFingerprint } from "@/types/environment";
import { SPOOFED_EFFECTIVE_TYPES } from "@/data/network";

const spoofConnection = (browser: CommonBrowser) => {
    if (browser === "Firefox" || browser === "Safari") {
        Object.defineProperty(navigator, "connection", {
            get: () => undefined,
            configurable: true,
        });
    } else {
        Object.defineProperty(navigator, "connection", {
            configurable: true,
            get: () => ({
                downlink: parseFloat((2 + Math.random() * 18).toFixed(1)), // 2-20 Mbps
                rtt: 30 + Math.floor(Math.random() * 50), //30-80ms
                effectiveType:
                    SPOOFED_EFFECTIVE_TYPES[
                        Math.floor(
                            Math.random() * SPOOFED_EFFECTIVE_TYPES.length
                        )
                    ],
                saveData: false,
                onchange: null,
            }),
        });
    }
};

/**
 * Check if IP is internal/private with regex by matching private network IP patterns:
 *  - 192.168.x.x
 *  - 10.x.x.x
 *  - 172.16-31.x.x
 *  - fdxx (IPv6)
 */
const isPrivateCandidate = (candidateStr: string): boolean => {
    return (
        /^(a=candidate:)/.test(candidateStr) &&
        /192\.168|10\.|172\.(1[6-9]|2\d|3[01])|fd[0-9a-f]{2}/i.test(
            candidateStr
        )
    );
};

/**
 * Overrides the default WebRTC behavior to prevent internal/private IP addresses
 * from being exposed through ICE candidates. This is done by replacing the 
 * RTCPeerConnection constructor with a wrapped version that filters out any 
 * candidates containing local IPs (like 192.168.x.x or 10.x.x.x).
 * 
 * All other WebRTC functionality continues to work as normal — the only difference
 * is that local IPs will never be passed to event listeners.
 */
export const spoofWebRTC = () => {
    const originalRTCPeerConnection = window.RTCPeerConnection;
    class SpoofedRTCPeerConnection extends originalRTCPeerConnection {
        constructor(config?: RTCConfiguration) {
            super(config);

            const origAddEventListener = this.addEventListener;
            this.addEventListener = function (
                type: string,
                listener: EventListenerOrEventListenerObject,
                options?: boolean | AddEventListenerOptions
            ) {
                if (type === "icecandidate") {
                    const wrappedListener = (e: Event) => {
                        const iceEvent = e as RTCPeerConnectionIceEvent;
                        if (
                            iceEvent.candidate &&
                            isPrivateCandidate(iceEvent.candidate.candidate)
                        )
                            return;
                        (listener as EventListener)(iceEvent);
                    };
                    return origAddEventListener.call(
                        this,
                        type,
                        wrappedListener,
                        options
                    );
                }
                return origAddEventListener.call(this, type, listener, options);
            };
        }
    }

    Object.defineProperty(window, "RTCPeerConnection", {
        configurable: true,
        writable: true,
        value: SpoofedRTCPeerConnection,
    });
};

const checkForInternalIPLeak = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        const pc = new RTCPeerConnection({ iceServers: [] });
        const ips: string[] = [];
        let timeout = setTimeout(() => resolve(false), 3000);  
        pc.createDataChannel("test");
        pc.addEventListener("icecandidate", (event) => {
            if (!event.candidate) {
                clearTimeout(timeout)
                resolve(ips.some(ip => isPrivateCandidate(ip)));
                return;
            }
            const candidate = event.candidate.candidate;
            ips.push(candidate);
        });
        pc.createOffer().then((offer) => pc.setLocalDescription(offer));     
    });
};

export const spoofNetwork = async (browser: CommonBrowser): Promise<NetworkFingerprint> => {
    spoofConnection(browser);
    spoofWebRTC();
    return {
        connection: (navigator as any).connection,
        webRTC: {
            leaksInternalIP: await checkForInternalIPLeak(),
        },
    };
};
