# Browser Fingerprinting: The 4 Threat Vectors That Matter Most

Browser fingerprinting is the practice of silently collecting attributes from a user’s device to create a persistent, unique identifier—without cookies or logins. While dozens of values contribute to a fingerprint, only a few are truly high-impact.

This doc breaks down the **4 most dangerous fingerprint surfaces**, explains what each one reveals, and why they deserve top priority in any anti-fingerprinting system.

---

## 🧱 1. WebGL Fingerprinting

### What It Does
WebGL (Web Graphics Library) is a low-level graphics API that gives websites access to your GPU for rendering 3D graphics. It's also a goldmine for fingerprinting because it exposes extremely specific information about your graphics hardware and drivers.

### Why It's Dangerous
- Reveals GPU model and driver details via the debug renderer extension.
- Leaks hardware limits: texture sizes, buffer dimensions, shader support.
- Very few tools spoof it effectively.
- Hard to tamper with without breaking rendering.

### What It Can Uniquely Identify
- GPU brand and family (Intel HD, Nvidia RTX, etc.)
- Rendering backend (Direct3D, OpenGL, ANGLE)
- OS-specific rendering quirks

---

## 🖌️ 2. Canvas Fingerprinting

### What It Does
Canvas fingerprinting renders text or shapes on an off-screen canvas, then reads the pixel data. Because rendering differs across systems, the image output becomes a unique signature.

### Why It's Dangerous
- Picks up subpixel rendering, anti-aliasing, font smoothing
- Can vary even across systems with identical specs
- Stealthy—requires no permission or user interaction

### What It Can Uniquely Identify
- Font stack and font rendering engine
- OS-level text rendering behavior
- GPU vs software fallback rendering

---

## 🎧 3. AudioContext Fingerprinting

### What It Does
This technique creates an audio signal (like a sine wave) and analyzes how the browser’s audio engine processes it. Subtle differences in output reflect underlying hardware, drivers, and OS behavior.

### Why It's Dangerous
- Extremely hard to spoof accurately
- Can produce unique fingerprints even on otherwise identical systems
- Little known, but widely used in advanced trackers

### What It Can Uniquely Identify
- Audio hardware or software stack differences
- Latency and buffer resolution quirks
- Browser-specific Web Audio implementation details

---

## 🔤 4. Font Fingerprinting

### What It Does
By attempting to render hidden text in a variety of fonts and checking the dimensions, websites can infer which fonts are installed on your system—even if you're not actively using them.

### Why It's Dangerous
- Fonts reveal operating system, locale, installed software
- High entropy: different users = different font stacks
- Often used in combination with canvas for cross-checking

### What It Can Uniquely Identify
- OS language and regional variant
- Enterprise or niche font packages
- Custom-installed fonts

---

## Summary

| Vector     | Reveals                         | Spoof Difficulty | Entropy |
|------------|----------------------------------|------------------|---------|
| **WebGL**  | GPU/driver/system rendering     | 🔥 Very High     | 🟢🟢🟢🟢🟢 |
| **Canvas** | Font/rendering/subpixel details | 🔥 High          | 🟢🟢🟢🟢   |
| **Audio**  | Sound engine processing         | 🔥 Very High     | 🟢🟢🟢🟢   |
| **Fonts**  | Installed fonts + locale        | 🔥 Moderate      | 🟢🟢🟢     |

These four fingerprinting vectors form the core of most advanced tracking systems. If you're building a privacy extension or spoofing engine, these are your primary targets—for detection and ultimately for spoofing.
