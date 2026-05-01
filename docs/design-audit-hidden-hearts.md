# Hidden Hearts Design Audit

## Executive Summary

Hidden Hearts is currently a playable 2D narrative prototype, not a 3D game. The current production path is a vault-gated Chapter 1 story reader built in React/Vite: the player answers three fic-knowledge questions, enters an 18-scene Chapter 1 sequence, chooses one of three emotional responses per scene, watches four emotional stats increase, and reaches a Chapter 1 completion screen. It runs, it is coherent, and it already has a real tone: secret identities, care after danger, domestic warmth, and the cost of Grian's divided life.

The blunt verdict: the game has found the right direction, but not yet the right play shape. It feels more like a strong annotated story deck than a 2D RPG. The writing and structure are worth preserving, especially the Chapter 1-only focus and emotional stat framing, but the choices are mostly expressive clicks with no visible consequence beyond numbers. The next design work should not be a full redesign. It should deepen the existing Chapter 1 loop with small, source-bound interactions: dialogue beats, inspectable objects, flags, relationship callbacks, and scene payoffs that make the player's chosen emotional path visible.

## What the Game Currently Is

Based on the repository and local build, the current game is a static React/Vite frontend with one main app shell in `src/App.jsx`. There is no route system, backend, database, server runtime, or 3D production path in the mounted app. `src/main.jsx` renders `App`, and `App` conditionally renders either the vault entrance or the 2D story prototype.

The live flow is:

1. Vault entrance with generated background art and a blocky vault door.
2. Three Chapter 1 quiz questions from `vaultQuestions` in `src/game/levels.js`.
3. A story shell with six Chapter 1 part nodes.
4. An 18-scene Chapter 1 sequence from `src/game/storyScenes.js`.
5. Each scene displays location, time, mood, title, narration, a focus note, three choices, a cast sidebar, and the current emotional stats.
6. Choosing an option logs a result, shows point gains, then the player continues to the next scene.
7. Completion shows the top two stats as the "Main emotional path" and offers feedback, replay, and AO3 source actions.

The content shape is clear in `src/game/storyScenes.js`: six parts, 18 scenes, 54 choices, and four stats: Trust, Courage, Secrecy, and Tenderness. The six parts are Restaurant Crisis, Healed But Hiding, Roommate Dinner, Ordinary Day, Hero Shift, and Bar Night.

Character support exists in `src/game/characters.js`: 17 character entries, 11 relationship records, stable IDs, source notes, arc fields, dialogue-style fields, and many TODO placeholders where future character-bible detail is not known. In the current UI, those data mostly appear as short cast cards in the right column.

Legacy 3D code still exists in `src/game/HiddenHeartsScene.jsx` and old chapter/level data still exists in `src/game/levels.js`, but the current `App.jsx` does not import or render the Three.js scene. It imports `vaultQuestions` and AO3 links from `levels.js`, then uses `chapterOneStory` for actual play.

I found no implemented inventory, clue, hotspot, memory, branching flag, dialogue-sequence, or location-navigation system in `src/`. Those ideas appear in planning docs, especially `docs/2d-story-rpg-redesign.md` and `docs/character-driven-story-system.md`, but they are not yet production mechanics.

Uncertain: I did not independently compare every playable beat against the AO3 chapter text. This audit treats the repository's current data and planning docs as the inspected source. Source fidelity beyond those files should be verified separately against AO3 or T-i's character bible.

## What Works

