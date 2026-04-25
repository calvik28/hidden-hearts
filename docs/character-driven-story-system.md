# Character-Driven Story System

## Purpose

This document outlines how Hidden Hearts RPG can use `src/game/characters.js` as the foundation for the future 2D retro story RPG. This is planning only. Do not build the full story engine yet.

Image generation will be part of the future 2D story RPG asset pipeline, but it is paused until further notice. Character, dialogue, and scene structure should come before new generated art.

## Character Data And Chapters

Each character entry should identify where the character first appears, which chapters they matter to, and what their story function is. Chapter scene files can later reference character IDs instead of repeating names and descriptions.

Example future use:

```js
{
  id: "chapter-04-safehouse",
  chapterId: 4,
  locationId: "pearls-safehouse",
  participants: ["grian", "scar", "pearl", "gem"],
}
```

The existing `levels.js` chapter data can remain useful for chapter IDs, titles, AO3 links, and broad progression metadata.

## Dialogue Scenes

Future dialogue scenes should reference characters by stable IDs from `characters.js`. This keeps dialogue, portraits, relationship checks, and character metadata connected to one source of truth.

Example future dialogue beat:

```js
{
  speakerId: "scar",
  text: "TODO: Dialogue from the future script.",
  mood: "gentle",
  requiredFlags: [],
}
```

The dialogue system should avoid embedding final lore before the user provides the character bible.

## Relationships And Choices

`CHARACTER_RELATIONSHIPS` can describe connections between characters without hardcoding them into individual scenes. Later, choices can read or update relationship-style variables such as trust, courage, honesty, fear, or resolve.

Relationship data can affect:

- Available dialogue options
- How a character responds to the player
- Whether a comfort, confrontation, or confession choice appears
- Chapter completion flavor text
- Optional emotional scenes

The first implementation should keep these effects light and readable.

## Character Arcs

Each character entry has an `arc` field for tracking the emotional shape of the story. Future scene files can mark arc beats by ID, while `storyFlags.js` can store which beats have happened.

Possible arc tracking fields:

- `startingPoint`
- `pressure`
- `turningPoints`
- `chapterBeats`
- `endingPoint`
- `unresolvedQuestions`

The important rule is that the character bible should drive the scene writing, not the other way around.

## Chapter Scenes

Chapter scenes are now the production path and can remain separate from the old 3D level data. A scene file might define:

- Chapter title card
- Opening narration
- Background or location ID
- Characters present
- Dialogue sequence
- Hotspots
- Choices
- Clues gained
- Story flags changed
- Completion requirements

This lets the game move toward a chapter-based interactive narrative while preserving current progress and vault systems.

## Recommended Future Files

- `src/game/characters.js` - character bible and relationship data
- `src/game/storyScenes.js` - chapter scene definitions
- `src/game/dialogue.js` - reusable dialogue sequences or dialogue helpers
- `src/game/storyFlags.js` - story progression flags and default state
- `src/game/storyMode/StoryScene.jsx` - main 2D scene renderer
- `src/game/storyMode/DialogueBox.jsx` - speaker name, text, portrait, and advance controls
- `src/game/storyMode/ChoicePanel.jsx` - player choice rendering and callbacks

These files should be added incrementally. Chapter 1 now has the first tiny playable prototype; future work should extend that foundation.

## Constraints

- Do not change vault answers.
- Do not rename `localStorage` keys.
- Treat the old 3D scene as legacy code unless the user explicitly asks to return to it.
- Do not invent character lore. Use TODO placeholders until the user provides the character bible.
- Do not generate visual assets unless the paused 2D image pipeline is explicitly restarted.
