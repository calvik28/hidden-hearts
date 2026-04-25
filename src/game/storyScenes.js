export const storyStats = {
  trust: {
    label: "Trust",
    description: "How openly Grian lets people care for him.",
  },
  courage: {
    label: "Courage",
    description: "How firmly Grian steps into danger when people need him.",
  },
  secrecy: {
    label: "Secrecy",
    description: "How tightly Grian protects Astraeus from his civilian life.",
  },
  tenderness: {
    label: "Tenderness",
    description: "How much the chapter lets quiet care land.",
  },
};

export const chapterOneStory = {
  id: 1,
  chapter: "Chapter 1",
  title: "Smoke And Secrets",
  sourceUrl: "https://archiveofourown.org/works/76451261/chapters/200068196",
  logline:
    "Grian moves through a restaurant robbery, Gem's healing, dinner with Scar, hero patrol, and a night out while keeping Astraeus hidden.",
  opening:
    "A first playable slice for the 2D story RPG pivot. This prototype favors emotional pacing, character context, and light choices over combat.",
  scenes: [
    {
      id: "restaurant-smoke",
      location: "Restaurant Back Hall",
      time: "Evening",
      mood: "Smoke, panic, and the wrong kind of attention.",
      participants: ["grian", "jimmy", "tekbox", "ethical"],
      title: "The Robbery",
      narration:
        "Grian and Jimmy expected food and quiet. Instead, Tekbox and Ethical turn the restaurant into a crisis, and Grian has to think like a hero without revealing that he is one.",
      focus:
        "This scene establishes the pressure of public danger: Grian cannot fully act as Astraeus, but he still cannot stop watching for a way to help.",
      choices: [
        {
          id: "guide-civilians",
          label: "Watch for civilians first",
          result:
            "Grian keeps his fear practical. Jimmy follows his lead, and they look for a way out that does not draw villain attention.",
          stats: { courage: 1, tenderness: 1 },
        },
        {
          id: "track-villains",
          label: "Track Tekbox and Ethical",
          result:
            "Grian studies the villains instead of the exit. It gives him useful details, but it keeps him too close to danger.",
          stats: { courage: 2, secrecy: 1 },
        },
        {
          id: "stay-civilian",
          label: "Stay visibly civilian",
          result:
            "Grian swallows the instinct to fight. Tonight, protecting his identity also protects the people around him.",
          stats: { secrecy: 2 },
        },
      ],
    },
    {
      id: "apartment-healing",
      location: "Grian And Scar's Apartment",
      time: "Later",
      mood: "Green sparks, teasing, and the ache after adrenaline.",
      participants: ["grian", "jimmy", "gem"],
      title: "Gem Patches Him Up",
      narration:
        "Gem heals Grian's burned leg while Jimmy hovers nearby. The room is full of familiar teasing, but the pain reminds everyone how close the restaurant came to disaster.",
      focus:
        "Gem is not just a support power. She is a friend whose care has a cost, and Grian already feels guilty for needing it.",
      choices: [
        {
          id: "thank-gem",
          label: "Thank Gem properly",
          result:
            "Grian lets the gratitude show before hiding behind a joke. Gem notices, but she lets him have the escape.",
          stats: { trust: 1, tenderness: 2 },
        },
        {
          id: "deflect-with-jimmy",
          label: "Deflect toward Jimmy",
          result:
            "The teasing lands where it always does: on both avians sharing one terrible survival plan.",
          stats: { secrecy: 1, tenderness: 1 },
        },
        {
          id: "ask-about-pearl",
          label: "Ask about Pearl",
          result:
            "Gem brightens at the mention of movie night. The hero world softens for a moment into ordinary friendship.",
          stats: { tenderness: 2 },
        },
      ],
    },
    {
      id: "pasta-dinner",
      location: "Kitchen Table",
      time: "Night",
      mood: "Bland pasta, warm light, and feelings Grian cannot name out loud.",
      participants: ["grian", "scar"],
      title: "Dinner For Scar",
      narration:
        "Grian makes pasta because it is one of the few things he can make. Scar comes home from Clockers Cafe and turns a tiny dinner into something that feels like home.",
      focus:
        "Scar is the domestic anchor. Grian's secret life is dangerous, but the apartment is where the story lets him want something softer.",
      choices: [
        {
          id: "admit-effort",
          label: "Admit he tried",
          result:
            "Grian lets Scar see the effort beneath the bad sauce planning. Scar teases him, but the care is obvious.",
          stats: { trust: 1, tenderness: 2 },
        },
        {
          id: "tease-back",
          label: "Tease Scar back",
          result:
            "The room settles into their usual rhythm: too much sarcasm for strangers, exactly enough warmth for them.",
          stats: { tenderness: 1 },
        },
        {
          id: "hide-the-burn",
          label: "Keep the injury out of sight",
          result:
            "Grian protects the secret by making the evening look normal. It works, but only because Scar does not know what to ask yet.",
          stats: { secrecy: 2 },
        },
      ],
    },
    {
      id: "hero-context",
      location: "Memory File",
      time: "Between Lives",
      mood: "Posters, powers, and the reason Grian became Astraeus.",
      participants: ["grian", "jimmy", "gem", "pearl", "lizzie", "mumbo", "scar"],
      title: "The Hero Committee",
      narration:
        "Grian's life splits into patterns: hospital shifts, hero patrols, friends who know, friends who do not, and wings he keeps hidden in public.",
      focus:
        "This is the prototype's first codex-style pause. The game should teach character truth through memory, not a combat tutorial.",
      choices: [
        {
          id: "remember-purpose",
          label: "Remember why he helps",
          result:
            "Saving people is not a costume for Grian. It is the same instinct that brought him to the ER.",
          stats: { courage: 1, trust: 1 },
        },
        {
          id: "protect-scar-mumbo",
          label: "Think of Scar and Mumbo",
          result:
            "The secret tightens. Two of Grian's safest people do not know the most dangerous thing about him.",
          stats: { secrecy: 2, tenderness: 1 },
        },
        {
          id: "review-villains",
          label: "Review the threat list",
          result:
            "Ethical, Tithonus, and Lucid are not background danger. They are why the hero committee had to become real.",
          stats: { courage: 2 },
        },
      ],
    },
    {
      id: "city-patrol",
      location: "Central City Street",
      time: "After Grian's Shift",
      mood: "Rooftops, voice changers, and fire in the road.",
      participants: ["grian", "jimmy", "gem", "pearl", "lizzie", "tekbox", "ethical", "tithonus"],
      title: "Astraeus Arrives",
      narration:
        "The alert cuts through Grian's exhaustion. Astraeus joins Acanthus, Dawnstar, Aceso, and Phera as the villains press toward a city cable.",
      focus:
        "The chapter's action should read like coordinated stress, not a reflex test. The meaningful question is what Grian protects first.",
      choices: [
        {
          id: "cover-phera",
          label: "Cover Phera",
          result:
            "Grian watches the team instead of the nearest target. Phera gets space to recover, and Aceso can focus on healing.",
          stats: { trust: 1, courage: 1 },
        },
        {
          id: "stop-tekbox",
          label: "Stop Tekbox",
          result:
            "The arrow is not meant to kill. It is enough to break the villain team's momentum and force a retreat.",
          stats: { courage: 2 },
        },
        {
          id: "hold-the-line",
          label: "Hold the team line",
          result:
            "Grian stays with the plan. The team does not chase when the immediate danger is contained.",
          stats: { trust: 1, secrecy: 1 },
        },
      ],
    },
    {
      id: "bar-night",
      location: "Sidewalk Home",
      time: "Late Night",
      mood: "Friends, drinks, cold air, and Scar's arm steadying him.",
      participants: ["grian", "scar", "jimmy", "gem", "pearl", "lizzie"],
      title: "The Walk Back",
      narration:
        "The friend group finally gets a normal night. Grian loses badly at the game, drinks too much, and ends the evening leaning into Scar more than he means to.",
      focus:
        "Chapter 1 closes with ordinary intimacy. The hero story matters because these are the lives Grian is trying to protect.",
      choices: [
        {
          id: "let-scar-help",
          label: "Let Scar help him walk",
          result:
            "Grian lets himself be carried by the moment and by Scar. It is embarrassing, warm, and safer than pretending.",
          stats: { trust: 1, tenderness: 2 },
        },
        {
          id: "play-it-off",
          label: "Play it off",
          result:
            "Grian turns softness into a joke before it can become too honest. Scar stays close anyway.",
          stats: { secrecy: 1, tenderness: 1 },
        },
        {
          id: "notice-the-feeling",
          label: "Notice the feeling",
          result:
            "Grian does not say anything, but the game records what the chapter already knows: Scar feels like home.",
          stats: { tenderness: 2, trust: 1 },
        },
      ],
    },
  ],
};

export function createStoryProgress() {
  return {
    sceneIndex: 0,
    choices: [],
    stats: Object.fromEntries(Object.keys(storyStats).map((key) => [key, 0])),
    complete: false,
  };
}