- The 2D pivot is real in the player-facing app. The live game uses a vault screen, story panels, pixel skyline, chapter rail, stat cards, choices, and cast cards. It does not route the player into the legacy Three.js build.
- The vault entrance is the strongest first impression. The generated title background, blocky vault door, dials, quiz answers, retry state, and "Chapter details matter here" warning create a specific ritual instead of a generic start button.
- Chapter 1-only scope is healthy. The game does not rush into Chapters 2-6. Stretching Chapter 1 across six parts gives the day a playable arc: restaurant danger, healing, dinner, work, patrol, and the bar night.
- The emotional stat set is well chosen. Trust, Courage, Secrecy, and Tenderness map directly to the story's central tension: Grian wants closeness and safety while protecting Astraeus.
- The best scene writing has a clear emotional lens. "Smoke In His Nose", "Before They Go", "Dinner For Scar", "The Alert", and "Carry Me?" all understand that the interesting action is not just danger, but what Grian does with care, fear, exhaustion, and secrecy afterward.
- The cast sidebar helps orientation. It uses stable character IDs from `characters.js`, which is exactly the right foundation for a later character-driven story system.
- The completion screen gives a readable emotional summary. "Main emotional path: Tenderness + Trust" is simple, but it proves the prototype can frame a run as a character read instead of a score attack.
- Local storage access is guarded in `safeReadJson`, `safeWriteJson`, `readVaultOpen`, and `writeVaultOpen`, so restricted/private storage modes are less likely to crash the app.
- The feedback panel is practical for the project phase. Saving local feedback and generating a GitHub issue body from the current scene, choice path, and stats is useful for an author/designer review loop.
- Desktop readability is generally strong. The main scene card, stat sidebar, and cast sidebar are legible in the local browser screenshots, with no horizontal overflow detected in the automated pass.

## What Does Not Work

- The choices do not yet create meaningful consequence. In `chooseOption`, a choice only adds stats and appends to a choice log. No later scene text, available option, cast reaction, ending copy, or part summary changes based on those stats. The player can feel the intent, but not the consequence.
- The current loop is too uniform. Every scene uses the same pattern: read title/narration/focus, pick one of three cards, read a result, gain points, continue. Across 18 scenes, the rhythm becomes predictable before the emotional arc is finished.
- The "focus" box often exposes design notes instead of in-world experience. Lines like "This scene establishes..." and "This beat slows..." are useful for designers, but as player-facing text they make the game feel like an annotated outline. The same design intent should become narration, dialogue, memory, or object text.
- The game tells the player the emotional meaning too directly. Point events repeatedly explain why Trust, Courage, Secrecy, or Tenderness matter. This is good debug feedback, but it blunts discovery when every choice is immediately translated into thesis language.
- There is almost no scene-level interaction beyond choices. No objects can be inspected, no dialogue can be advanced by speaker, no locations can be explored, no clue or memory can be collected, and no character can be directly addressed.
- The player role is underdefined. The player appears to guide Grian's emotional framing, but the UI never clearly says whether the player is Grian, a reader opening a hidden story file, or an outside archivist steering chapter emphasis.
- The cast cards are informative but not dramatic. They identify characters, yet they do not change by scene context, mood, relationship, or recent choice. A character present in a crisis and a character present in a cozy scene get the same kind of encyclopedia card.
- Story progress during a run is not persisted. `hidden-hearts-progress` stores chapter-level completion data, but `story` itself is normal React state from `createStoryProgress()`. A reload with `?resume=story` reopens the story mode, not the exact scene or current choice path.
- The visible "Previous" button is still marked by code as `SHOW_PREVIOUS_BUTTON_FOR_TESTING`. It is useful for QA, but it reads like production navigation despite being named as a testing affordance.
- The stats can become lopsided without meaningful tradeoff. In the automated playthrough, always picking the first option produced high Tenderness and Trust, but the run still reached the same completion structure. A stat path should eventually open or color something, not only accumulate.
- The mobile layout is readable but long. A full mobile screenshot of the first scene is roughly 4850 pixels tall before the page ends. The main scene appears first, then chapter/stat summary, then cast. This is usable, but it is more scroll-heavy than a tight handheld RPG/readable VN layout.
- The feedback modal's choice path becomes too dense on mobile after a full playthrough. It is useful debug data, but it overwhelms the suggestion form and should be collapsed or summarized for small screens.
- The repo still has design mismatch residue. `generatedAssets.js` references many future chapter assets that do not exist in `public/assets/generated/`, and `levels.js` still contains old level/combat-style chapter data. The current app avoids rendering most of this, but future agents could easily mistake it for active design.

## Current Core Loop

As implemented, the loop is:

