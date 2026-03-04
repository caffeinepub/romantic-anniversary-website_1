# Specification

## Summary
**Goal:** Add background music support to the Sid & Krisha Anniversary app with a play/pause toggle button in the top-right corner.

**Planned changes:**
- In `AppContext.tsx`, create a module-level Audio object (outside the component) pointing to `/assets/music/background.mp3`, with `loop = true` and `volume = 1.0`; expose `isMusicPlaying` (default `false`) and `toggleMusic` via context; wrap all audio operations in try/catch to fail silently
- In `AppShell.tsx`, add a music toggle button in the top-right corner alongside the dark mode toggle; shows `♪` when playing and `🔇` when paused; applies a pink glow pulse CSS animation only while playing; no-ops safely if context is unavailable
- Create directory `frontend/public/assets/music/` with a `README.md` explaining where to place `background.mp3`
- Copy the provided `Kadhaippoma Oh My Kadavule 128 Kbps.mp3` file to `frontend/public/assets/music/background.mp3`

**User-visible outcome:** A music toggle button appears in the top-right corner of every page. Clicking it starts or stops the background music, with a pink glow animation indicating active playback. Music does not autoplay on load.
