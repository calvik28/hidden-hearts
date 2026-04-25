# Generated Asset Prompts

Use these prompts to create static image assets for Hidden Hearts RPG. Save finished files into `public/assets/generated/` using the exact paths in the manifest below. Do not call image APIs from the browser app; all generated art should be committed as local static files.

## Asset Manifest

| Priority | Asset | Save Path | Format | Use |
| --- | --- | --- | --- | --- |
| 1 | Title entrance background | `public/assets/generated/ui/title-entrance-background.png` | PNG, 16:9 | Vault entrance atmosphere |
| 1 | Vault door texture | `public/assets/generated/textures/vault-door-runes.png` | PNG, 1536x1024 | Vault door surface overlay |
| 2 | Chapter 1 background | `public/assets/generated/chapters/chapter-01-smoke-and-secrets.webp` | WebP, 16:9 | Chapter UI/scene mood |
| 2 | Chapter 1 sky panel | `public/assets/generated/chapters/chapter-01-smoke-sky-panel.webp` | WebP, 16:9 | Three.js distant sky panel |
| 2 | Chapter 2 background | `public/assets/generated/chapters/chapter-02-shift-at-the-vault.webp` | WebP, 16:9 | Chapter UI/scene mood |
| 2 | Chapter 2 sky panel | `public/assets/generated/chapters/chapter-02-storm-glass-sky-panel.webp` | WebP, 16:9 | Three.js distant sky panel |
| 2 | Chapter 3 background | `public/assets/generated/chapters/chapter-03-acesos-light.webp` | WebP, 16:9 | Chapter UI/scene mood |
| 2 | Chapter 3 sky panel | `public/assets/generated/chapters/chapter-03-gold-sparks-sky-panel.webp` | WebP, 16:9 | Three.js distant sky panel |
| 2 | Chapter 4 background | `public/assets/generated/chapters/chapter-04-council-of-warmth.webp` | WebP, 16:9 | Chapter UI/scene mood |
| 2 | Chapter 4 sky panel | `public/assets/generated/chapters/chapter-04-soft-rain-sky-panel.webp` | WebP, 16:9 | Three.js distant sky panel |
| 2 | Chapter 5 background | `public/assets/generated/chapters/chapter-05-cyclones-snare.webp` | WebP, 16:9 | Chapter UI/scene mood |
| 2 | Chapter 5 sky panel | `public/assets/generated/chapters/chapter-05-ashfall-sky-panel.webp` | WebP, 16:9 | Three.js distant sky panel |
| 3 | Portal ring texture | `public/assets/generated/textures/portal-heart-ring.png` | PNG with alpha, square | Chapter portal inner plane |
| 3 | UI panel frame | `public/assets/generated/ui/ui-panel-frame.png` | PNG with alpha, 16:9 | HUD/briefing frame overlay |
| 4 | Pickup icon | `public/assets/generated/icons/pickup-heart-clue.png` | PNG with alpha, square | Collectible sprite overlay |
| 4 | Enemy sigil | `public/assets/generated/icons/enemy-shadow-sigil.png` | PNG with alpha, square | Enemy sprite overlay |
| 5 | Finale illustration | `public/assets/generated/chapters/chapter-06-coming-soon.webp` | WebP, 16:9 | Chapter 6 finale backdrop |

## Shared Art Direction

- No readable text, signatures, watermarking, logos, or AO3/fanfic passages.
- Keep compositions readable behind UI and gameplay: calmer lower center, stronger detail near edges and skyline.
- Visual language: magical vault, hidden hearts, subtle wings, city-at-night RPG adventure, emotional chapter mood.
- Color should respect the existing chapter palettes rather than overpowering them.
- Prefer crisp silhouette and high contrast over tiny decoration because several assets appear small or behind glass panels.

## Prompts

### Title Entrance Background