1. Answer a Chapter 1 vault question.
2. Repeat until the vault opens.
3. Read a static scene card.
4. Pick one of three emotional/tactical choices.
5. Read the logged choice result.
6. Receive stat points.
7. Continue to the next scene.
8. Repeat for 18 scenes.
9. See a completion screen with the top two stats.

This loop is clear and functional. It is also thin. It asks the player to keep clicking because the prose is pleasant and the story matters, not because the game state produces curiosity, friction, surprise, or visible consequence.

## Recommended Core Loop

Keep the current foundation, but evolve each Chapter 1 part into a slightly richer story RPG loop:

1. Enter a Chapter 1 part.
2. See a location title, cast, and immediate story goal.
3. Read short speaker-led dialogue or narration.
4. Inspect one or two scene-specific objects, memories, or details.
5. Make an emotional/tactical choice.
6. Update stats, relationships, and one or two named story flags.
7. Show a visible callback in the same part or a later part.
8. End the part with a small emotional summary or changed character response.

The point is not to add heavy systems. The point is to make each click feel like it changed how Grian carried the moment. For example, a "Stay visibly civilian" choice in the restaurant could make Scar's later concern easier to deflect but make Grian's private anxiety sharper. A "Thank Gem properly" choice could alter Gem's next cast note or unlock a warmer line before she leaves. A "Think of Mumbo too" choice could make the hospital locker room scene carry a different secret-identity pressure.

## Narrative and Character Assessment

The narrative hook is strong but currently front-loaded through metadata. The vault says this is a Chapter 1 prototype and requires Chapter 1 receipts, which is charming for fans and a good protective frame for an adaptation. Once inside, the first playable scene immediately gives public danger, known villains, and secret identity pressure. That is the right opening material.

Grian is the strongest current character because every system points at his split life. The stats, scene titles, choices, and part structure all reinforce him as an overextended nurse/hero/roommate trying to protect people without being fully known.

Scar works as an emotional destination, especially in the dinner and walk-home scenes. The domestic material is the best evidence that the game understands why quiet scenes matter. "Scar feels like home" is a clear chapter-close thesis, and it is worth building toward.

Gem and Jimmy function well as care-and-banter supports, but the current UI does not let them speak as much as it lets the narration summarize them. Their roles are emotionally clear in the data, but the game would benefit from short direct dialogue beats.

Mumbo is positioned correctly as future secret-identity pressure. The "Nine Hours Waiting" scene gives him space in Chapter 1, but it still feels like setup text more than a relationship encounter.

The villains are currently pressure labels more than memorable interactive presences. Tekbox and Ethical are named, and the action is legible, but because the current game avoids dialogue/action systems, the player does not yet feel their personalities through play.

The writing is readable and often emotionally specific. Its biggest weakness is that too much text is explanatory rather than embodied. The scene "focus" text and point-event notes should eventually move behind the curtain or become diegetic. Let players infer the design thesis through dialogue, sensory detail, and consequences.

Emotional payoff exists, but it is soft. The final walk home and completion screen land the Tenderness/Trust path, but because all paths currently reach the same ending structure, the payoff reads as a summary of clicked themes rather than a culmination of player-shaped moments.

Replay value is currently low. There are 54 choices, but without branching, unlocked text, different scene order, altered character reactions, or stat-specific endings, replay mostly means reading alternate result blurbs.

## UI / UX Assessment

The app is visually coherent. The rectangular pixel panels, heavy borders, dark city backdrop, vault door, green stat numbers, and cyan location tags establish a retro magical interface. It feels much closer to the intended 2D RPG direction than to the legacy 3D game.

The opening vault UX is strong. It has a clear question, visible dials, randomized answer order, a wrong-answer lockout, retry action, and AO3/source access. It immediately communicates that this game is for people who care about the fic.

The main story UI is readable on desktop. The three-column layout gives the player a chapter/status panel, a main story panel, and a cast panel. The location/time tags and part rail help orientation.

The top-right icon buttons are compact, but without hover tooltips visible in screenshots they depend on browser title/ARIA behavior. They are technically labeled, but visually a new player may not know book/comment/share at a glance.

