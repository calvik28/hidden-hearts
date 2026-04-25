export const ao3Links = {
  work: "https://archiveofourown.org/works/76451261",
  firstChapter: "https://archiveofourown.org/works/76451261/chapters/200068196",
  latestChapter:
    "https://archiveofourown.org/works/76451261/chapters/212088806",
  latestComments:
    "https://archiveofourown.org/works/76451261/chapters/212088806#comments",
};

export const levels = [
  {
    id: 1,
    chapter: "Chapter 1",
    title: "Smoke and Secrets",
    subtitle: "Restaurant heist, hidden wings, and the apartment afterglow.",
    sourceUrl: "https://archiveofourown.org/works/76451261/chapters/200068196",
    briefing:
      "A quiet night turns into a villain strike. Protect civilians, gather ember evidence, and keep Grian's hero life hidden when the fight follows him home.",
    objective: "Collect ember clues and break Tekbox and Ethical's hold.",
    completion: "The city is safe for tonight, but the secret is getting heavier.",
    zone: "Clockers District",
    weather: "violet smoke",
    accent: "#ff715b",
    ground: "#243047",
    sky: "#08111f",
    pickups: ["Back Door Route", "Ember Trace", "Apartment Key"],
    enemies: ["Tekbox", "Ethical"],
    allies: ["Jimmy", "Gem"],
  },
  {
    id: 2,
    chapter: "Chapter 2",
    title: "Shift at the Vault",
    subtitle: "Hospital pressure, a bank alarm, and a wound too big to ignore.",
    sourceUrl: "https://archiveofourown.org/works/76451261/chapters/201097446",
    briefing:
      "A missed shift becomes a rescue sprint. Stabilize the ward, answer the vault alarm, and survive Moonlight's brutal ambush while Gem vanishes from the team.",
    objective: "Recover ICU supplies, seal the bank breach, and force Moonlight back.",
    completion: "Grian survives, but Aceso is missing and the city notices.",
    zone: "Ren Memorial Hospital",
    weather: "storm glass",
    accent: "#68e1fd",
    ground: "#233a42",
    sky: "#071923",
    pickups: ["Nurse Badge", "Vault Signal", "Broken Feather"],
    enemies: ["Moonlight", "Lucid"],
    allies: ["Mumbo", "Jimmy"],
  },
  {
    id: 3,
    chapter: "Chapter 3",
    title: "Aceso's Light",
    subtitle: "Recovery, pursuit, and one impossible act of healing.",
    sourceUrl: "https://archiveofourown.org/works/76451261/chapters/203917976",
    briefing:
      "With Grian grounded and Gem gone, the team follows a narrow trail into the alleyways. Find her before the villains regroup, then decide whether Solo's strange power can be trusted.",
    objective: "Track Gem, protect Solo, and rekindle Aceso's light.",
    completion: "Gem returns to the team, shaken but alive.",
    zone: "Moonlit Alleys",
    weather: "gold sparks",
    accent: "#f8c75c",
    ground: "#2b2b3c",
    sky: "#130d28",
    pickups: ["Pearl's Lead", "Solo's Spark", "Aceso's Pulse"],
    enemies: ["Tithonus", "Lucid"],
    allies: ["Pearl", "Solo"],
  },
  {
    id: 4,
    chapter: "Chapter 4",
    title: "Council of Warmth",
    subtitle: "Recovery soup, team trust, and a heart finally spoken aloud.",
    sourceUrl: "https://archiveofourown.org/works/76451261/chapters/206472216",
    briefing:
      "Gem heals at Pearl's house while the heroes regroup. Hold the team together, calm the doubts circling Grian, and let a long-hidden feeling become something brave.",
    objective: "Gather trust tokens and dissolve the shadows of doubt.",
    completion: "The team steadies itself, and Grian and Scar step into something more.",
    zone: "Pearl's Safehouse",
    weather: "soft rain",
    accent: "#8ef0b3",
    ground: "#254237",
    sky: "#0b1c1a",
    pickups: ["Tomato Soup", "Council Note", "Scar's Courage"],
    enemies: ["Doubt", "Fear"],
    allies: ["Pearl", "Scar"],
  },
  {
    id: 5,
    chapter: "Chapter 5",
    title: "Cyclone's Snare",
    subtitle: "An office fire, an ER flood, and the trap closing in.",
    sourceUrl: "https://archiveofourown.org/works/76451261/chapters/212088806",
    briefing:
      "Tekbox lights up the city to pull the heroes into the open. Grian is trapped between hospital duty and hero duty, then dragged into Cyclone's cruel arena.",
    objective: "Treat burn victims, cross the inferno, and endure Cyclone's snare.",
    completion:
      "The chapter ends on a cliff edge. The next part of the story is still being written.",
    zone: "Burn ICU",
    weather: "ashfall",
    accent: "#ff3d6e",
    ground: "#3f2532",
    sky: "#18050b",
    pickups: ["Burn Kit", "Emergency Watch", "Charred Feather"],
    enemies: ["Tekbox", "Cyclone"],
    allies: ["Scar", "Team Signal"],
    finalLevel: true,
  },
];

export const finale = {
  chapter: "Chapter 6",
  title: "Coming Soon",
  subtitle: "The next mission is still taking shape.",
};

export const vaultQuestions = [
  {
    prompt: "Which two villains wreck Grian and Jimmy's restaurant night?",
    options: ["Tekbox and Ethical", "Moonlight and Cyclone", "Tithonus and Lucid"],
    answer: "Tekbox and Ethical",
    dial: "EMBER",
  },
  {
    prompt: "Who patches Grian up after Tekbox burns him?",
    options: ["Gem", "Pearl", "Scar"],
    answer: "Gem",
    dial: "HEAL",
  },
  {
    prompt: "What does Grian cook for Scar, somehow forgetting the most important part?",
    options: ["Pasta", "Tomato soup", "Ramen noodles"],
    answer: "Pasta",
    dial: "SAUCE",
  },
];
