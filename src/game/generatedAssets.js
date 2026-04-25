const generatedBase = "/assets/generated";

export const generatedAssets = {
  ui: {
    titleEntranceBackground: `${generatedBase}/ui/title-entrance-background.png`,
    vaultDoorTexture: `${generatedBase}/textures/vault-door-runes.png`,
    uiFrameTexture: `${generatedBase}/ui/ui-panel-frame.png`,
    finaleIllustration: `${generatedBase}/chapters/chapter-06-coming-soon.webp`,
  },
  textures: {
    portalRing: `${generatedBase}/textures/portal-heart-ring.png`,
    pickupIcon: `${generatedBase}/icons/pickup-heart-clue.png`,
    enemySigil: `${generatedBase}/icons/enemy-shadow-sigil.png`,
  },
  chapters: {
    1: {
      background: `${generatedBase}/chapters/chapter-01-smoke-and-secrets.webp`,
      skyPanel: `${generatedBase}/chapters/chapter-01-smoke-sky-panel.webp`,
    },
    2: {
      background: `${generatedBase}/chapters/chapter-02-shift-at-the-vault.webp`,
      skyPanel: `${generatedBase}/chapters/chapter-02-storm-glass-sky-panel.webp`,
    },
    3: {
      background: `${generatedBase}/chapters/chapter-03-acesos-light.webp`,
      skyPanel: `${generatedBase}/chapters/chapter-03-gold-sparks-sky-panel.webp`,
    },
    4: {
      background: `${generatedBase}/chapters/chapter-04-council-of-warmth.webp`,
      skyPanel: `${generatedBase}/chapters/chapter-04-soft-rain-sky-panel.webp`,
    },
    5: {
      background: `${generatedBase}/chapters/chapter-05-cyclones-snare.webp`,
      skyPanel: `${generatedBase}/chapters/chapter-05-ashfall-sky-panel.webp`,
    },
  },
};

export function getLevelGeneratedAssets(level) {
  return generatedAssets.chapters[level.id] || {};
}
