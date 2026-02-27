# Specification

## Summary
**Goal:** Remove all music toggle/mute controls so background music plays automatically and continuously with no user control.

**Planned changes:**
- Remove `isMusicPlaying` state and `toggleMusic` handler from `AppContext.tsx`
- Configure audio in `AppContext.tsx` to autoplay on mount with `loop = true` and `volume = 1.0`
- Add a one-time document interaction listener to retry playback silently if autoplay is blocked
- Wrap all audio operations in try/catch that fail silently
- Remove the music toggle button from `AppShell.tsx` along with all references to `isMusicPlaying` and `toggleMusic`

**User-visible outcome:** Background music plays automatically when the app loads with no pause or mute button visible. The music loops for the entire session and the app never crashes due to audio issues.