The chapter rail communicates six parts, but the numbered nodes are not interactive. That is acceptable for locked linear progression, but the UI looks like a navigation rail. If it remains non-clickable, it should feel more like progress than a menu.

The choice cards are clear and easy to click. They also look mechanically equivalent every time. The UI does not distinguish "emotion choice", "action choice", "memory choice", "dialogue choice", or "risk choice", so player intent collapses into stat shopping.

The stat panel is understandable, but the game does not explain whether stats are virtues, tones, relationship meters, or route variables. Since the stats have no visible consequence yet, players may read them as decorative.

The completion UI is concise and useful. The "Main emotional path" summary is the right idea, but it should eventually produce route-specific text, not only a top-stat label.

Mobile is functional and has no horizontal overflow in the inspected state, but it is scroll-heavy. The first mobile story state stacks the entire main scene, then chapter status, then cast. That prioritizes the current scene, which is good, but a player loses persistent access to stats/cast without a lot of scrolling.

The feedback panel is a good internal tool. For a public player experience, "Send T-i Feedback" and a default name of "T-i" make the UI feel like an author review console rather than an in-world or fan-facing feature.

The local browser run showed no Vite error overlay and no runtime crash. The only browser warning observed was a deprecated Apple mobile web app meta tag warning from the page metadata, not a game-breaking issue.

## 2D RPG Direction Assessment

The current implementation supports the 2D direction at the presentation level. It has a deliberate 2D interface, readable panels, pixel-art-inspired city atmosphere, chapter progression, emotional stats, source-backed characters, and a story-first structure. It is not accidentally a 3D game.

It does not yet fully feel like a 90s-inspired RPG or narrative adventure. It lacks exploration verbs, dialogue boxes, inspectable locations, character portraits with expressions, inventory/clue/memory affordances, flags, route callbacks, and per-part objectives. It is closer to a visual story prototype with RPG-flavored stat feedback.

The locations are not yet interesting enough without traversal because they are mostly labels plus prose. "Restaurant Back Hall", "Apartment Floor", "Small Kitchen", "Hospital Locker Room", and "The Bar" could carry the whole 2D game if each had a few inspectable details and a stronger visual/interaction identity. Right now they change the header more than they change the play.

The characters are memorable in the data and writing, but not yet in the interface. Initial-letter portrait tokens are good placeholders, but they do not carry mood, pose, relationship, or scene-specific emotion. This is acceptable while image generation is paused, but the UI should still prepare for richer portrait states later.

The game has enough emotional material to work without movement or graphics. The missing depth is not art. It is statefulness: callbacks, dialogue variation, flags, inspectable memories, and small consequences.

The progression system is a promising skeleton. Six parts and four stats are enough for Chapter 1. The system needs local story persistence, part-level payoffs, and at least a few stat/choice-dependent text changes before it feels satisfying.

## Priority Fixes

### Immediate fixes

- Hide, rename, or intentionally frame the testing "Previous" button before treating this as a polished player build.
- Convert player-facing `scene.focus` text from design notes into in-world prose, private thought, or an optional "Story Lens" debug layer.
- Add visible consequence to at least three existing choices inside Chapter 1. Start with one restaurant choice, one Gem/Jimmy care choice, and one Scar/domestic choice.
- Persist current `story.sceneIndex`, `story.choices`, `story.stats`, and `story.complete` in localStorage, while preserving the existing key names.
- Collapse or summarize the feedback choice path on mobile.
- Clarify the player's role in one sentence near the start: guiding Grian's emotional path, reading a hidden story file, or playing as Grian.

### Medium-sized improvements

- Add a lightweight dialogue renderer using existing character IDs, with speaker name, portrait token, line text, and continue action.
- Add scene flags for selected choices and use those flags in later narration/result copy.
- Add one inspectable object or memory per Chapter 1 part, such as smoke, medical supplies, pasta, group chat, hero alert, or bar game.
- Give each Chapter 1 part a small end beat that reflects the dominant stat or a key prior choice.
- Upgrade cast cards into scene-aware character cards with current mood, relationship pressure, or recent choice reaction.
- Make the chapter rail either interactive after completion or visually more clearly a progress meter.
- Separate internal author feedback UI from player-facing feedback copy.