```text
Create a cinematic 16:9 title entrance background for a browser fantasy RPG called Hidden Hearts RPG.
Scene: a magical vault chamber at night, dark steel and brass architecture, soft cyan/gold/rose light, hidden-heart motifs, faint wing-like shadows, floating magical dust, distant city glow beyond the vault.
Composition: leave the right third calm and readable for a quiz console, place the vault door as a powerful first-viewport signal, no text, no logos, no watermark.
Style: polished painterly game background, atmospheric but not muddy, elegant, emotionally inviting, high contrast, web-optimized.
Output: 16:9 PNG background.
```

### Vault Door Texture

```text
Create a seamless or near-seamless fantasy vault door texture for Hidden Hearts RPG. The texture should show ancient dark metal, carved magical runes, subtle glowing heart-shaped motifs, worn stone-and-metal detail, and warm violet-gold magical light in the grooves. It should feel mysterious, protective, and emotionally significant, not horror. No text, no letters, no logos, no readable symbols. The image should work as a stylized game texture that can be applied to a vault-door surface or used as a decorative overlay.
Output: 1536x1024 PNG.
```

### Chapter 1 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 1, Smoke and Secrets.
Mood: violet smoke, ember clues, restaurant-night chaos spilling into a city district, hidden hero identity, warm orange danger against deep blue shadows.
Visual motifs: hidden hearts, subtle wings, ember trails, alley lights, magical smoke, distant skyline.
Composition: calm lower center for gameplay UI, stronger detail around edges and horizon, no readable text, no logos, no watermark.
Style: painterly cinematic game background, magical but grounded, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 1 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 1 Smoke and Secrets.
Scene: violet smoke over a nighttime city skyline, ember-orange glow near the horizon, faint hidden-heart constellations, subtle wing-shaped cloud forms.
Requirements: no foreground characters, no readable text, no logo, horizon readable behind 3D objects, dark upper sky.
Style: atmospheric painterly skybox panel, soft depth, web game asset.
Output: 16:9 WebP.
```

### Chapter 2 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 2, Shift at the Vault.
Mood: storm glass, hospital pressure, bank alarm, rain-bright cyan light, emotional urgency, fractured reflections.
Visual motifs: moonlit glass, medical-blue glow, vault alarm arcs, hidden hearts, subtle wings, wet city pavement, distant hospital silhouette.
Composition: calm lower center for UI, strong cyan horizon, no readable text, no logos, no watermark.
Style: cinematic painterly game background, tense but clear, mobile-readable.
Output: 16:9 WebP.
```

### Chapter 2 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 2 Shift at the Vault.
Scene: storm-glass night sky, cyan lightning diffused in clouds, rain haze, hospital and bank silhouettes in the far distance, faint heart-shaped light fragments.
Requirements: no foreground characters, no readable text, no logo, center should stay clean behind the player and portal.
Style: atmospheric painterly skybox panel, cool cyan and deep navy palette.
Output: 16:9 WebP.
```

### Chapter 3 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 3, Aceso's Light.
Mood: moonlit alleys, gold sparks, recovery, pursuit, fragile healing, trust in a strange power.
Visual motifs: warm gold healing motes, purple alley shadows, hidden hearts, subtle wings, soft magical trail through narrow city passages.
Composition: calm lower center for UI, luminous gold path leading toward the horizon, no readable text, no logos, no watermark.
Style: painterly cinematic game background, hopeful but tense, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 3 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 3 Aceso's Light.
Scene: deep purple moonlit alley skyline, warm gold sparks drifting upward, faint heart constellation, soft healing glow near horizon.
Requirements: no characters, no readable text, no logo, clean central area for 3D gameplay.
Style: atmospheric fantasy game sky panel, painterly, luminous gold and violet palette.
Output: 16:9 WebP.
```

