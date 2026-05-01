# Hidden Hearts RPG

A Vercel-hosted browser adaptation of Theo_innit's AO3 fanfic, **Hidden Hearts**.

The current production direction is a 2D retro story RPG focused on characters, dialogue, emotional pacing, choices, and chapter-based narrative progression. The old 3D RPG is no longer the production target.

The playable game scope is Chapter 1 only right now. Chapter 1 is stretched across six story parts so the current game architecture feels full without adding Chapters 2-6 before they are ready. Later builds can add Chapters 2-6 after this foundation holds.

Image generation will be part of the future 2D game asset pipeline, but all visual/image generation work is paused until further notice. Generated assets should only be created or integrated when that work is explicitly restarted.

Temporary visuals use a blocky, Minecraft-style placeholder direction until final 2D imagery is ready.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app is designed for Vercel static hosting with Vite.