### Later improvements

- Add placeholder portrait states before final art: neutral, worried, teasing, hurt, focused, warm.
- Add relationship-specific variables once the character bible is deeper.
- Add optional codex/memory entries unlocked through play.
- Add route-flavored Chapter 1 endings that are still canon-safe: Trust/Tenderness, Secrecy/Courage, Courage/Trust, Secrecy/Tenderness.
- Build a small location scene system with hotspots and dialogue before adding Chapters 2-6.
- Reconcile or quarantine legacy `levels.js` and `generatedAssets.js` entries so future work does not mistake old 3D/asset plans for active game design.

## Keep / Cut / Rework

| Keep | Cut | Rework |
| --- | --- | --- |
| Vault entrance and Chapter 1 quiz ritual | Player-facing design-note phrasing in scene focus boxes | Choice system so options affect later text, flags, or reactions |
| Chapter 1-only scope across six parts | Any pressure to add playable Chapters 2-6 before Chapter 1 has depth | Point-event explanations into subtler feedback or optional debug |
| Trust, Courage, Secrecy, Tenderness as emotional axes | Treating legacy 3D level/combat data as production direction | Cast cards into scene-aware character presence |
| Source-backed character IDs and character bible structure | Generic combat/objective language from old level data in future story work | Chapter rail from menu-like nodes into clearer progress or navigation |
| AO3 source link and fic-receipt framing | Asset generation as a default next step | Mobile feedback choice-path display |
| Pixel-panel 2D interface and magical vault tone | Public reliance on testing-only controls | Story persistence beyond chapter-complete progress |
| Feedback capture as an internal production tool | Nonexistent future asset references as active planning signals | Locations from labels into inspectable story spaces |

## Recommended Next Implementation Tasks

1. Add story-run persistence for scene index, choices, stats, and completion using a guarded localStorage helper and a new storage shape under the existing progress model.
2. Replace or hide `SHOW_PREVIOUS_BUTTON_FOR_TESTING` in production-facing UI, or relabel it as a deliberate "Back" control if it is meant to stay.
3. Rewrite `scene.focus` rendering so the current text is not shown as player-facing narration by default. Keep the data for designer reference if useful.
4. Add a minimal story flag system to `storyScenes.js` choices, such as `setsFlag`, and store selected flags in story progress.
5. Add three concrete callbacks using existing scenes: restaurant choice affects "Smoke In His Nose", Gem/Jimmy choice affects "Before They Go", and Scar dinner choice affects "Dinner For Scar" or "Carry Me?".
6. Add one inspectable detail to Part 1 only as a prototype, using existing UI style: smoke, exit, table, villain voices, or Jimmy's reaction.
7. Add a small dialogue component for one scene, probably "Key In The Door", using `speakerId` values from `characters.js`.
8. Add scene-aware cast card subtitles for the current scene, without new art.
9. Make completion text vary by top stat pair with 3-4 source-safe variants.
10. Collapse feedback context into a details/summary block on mobile and full playthroughs.

## AGENTS.md Recommendations

- Treat `src/game/storyScenes.js` as the active playable story surface and `src/game/characters.js` as the character/source data foundation.
- When adding Chapter 1 interactions, every new choice should either set a flag, alter a later line, change a character response, unlock an inspectable detail, or affect completion flavor. Avoid stat-only choices unless explicitly requested.
- Keep `scene.focus` or similar design-intent notes out of player-facing UI unless the user explicitly wants an annotated prototype mode.
- Do not add Chapters 2-6 as playable content until Chapter 1 has at least one implemented example each of dialogue, inspectable detail, flag callback, and stat-flavored completion.
- Prefer small source-bound callbacks over new lore. If a consequence cannot be verified from the fic or T-i's notes, mark it as TODO rather than inventing it.
- Before visual asset work resumes, prioritize story-state persistence, dialogue structure, scene flags, and location interaction scaffolding.
- Treat feedback/GitHub issue tools as internal production UI. If the build is intended for general players, keep author-facing language separated from in-world or player-facing copy.