### Chapter 4 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 4, Council of Warmth.
Mood: safehouse warmth, soft rain, recovery, team trust, brave affection, quiet green and gold magic.
Visual motifs: rain-lit windows, cozy safehouse glow, hidden hearts, subtle wing shapes in curtains or clouds, gentle mint healing motes.
Composition: calm lower center for UI, warm indoor light meeting cool rainy night, no readable text, no logos, no watermark.
Style: painterly cinematic game background, intimate and magical, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 4 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 4 Council of Warmth.
Scene: soft rain over a safehouse district, mint-green glow in mist, warm window lights, gentle heart-shaped bokeh in the distance.
Requirements: no characters, no readable text, no logo, subtle enough to sit behind gameplay.
Style: atmospheric fantasy game sky panel, cozy but still nighttime RPG.
Output: 16:9 WebP.
```

### Chapter 5 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 5, Cyclone's Snare.
Mood: ashfall, office fire, emergency pressure, trap closing, red storm energy, cliffhanger danger.
Visual motifs: ash and sparks, red-pink cyclone arcs, hospital emergency glow, hidden hearts fractured by shadow, subtle wings in smoke.
Composition: calm lower center for UI, intense horizon and edges, no readable text, no logos, no watermark.
Style: cinematic painterly game background, dramatic but readable, mobile-safe contrast.
Output: 16:9 WebP.
```

### Chapter 5 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 5 Cyclone's Snare.
Scene: ashfall over a dark city, red cyclone glow, smoky horizon, ember particles, faint broken-heart constellation.
Requirements: no foreground characters, no readable text, no logo, portal area should remain readable.
Style: atmospheric fantasy game sky panel, red/pink/orange against dark maroon night.
Output: 16:9 WebP.
```

### Portal Ring Texture

```text
Create a square transparent PNG magical portal texture for Hidden Hearts RPG.
Subject: luminous circular chapter gate ring with heart-shaped glyphs, wing-like arcs, tiny sparks, soft cyan/gold/rose edges, transparent center with faint vortex wisps.
Requirements: alpha background, no text, no logo, no characters, readable at small size, usable on a Three.js circle plane with additive glow.
Style: polished game VFX texture, magical, elegant, high contrast.
Output: square PNG with transparency.
```

### UI Panel Frame

```text
Create a transparent PNG UI frame overlay for a magical RPG HUD panel.
Subject: thin etched border, hidden-heart corner marks, subtle wing-feather linework, soft gold/cyan/rose glow, delicate runic accents that do not resemble readable text.
Requirements: transparent center, no words, no logo, not too busy, readable over dark glass panels, works at 16:9 and smaller panel crops.
Style: elegant fantasy RPG interface frame, refined and lightweight.
Output: PNG with alpha.
```

### Pickup Icon

```text
Create a square transparent PNG pickup icon for Hidden Hearts RPG.
Subject: small magical heart-shaped clue crystal, warm glow, tiny feather spark, polished collectible RPG item, cyan/gold/rose accents.
Requirements: transparent background, no text, no logo, readable at 64px, centered silhouette.
Style: bright game icon, valuable, magical, clean.
Output: square PNG with transparency.
```

### Enemy Sigil

```text
Create a square transparent PNG enemy sigil icon for Hidden Hearts RPG.
Subject: threatening shadow sigil made of jagged heart fragments and storm-like rings, dark violet core, red/pink hostile glow, sharp readable silhouette.
Requirements: transparent background, no text, no logo, no characters, readable at 64px, centered.
Style: dark fantasy RPG enemy emblem, dangerous but clean.
Output: square PNG with transparency.
```

### Finale Illustration

```text
Create a 16:9 cinematic Coming Soon finale illustration for Hidden Hearts RPG Chapter 6.
Mood: hopeful cliffhanger after danger, unresolved portal, night city, magical heart glow, subtle wings, the sense of a next mission forming.
Composition: leave center-left calm for overlay text and buttons, place the portal or cliff-edge energy on the right, no readable text, no logo, no watermark.
Style: emotional painterly fantasy RPG key art, polished, atmospheric, not too dark.
Output: 16:9 WebP.
```
