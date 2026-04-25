# AGENTS.md - Hidden Hearts RPG

## Project

Hidden Hearts RPG is a browser-based adaptation of Leah's fanfic Hidden Hearts, published under the author codename Theo_innit.

The current production direction is a richer 2D retro story RPG focused on characters, dialogue, emotional pacing, and chapter-based narrative progression.

Treat the old 3D scene as legacy code, not production gameplay. Do not keep making the 3D game more complex unless the user explicitly asks.

Repository:
calvik28/hidden-hearts

Local path:
`/Users/louieprocopio/Desktop/codex/hidden-hearts`

Production:
https://hidden-hearts.vercel.app

Tech:
React, Vite, Three.js, lucide-react, npm, Vercel static deployment.

Architecture:
Static frontend only. No backend, database, or server runtime. Persistence is localStorage only.

## Key files

Start here before broad repo inspection:

- `src/App.jsx` — app shell, vault flow, 2D story prototype, feedback channel
- `src/game/storyScenes.js` — source-backed 2D story prototype scene data
- `src/game/HiddenHeartsScene.jsx` — legacy Three.js scene engine
- `src/game/levels.js` — chapter links, vault questions, and legacy level/chapter data
- `src/game/characters.js` — character bible/data source for the 2D story RPG pivot
- `src/game/generatedAssets.js` — generated asset manifest
- `src/styles.css` — global styling
- `docs/2d-story-rpg-redesign.md` — strategic redesign notes
- `docs/character-driven-story-system.md` — planning notes for character-driven story data
- `docs/generated-asset-prompts.md` — asset prompt manifest
- `docs/visual-asset-pipeline.md` — asset workflow notes
- `package.json` — scripts/dependencies
- `scripts/` — asset generation scripts

## Current strategy

The priority is now the 2D retro story RPG foundation:

- Storytelling
- Character depth
- Emotional pacing
- Dialogue
- Chapter scenes
- Choices and interactions
- Character data and story structure

Future gameplay should move toward a visual novel + RPG-lite + storybook adventure format, not a real-time 3D action game.

## Do not break

Preserve the current production flow:

Vault entrance → Chapter 1 quiz → 2D story RPG prototype → future chapter prototypes.

Do not change these vault answers unless explicitly asked:

- Villains at the restaurant: `Tekbox and Ethical`
- Who heals Grian: `Gem`
- What Grian cooks for Scar: `Pasta`

Do not rename these localStorage keys:

- `hidden-hearts-vault-open`
- `hidden-hearts-progress`

Guard localStorage access so restricted/private browser modes do not crash the app.

## Story and lore guidance

- The AO3 work text is the source of truth for existing story facts.
- Do not treat old game labels, generated-asset prompts, or placeholder combat labels as canon.
- Remove or neutralize game-only lore claims when they are not supported by the fic.
- Use `src/game/characters.js` as the future character bible/data source.
- Avoid inventing lore, relationships, secrets, or character arcs that the user has not provided.
- Use obvious TODO placeholders for character details that still need the user's deeper character file.
- Keep character IDs stable once introduced.
- Aceso is Gem's hero identity, not a separate character, unless Leah later says otherwise.
- Prefer chapter/story planning documents before broad app rewrites.
- Do not build the full 2D story engine until explicitly asked.

## Generated assets

Integrated generated assets:

- `public/assets/generated/ui/title-entrance-background.png`
- `public/assets/generated/textures/vault-door-runes.png`

Image generation will be part of the future 2D story RPG asset pipeline, but visual and image generation is paused until further notice. Do not generate images, call the OpenAI API, or continue any visual asset pipeline by default.

Preserve the existing generated assets and manifest for later possible use. Do not delete them during the 2D story RPG pivot.

Use truthful extensions. If bytes are PNG, save/reference `.png`.

Known good recent commits:

- `5150f5a Add visual asset pipeline and title background`
- `e467d26 Add generated vault door texture`

## API and asset safety

The project may use local OpenAI image generation scripts only after the paused 2D image pipeline is explicitly restarted.

Rules:

- Read `OPENAI_API_KEY` only from the local environment.
- Never print, expose, hardcode, or commit the key.
- Never ask the user to paste the key into chat.
- Do not commit `.env`.
- Use the existing repo script/manifest conventions.
- Current default image model: `gpt-image-2`.
- Prefer PNG output unless another format is explicitly requested and verified.
- Generate and integrate one asset at a time.
- Generated images should not contain readable text, logos, or baked-in UI labels. Render text with HTML/CSS.
- Preserve procedural/CSS placeholders when adding generated assets.

There is no active next asset order while visual generation is paused until further notice.

## Editing guidance

Keep changes incremental.

For story/character tasks, prefer docs and data schema work first. Do not change gameplay logic, App flow, vault answers, localStorage keys, AO3 links, or deployment architecture unless explicitly asked.

For asset tasks, do not change gameplay logic, movement, combat, level completion, vault answers, localStorage keys, AO3 links, or deployment architecture unless explicitly asked.

For legacy Three.js changes, preserve mobile/desktop controls, fullscreen canvas behavior, fallbacks, and performance. Do not route production back through 3D unless explicitly asked.

For UI/CSS changes, preserve readability, responsiveness, and the magical vault / Hidden Hearts RPG tone. Temporary production visuals should use a blocky Minecraft-style placeholder direction until final 2D imagery is ready.

## Validation

Run `npm run build` after code, script, dependency, import, or asset integration changes.

Documentation-only edits do not require a build.

## Git/deploy

Do not commit, push, or deploy unless explicitly asked.

Before any requested commit, show:

- `git status --short`
- `git diff --cached --stat`
