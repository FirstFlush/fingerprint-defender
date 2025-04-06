

// A blend of wide ('m') and narrow ('l', 'i') characters reveals subtle rendering differences.
// Helps detect variations in font smoothing, kerning, and rasterization across systems.
// Sources:
// - https://x.com/csswizardry/status/1153281404551254016
// - https://virpo.sk/browser-fingerprinting-hraska-diploma-thesis.pdf
export const TEST_STRING = "mmmmmmmmmmlli"; 

// Large font size amplifies rendering artifacts, improving fingerprint accuracy.
export const TEST_SIZE = "72px";

