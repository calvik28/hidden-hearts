# Generated Asset Prompts

Status: paused until further notice.

This is a legacy visual prompt document. It is not a story source of truth, and it is not the final 2D story RPG image pipeline. Several prompts use old game-mood language and should not be treated as canon unless checked against the AO3 text or Leah's future character bible. Do not generate new images from this document unless visual work is explicitly restarted.

The future 2D story RPG will have its own image-generation pipeline for chapter backgrounds, portraits, UI, and story assets. That pipeline is currently paused until further notice.

Temporary production visuals should use CSS/procedural blocky Minecraft-style placeholders until final image generation resumes.

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
Create a 16:9 fantasy RPG chapter background for Chapter 1.
Mood: restaurant robbery, smoke from Tekbox burning the restaurant, apartment healing, hero patrol, hidden hero identity, warm orange danger against deep blue shadows.
Visual motifs: hidden hearts, wings, city skyline, restaurant fire aftermath, apartment warmth, night patrol.
Composition: calm lower center for gameplay UI, stronger detail around edges and horizon, no readable text, no logos, no watermark.
Style: painterly cinematic game background, magical but grounded, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 1 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 1.
Scene: nighttime city skyline after the restaurant fire, warm orange glow near the horizon, clean dark sky for patrol flight.
Requirements: no foreground characters, no readable text, no logo, horizon readable behind 3D objects, dark upper sky.
Style: atmospheric painterly skybox panel, soft depth, web game asset.
Output: 16:9 WebP.
```

### Chapter 2 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 2.
Mood: unexpected ICU shift, hospital pressure, bank heist, Moonlight's attack, Aceso disappearing, emotional urgency.
Visual motifs: hospital halls, bank shadows, medical-blue glow, hidden hearts, wings, city pavement, distant hospital silhouette.
Composition: calm lower center for UI, strong cyan horizon, no readable text, no logos, no watermark.
Style: cinematic painterly game background, tense but clear, mobile-readable.
Output: 16:9 WebP.
```

### Chapter 2 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 2.
Scene: night sky over the city, with hospital and bank silhouettes in the far distance.
Requirements: no foreground characters, no readable text, no logo, center should stay clean behind the player.
Style: atmospheric painterly skybox panel, cool cyan and deep navy palette.
Output: 16:9 WebP.
```

### Chapter 3 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 3.
Mood: recovery, planning, rooftops, following Lucid and Zero, abandoned building rescue, Solo saving Aceso.
Visual motifs: city rooftops, abandoned building, hidden hearts, wings, yellow healing glow from Solo, green healing sparks from Gem.
Composition: calm lower center for UI, luminous gold path leading toward the horizon, no readable text, no logos, no watermark.
Style: painterly cinematic game background, hopeful but tense, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 3 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 3.
Scene: quiet nighttime city skyline seen from rooftops while the heroes search for Gem.
Requirements: no characters, no readable text, no logo, clean central area for 3D gameplay.
Style: atmospheric fantasy game sky panel, painterly, luminous gold and violet palette.
Output: 16:9 WebP.
```

### Chapter 4 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 4.
Mood: Gem recovering at Pearl's house, tomato soup, a hero meeting at Jimmy's house, Grian alone at the bar, and the confession with Scar at the apartment.
Visual motifs: Pearl's house, tomato soup, popcorn at Jimmy's house, streetlights, bar glow, apartment warmth, hidden hearts.
Composition: calm lower center for UI, warm indoor light meeting cool rainy night, no readable text, no logos, no watermark.
Style: painterly cinematic game background, intimate and magical, readable on mobile.
Output: 16:9 WebP.
```

### Chapter 4 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 4.
Scene: quiet city night with streetlights, apartment windows, and a warm bar glow in the distance.
Requirements: no characters, no readable text, no logo, subtle enough to sit behind gameplay.
Style: atmospheric fantasy game sky panel, cozy but still nighttime RPG.
Output: 16:9 WebP.
```

### Chapter 5 Background

```text
Create a 16:9 fantasy RPG chapter background for Chapter 5.
Mood: office fire, ER burn victims, patrol attack, arrow wound, Lucid hallucination, villains' headquarters, Cyclone's vines, cliffhanger danger.
Visual motifs: hospital emergency glow, office fire aftermath, Clockers Cafe rooftop, alley shadows, thorn vines, hidden hearts, injured wings.
Composition: calm lower center for UI, intense horizon and edges, no readable text, no logos, no watermark.
Style: cinematic painterly game background, dramatic but readable, mobile-safe contrast.
Output: 16:9 WebP.
```

### Chapter 5 Sky Panel

```text
Create a 16:9 distant sky panel for a Three.js RPG level, Chapter 5.
Scene: dark city sky over the office fire area and Clockers Cafe, with smoke near the horizon.
Requirements: no foreground characters, no readable text, no logo, central gameplay area should remain readable.
Style: atmospheric fantasy game sky panel, red/pink/orange against dark maroon night.
Output: 16:9 WebP.
```

### Portal Ring Texture

```text
Create a square transparent PNG magical portal texture for Hidden Hearts RPG.
Subject: luminous circular level-completion ring with heart-shaped glyphs, wing-like arcs, tiny sparks, soft cyan/gold/rose edges, transparent center with faint vortex wisps.
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
