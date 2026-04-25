# Hidden Hearts 2D Story RPG Redesign

## Status

Hidden Hearts RPG has pivoted away from further 3D expansion and toward a richer character-driven 2D story RPG. Production should now move forward from the 2D story prototype rather than the old 3D build.

Image generation will be part of the future 2D story RPG asset pipeline, but visual and image-generation work is paused until further notice. Do not generate new images, call the OpenAI API, or continue any visual asset pipeline unless that work is explicitly restarted.

## Why Pivot Away From 3D

- The current 3D RPG direction is too costly to make feel good at the quality bar the story deserves.
- The existing 3D gameplay does not serve the emotional material well enough.
- Weak procedural 3D spaces, shallow combat, and movement-first play risk making the story feel smaller instead of deeper.
- The likely players for this project care most about reading, characters, emotional progression, and memorable chapter moments.
- A 2D story RPG format better supports the source material because it can foreground narration, dialogue, character choices, and chapter pacing.

## New Target Format

The future version should feel like a retro-inspired 2D story RPG: a 90s floppy-disk-era fantasy/adventure narrative game with chapter-based interactive storytelling.

The target blend is:

- Visual novel
- RPG-lite
- Storybook adventure
- Retro PC fantasy interface
- Character-driven chapter drama

It should not be designed as a real-time 3D action game.

## Core Experience

The player should move through a clear story loop:

1. Enter through the vault.
2. Unlock chapters.
3. Read atmospheric story scenes.
4. Interact with characters.
5. Inspect clues and story objects.
6. Make light choices.
7. Progress through chapter scenes.
8. Reach emotional chapter climaxes.
9. Unlock the next chapter.

The game should feel like opening a hidden story file, stepping into a chapter, and carrying the characters through choices that matter emotionally even when the mechanics stay light.

## What Should Remain

Preserve these pieces from the current game:

- Vault entrance
- Chapter 1 quiz unlock
- Chapter progression
- `localStorage` persistence
- AO3 linkout
- Chapter 6 Coming Soon finale
- Generated asset pipeline for later possible use, including a future 2D image pipeline
- Existing generated assets
- Chapter data structure where useful

The old 3D scene can remain as legacy code for reference, but it is no longer the production gameplay path.

## Future Migration Targets

These are legacy systems, not the production target:

- Full 3D exploration
- Real-time combat as the core gameplay
- Empty 3D arena structure
- Weak procedural 3D environments
- Movement-first gameplay loop

Do not route new production work through these systems unless explicitly asked.

## Future Gameplay Model

The future 2D story RPG can be built around:

- Story scenes
- Dialogue boxes
- Character portraits
- Background illustrations
- Clickable hotspots
- Inventory or clue collection
- Relationship, trust, courage, or similar story variables
- Light choice-based conflict
- Optional turn-based or scripted confrontation scenes

Conflict should become more story-shaped than reflex-shaped. A confrontation can be a dialogue exchange, a scripted decision sequence, a clue check, a trust moment, or a small turn-based scene if the chapter calls for it.

## Suggested Chapter Structure

Each chapter should be able to follow this structure:

1. Chapter title card
2. Opening narration
3. Location scene
4. Character interaction
5. Clue or emotional decision
6. Conflict or tension scene
7. Resolution
8. Chapter complete screen

The structure should stay flexible. Some chapters may need more quiet conversation, some may need an investigation beat, and some may need a cliffhanger.

## Future Visual Direction

The eventual visual language should lean toward:

- Retro PC fantasy adventure presentation
- Illustrated 2D backgrounds
- Dialogue portraits
- Framed UI panels
- 90s RPG/storybook interface details
- Later generated 2D story assets where they help the story

Visual generation is paused until further notice. The next work should prepare the story data, character bible, scene structure, and interaction model before any new art is created.

Temporary visuals should use a blocky Minecraft-style placeholder direction until final 2D story imagery is ready.
