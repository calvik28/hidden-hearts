# Hidden Hearts RPG Visual Asset Pipeline

This project is a fully static Vite app. Generated art must be saved into the repository and referenced from local static paths. Do not call image APIs at runtime and do not add a backend for asset delivery.

The concrete first-pass manifest and ready-to-use prompts live in `docs/generated-asset-prompts.md`.

## Recommended Folders

```text
public/assets/generated/
public/assets/generated/ui/
public/assets/generated/chapters/
public/assets/generated/textures/
public/assets/generated/icons/
```

Use lowercase, hyphenated filenames that include the chapter number or purpose, such as `chapter-01-smoke-sky.webp`, `vault-door-runes.png`, or `portal-heart-ring.png`.

## High-Value Assets

- Title screen background: a polished first impression for the vault entrance or a future title state.
- Vault door texture: metal, runes, lock grooves, hidden-heart motifs, and subtle magical scratches.
- Chapter-specific skybox/background panels: one per playable chapter, matching each level mood.
- UI frame texture: subtle border/rune overlays for HUD panels, briefing cards, and completion dialogs.
- Ally/emblem icons: small warm symbols for Jimmy, Gem, Mumbo, Pearl, Solo, Scar, and Team Signal.
- Enemy sigil icons: readable threat marks for Tekbox, Ethical, Moonlight, Lucid, Tithonus, Doubt, Fear, and Cyclone.
- Portal texture: transparent PNG/WebP ring, inner vortex, or glyph overlay for the chapter gate.
- Pickup icons: small magical item art for chapter collectibles.
- Finale illustration: Chapter 6 Coming Soon art with a cliff-edge, portal, or unresolved-heart composition.

## Prompt Templates

### Chapter Background

```text
Create a cinematic fantasy RPG background for Hidden Hearts RPG, chapter [number]: [chapter title].
Mood: [weather], [zone], emotional theme of [theme].
Visual motifs: hidden hearts, subtle wings, city skyline, magical particles, no readable text.
Style: painterly game background, atmospheric, high contrast but readable, mobile-friendly composition.
Output: 16:9, no watermark, leave central lower area calm for gameplay UI.
```

### Vault Door Texture

```text
Create a seamless-ish square fantasy vault door texture for a browser RPG.
Motifs: hidden hearts, rotating lock rings, brass and dark steel, tiny runic grooves, magical cyan/gold/rose glints.
Style: polished game asset, front-facing, no text, no characters.
Output: 2048x2048 texture, suitable for static web use.
```

### UI Frame

```text
Create a transparent PNG UI frame overlay for a magical RPG HUD panel.
Motifs: thin etched lines, hidden-heart corners, subtle wing feather marks, soft gold/cyan glow.
Style: elegant, readable, not busy, no text.
Output: transparent background, 16:9-safe border frame.
```

### Character Or Emblem Icon

```text
Create a small RPG emblem icon for [ally/enemy/pickup name] in Hidden Hearts RPG.
Mood: [warm ally / dangerous villain / magical clue].
Motifs: [specific symbol], hidden heart, subtle wing or rune detail.
Style: readable at 64px, high contrast, no text, transparent background.
Output: square PNG.
```

### Portal Texture

```text
Create a transparent magical portal ring for Hidden Hearts RPG.
Motifs: heart-shaped glyphs, rotating chapter gate, wing-like arcs, [chapter accent color] glow.
Style: luminous game VFX texture, no text, transparent background.
Output: square PNG/WebP with alpha.
```

### Finale Illustration

```text
Create a cinematic Coming Soon finale illustration for Hidden Hearts RPG chapter 6.
Mood: hopeful cliffhanger, magical city at night, unresolved portal, hidden hearts and wings.
Style: emotional fantasy RPG key art, no readable text, no watermark.
Output: 16:9 hero image with safe empty space for overlay buttons.
```

## Integration Notes For Future Codex Passes

- Save generated images under `public/assets/generated/` and reference them with root-relative URLs like `/assets/generated/chapters/chapter-01-smoke-sky.webp`.
- Keep all generated assets local so Vercel can deploy the app as static files.
- Prefer WebP for opaque backgrounds and PNG for alpha textures such as icons, portal rings, and UI frames.
- Add asset path fields to `src/game/levels.js` only when the files exist locally.
- In Three.js, load textures with `THREE.TextureLoader` inside `HiddenHeartsScene.jsx`, dispose loaded textures during scene cleanup, and keep procedural fallbacks for missing files.
- In React/CSS, use generated UI assets as optional backgrounds or masks without hiding readable text.
- Do not embed AO3 or fanfic text into images. Keep source reading linked out to AO3.
