# Fingerprint Defender (WIP)

**Fingerprint Defender** is a browser extension (built for Firefox) that helps users resist browser fingerprinting by generating a realistic, randomized browser identity for each session.

Instead of using fake or obviously spoofed values, this extension analyzes key details from the real environment—such as screen size, language preferences, and timezone offset—and selects a plausible fingerprint profile that blends into real-world data.

Each session gets a fresh identity, including:
- User agent string
- Screen resolution
- Timezone
- Device type (desktop/tablet/mobile)
- Language preferences
- And more to come...

This project is in early development and is not yet ready for installation. More details on installation, configuration, and usage will be added once the core spoofing logic is complete.

## Two Privacy Modes

Fingerprint Defender will offer two spoofing modes to match different threat models:

- **Stealth Mode** (default): Prioritizes realism and site compatibility. Spoofed values are plausible and consistent, helping users blend in with common fingerprint profiles and reduce CAPTCHAs or site breakage.

- **Ghost Mode**: Maximizes unlinkability and anonymity. Fingerprints are highly randomized and harder to track across sessions—but may trigger bot detection systems or degrade user experience on some sites.

## Manual Refresh

Both privacy modes are designed to persist for the browser session. However sometimes users may want to generate a new spoofed identity mid-session. Such as when a user logs out of a service and wants to ensure the service is not continuing to track them via fingerprinting techniques. There will be a button to manually refresh your spoofed identity-mid session.