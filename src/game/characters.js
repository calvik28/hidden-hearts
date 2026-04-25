const TODO = "TODO: Fill from Leah's future Hidden Hearts character bible.";

function createArc(overrides = {}) {
  return {
    startingPoint: TODO,
    pressure: TODO,
    turningPoints: [],
    chapterBeats: [],
    endingPoint: TODO,
    unresolvedQuestions: [],
    ...overrides,
  };
}

function createDialogueStyle(overrides = {}) {
  return {
    voice: TODO,
    rhythm: TODO,
    vocabulary: [],
    avoids: [],
    sampleLines: [],
    ...overrides,
  };
}

function createVisualNotes(overrides = {}) {
  return {
    portrait: TODO,
    palette: [],
    symbols: [],
    costumeNotes: TODO,
    ...overrides,
  };
}

function createCharacter(character) {
  return {
    id: character.id,
    displayName: character.displayName,
    aliases: [],
    role: TODO,
    firstChapter: null,
    chapters: [],
    shortDescription: TODO,
    longDescription: TODO,
    personality: {
      traits: [],
      strengths: [],
      flaws: [],
      notes: TODO,
    },
    emotionalCore: TODO,
    fears: [],
    desires: [],
    secrets: [],
    relationships: {},
    arc: createArc(),
    visualNotes: createVisualNotes(),
    dialogueStyle: createDialogueStyle(),
    gameplayFunction: TODO,
    tags: [],
    spoilerLevel: "setup",
    sourceNotes: [],
    ...character,
  };
}

export const CHARACTERS = [
  createCharacter({
    id: "grian",
    displayName: "Grian",
    aliases: ["Astraeus", "Astro"],
    role: "Central story focus and hero",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    shortDescription:
      "ER nurse, winged hero, Scar's roommate, and a founder of the hero committee.",
    sourceNotes: [
      "The fic establishes Grian as an ER nurse, an avian hero, Scar's roommate, and later Scar's boyfriend.",
    ],
    personality: {
      traits: [
        "protective",
        "restless",
        "awkwardly affectionate",
        "self-deprecating",
        "brave",
      ],
      strengths: [
        "acts quickly in medical and hero crises",
        "cares deeply for civilians and teammates",
        "uses humor and banter to keep fear manageable",
      ],
      flaws: [
        "hides important truths from people who love him",
        "pushes through exhaustion and injury",
        "struggles to ask for care directly",
      ],
      notes:
        "Source-backed from Chapters 1-5: Grian is pulled between hospital work, hero duty, secrecy, and wanting ordinary closeness with Scar and his friends.",
    },
    emotionalCore:
      "Grian wants to save people without losing the ordinary love and trust that make him feel safe.",
    fears: [
      "Scar or Mumbo seeing his secrecy as betrayal",
      "his friends being hurt when he cannot protect or heal them",
      "being forced to stop while others are in danger",
      "villains exposing his civilian identity",
    ],
    desires: [
      "to protect the city",
      "to keep Scar close",
      "to keep his friends alive",
      "to be useful as both nurse and hero",
    ],
    arc: createArc({
      startingPoint:
        "A capable but overextended nurse and hero who keeps his identities carefully separated.",
      pressure:
        "Repeated injuries, Gem's disappearance, Scar's care, and villain pressure make his secrecy harder to maintain.",
      turningPoints: [
        "Chapter 2: Moonlight breaks his ribs and Aceso disappears.",
        "Chapter 3: he overhears Zero's civilian name and chooses not to weaponize it.",
        "Chapter 4: he admits his feelings to Scar.",
        "Chapter 5: Lucid uses Mumbo and trust as a hallucinated fear before Grian is captured.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Balances restaurant danger, home life, patrol, and hidden feelings for Scar." },
        { chapterId: 2, beat: "Is injured at the bank and lies badly to Scar about what happened." },
        { chapterId: 3, beat: "Helps rescue Gem and faces the possibility that she has died." },
        { chapterId: 4, beat: "Reveals Bdubs' name to the team with an ethical boundary around using it." },
        { chapterId: 5, beat: "Is captured, interrogated for his identity, and tortured through his wings." },
      ],
      endingPoint:
        "Chapter 5 leaves him trapped in the villains' headquarters with his identity still protected but his body and secrecy under direct attack.",
      unresolvedQuestions: [
        "When and how will he tell Scar that he is Astraeus?",
        "How will Mumbo react if he learns the truth?",
        "What history does Cyclone have with him?",
      ],
    }),
    dialogueStyle: createDialogueStyle({
      voice: "Fast, teasing, defensive when vulnerable, and sharper under pressure.",
      rhythm:
        "Banter first, emotional honesty only when safety or affection breaks through.",
      vocabulary: ["hospital work", "hero callsigns", "dry complaints", "caregiving"],
      avoids: ["openly naming fear", "directly asking to be cared for"],
    }),
    gameplayFunction:
      "Primary point-of-view anchor for secrecy, exhaustion, trust, pain, and resolve choices.",
    tags: ["hero", "avian", "secret-identity", "nurse", "chapter-focus"],
  }),
  createCharacter({
    id: "scar",
    displayName: "Scar",
    aliases: [],
    role: "Grian's roommate and romantic partner",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    shortDescription:
      "Grian's roommate, works at Clockers Cafe, cares for Grian during recovery, and becomes his boyfriend.",
    sourceNotes: [
      "The fic establishes Scar as Grian's roommate, a Clockers Cafe worker, and a telepath.",
    ],
    personality: {
      traits: ["warm", "teasing", "observant", "protective", "patient"],
      strengths: [
        "creates a sense of home for Grian",
        "notices when Grian is hurt or lying",
        "shows care through food, presence, rides, and touch",
      ],
      flaws: [
        "keeps his own telepathy secret for years",
        "can see more of Grian than Grian realizes",
      ],
      notes:
        "Source-backed from Chapters 1-5: Scar is domestic safety first, then explicit romance, with telepathy revealed after the confession.",
    },
    emotionalCore:
      "Scar wants closeness with Grian and is willing to care for him even before he knows the full truth.",
    fears: [
      "Grian being hurt alone",
      "Grian shutting him out",
      "the cost of revealing his own power too late",
    ],
    desires: [
      "to care for Grian",
      "to be chosen by Grian openly",
      "to share a quieter life with him",
    ],
    arc: createArc({
      startingPoint:
        "Grian's roommate and best friend, framed through cooking, teasing, and comfortable silence.",
      pressure:
        "Grian's visible injuries and strange absences make the secret harder to ignore.",
      turningPoints: [
        "Chapter 2: cares for Grian after the false mugging story.",
        "Chapter 3: takes time off work to help Grian recover.",
        "Chapter 4: confesses mutual feelings and reveals he has been reading Grian clearly.",
        "Chapter 5: reveals telepathy.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Comes home to Grian's pasta and anchors the apartment warmth." },
        { chapterId: 2, beat: "Questions Grian's injury story and accepts a partial lie." },
        { chapterId: 3, beat: "Turns recovery into sustained care and shared domestic time." },
        { chapterId: 4, beat: "Moves the relationship from hidden feelings into romance." },
        { chapterId: 5, beat: "Reveals telepathy and searches for Grian when he goes missing." },
      ],
      endingPoint:
        "By Chapter 5, Scar knows his own secret is out but still does not know Grian is Astraeus.",
      unresolvedQuestions: [
        "How will he react to Grian's hero identity?",
        "How long has he suspected Grian is hiding something larger?",
      ],
    }),
    dialogueStyle: createDialogueStyle({
      voice: "Warm, teasing, coaxing, and gently direct when Grian is cornered emotionally.",
      rhythm: "Playful pressure followed by reassurance.",
      vocabulary: ["food", "home", "care", "gentle teasing"],
      avoids: ["cold confrontation"],
    }),
    gameplayFunction:
      "Relationship and home-anchor character for honesty, care, and trust scenes.",
    tags: ["roommate", "love-interest", "telepathy", "clockers-cafe"],
  }),
  createCharacter({
    id: "gem",
    displayName: "Gem",
    aliases: ["Aceso"],
    role: "Hero and healer",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    shortDescription:
      "Hero healer whose codename is Aceso. She heals Grian, disappears after the bank heist, and recovers at Pearl's house.",
    sourceNotes: [
      "Aceso is Gem's hero identity in the fic, not a separate character.",
    ],
    personality: {
      traits: ["teasing", "resilient", "caring", "direct"],
      strengths: [
        "heals teammates even when it drains her",
        "keeps warmth and humor in stressful situations",
        "returns to team life after severe trauma",
      ],
      flaws: [
        "has limited combat options without a weapon",
        "can be made vulnerable when isolated from the team",
      ],
      notes:
        "Source-backed from Chapters 1-5: Gem is both the team's healer and a friend whose disappearance destabilizes everyone.",
    },
    emotionalCore:
      "Gem is the team's healing center, and the story repeatedly shows how frightening it is when the healer needs saving.",
    fears: ["being unable to help in combat", "her friends getting hurt because she is absent"],
    desires: ["to heal her friends", "to recover safely", "to return to the team"],
    arc: createArc({
      startingPoint:
        "A teasing, dependable healer who patches up Grian and keeps the hero team functioning.",
      pressure:
        "She is kidnapped, nearly killed, revived, and forced into a slow recovery.",
      turningPoints: [
        "Chapter 2: disappears during the bank heist.",
        "Chapter 3: is rescued from Tithonus and revived by Solo.",
        "Chapter 4: recovers at Pearl's house.",
        "Chapter 5: returns to healing Grian during patrol.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Heals Grian after Tekbox burns him and teases him afterward." },
        { chapterId: 2, beat: "Vanishes when Astraeus falls unconscious." },
        { chapterId: 3, beat: "Is found badly injured and saved by Solo's healing." },
        { chapterId: 4, beat: "Recovers under Pearl's care with soup, rest, and pain medication." },
        { chapterId: 5, beat: "Heals Astraeus' head and wing after the patrol attack." },
      ],
      endingPoint:
        "By Chapter 5 she is back in the field, but her kidnapping remains a core trauma thread.",
      unresolvedQuestions: [
        "What exactly happened to her while she was held by the villains?",
        "How much does returning to hero work cost her?",
      ],
    }),
    dialogueStyle: createDialogueStyle({
      voice: "Blunt, affectionate, teasing, and practical.",
      rhythm: "Short comfort mixed with joking pressure.",
      vocabulary: ["healing", "idiots", "recovery", "team check-ins"],
      avoids: ["overly formal hero talk"],
    }),
    gameplayFunction:
      "Healing, recovery, and team-stability character; central to care scenes and rescue aftermath.",
    tags: ["hero", "healer", "aceso", "friend"],
  }),
  createCharacter({
    id: "jimmy",
    displayName: "Jimmy",
    aliases: ["Acanthus", "Timmy"],
    role: "Hero and Grian's childhood friend",
    firstChapter: 1,
    chapters: [1, 2, 3, 4],
    shortDescription:
      "Winged hero, Grian's childhood friend, and co-founder of the hero committee.",
    sourceNotes: [
      "The fic establishes Jimmy and Grian as childhood friends who both have avian powers.",
    ],
    personality: {
      traits: ["loyal", "anxious under pressure", "bantering", "protective"],
      strengths: [
        "acts fast when Grian is injured",
        "shares deep history with Grian",
        "keeps showing up for the hero team",
      ],
      flaws: [
        "can panic when friends are hurt",
        "uses jokes and bickering to cover worry",
      ],
      notes:
        "Source-backed from Chapters 1-4: Jimmy's friendship with Grian is old, physical, and protective, especially during injuries.",
    },
    emotionalCore:
      "Jimmy is Grian's oldest hero-side bond, mixing childhood trust with immediate fear when the people he loves are hurt.",
    fears: ["Grian dying on his watch", "Gem being lost", "not reaching friends in time"],
    desires: ["to protect Grian", "to keep the team together", "to be brave enough in crisis"],
    arc: createArc({
      startingPoint:
        "Grian's childhood friend and co-founder of the hero committee.",
      pressure:
        "Bank and rescue events force him into caretaker and crisis-response roles.",
      turningPoints: [
        "Chapter 2: carries unconscious Astraeus to the hospital.",
        "Chapter 3: argues for letting Solo try to save Aceso.",
        "Chapter 4: hosts the hero meeting while the team processes what happened.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Bickers with Grian and fights beside him as Acanthus." },
        { chapterId: 2, beat: "Cradles and transports Astraeus after Moonlight's attack." },
        { chapterId: 3, beat: "Moves from rage at Solo to desperate hope that Solo can save Gem." },
        { chapterId: 4, beat: "Gives the team a casual meeting space at his house." },
      ],
      endingPoint:
        "By Chapter 4 he remains one of the team's emotional constants, with concern often under jokes.",
      unresolvedQuestions: ["How will his fear change after Grian's Chapter 5 capture?"],
    }),
    gameplayFunction:
      "Childhood-trust and team-loyalty character for banter, worry, and rescue choices.",
    tags: ["hero", "avian", "friend"],
  }),
  createCharacter({
    id: "pearl",
    displayName: "Pearl",
    aliases: ["Dawnstar", "Dawn"],
    role: "Hero and Gem's close friend",
    firstChapter: 1,
    chapters: [1, 2, 3, 4],
    shortDescription:
      "Hero on Grian's team. Gem stays at Pearl's house while recovering.",
    sourceNotes: [
      "The fic identifies Dawnstar as Pearl's hero identity.",
    ],
    personality: {
      traits: ["fierce", "protective", "tender in private", "emotionally direct"],
      strengths: [
        "acts decisively when Gem is in danger",
        "cares for Gem through recovery",
        "holds boundaries around visitation and rest",
      ],
      flaws: [
        "can rush into danger when Gem is threatened",
        "grief can overtake tactical patience",
      ],
      notes:
        "Source-backed from Chapters 3-4: Pearl's bond with Gem is one of the clearest care arcs in the fic.",
    },
    emotionalCore:
      "Pearl's fierceness is rooted in care, especially her fear of losing Gem.",
    fears: ["losing Gem", "being too late to help", "watching a friend die"],
    desires: ["to keep Gem safe", "to act instead of waiting", "to protect the team"],
    arc: createArc({
      startingPoint:
        "A competent hero teammate and Gem's close friend.",
      pressure:
        "Gem's kidnapping and near-death pull Pearl from field competence into visible grief.",
      turningPoints: [
        "Chapter 3: breaks into the room when she hears Gem in danger.",
        "Chapter 3: grieves when Gem stops breathing.",
        "Chapter 4: cares for Gem at her house during recovery.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Fights as Dawnstar and is linked to Gem through their planned movie night." },
        { chapterId: 3, beat: "Rescues Gem from the room and panics when Gem fades." },
        { chapterId: 4, beat: "Makes soup, manages recovery, and protects Gem from too much activity." },
      ],
      endingPoint:
        "By Chapter 4 she has shifted into a caretaker role without losing her edge.",
      unresolvedQuestions: ["How does she process the villains nearly killing Gem?"],
    }),
    gameplayFunction:
      "Protective-caretaker and high-emotion rescue character for Gem-centered scenes.",
    tags: ["hero", "friend", "gem-thread"],
  }),
  createCharacter({
    id: "lizzie",
    displayName: "Lizzie",
    aliases: ["Phera"],
    role: "Hero",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    shortDescription:
      "Hero on Grian's team with telekinesis and spear-based fighting.",
    sourceNotes: [
      "The fic identifies Phera as Lizzie's hero identity.",
    ],
    personality: {
      traits: ["practical", "brave", "social", "protective"],
      strengths: [
        "helps turn panic into plans",
        "uses telekinesis creatively in fights",
        "protects injured teammates under pressure",
      ],
      flaws: [
        "can underestimate how bad a threat has become",
        "carries stress under casual confidence",
      ],
      notes:
        "Source-backed from Chapters 1-5: Lizzie often serves as the practical teammate who moves scenes forward.",
    },
    emotionalCore:
      "Lizzie keeps people moving when fear could freeze the group.",
    fears: ["the team falling apart mid-crisis", "friends being hurt beyond help"],
    desires: ["to make plans work", "to protect the team", "to keep social bonds alive"],
    arc: createArc({
      startingPoint:
        "A telekinetic spear fighter and warm friend in the hero circle.",
      pressure:
        "Gem's disappearance and Grian's repeated injuries force her into rescue and protection beats.",
      turningPoints: [
        "Chapter 2: pulls Grian away from Moonlight's grip.",
        "Chapter 3: helps plan and execute the rescue.",
        "Chapter 5: catches Grian with telekinesis after Cyclone drops him.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Fights as Phera and joins the wider friend-group night out." },
        { chapterId: 2, beat: "Saves Astraeus from Moonlight's immediate grip." },
        { chapterId: 3, beat: "Helps track the villains and rescue Gem." },
        { chapterId: 4, beat: "Pushes the hero meeting toward practical questions." },
        { chapterId: 5, beat: "Protects Grian after his wing is shot and faces Tithonus." },
      ],
      endingPoint:
        "By Chapter 5 she is a reliable field protector, especially when Grian is injured.",
      unresolvedQuestions: ["How does she respond to Grian's capture after their patrol goes wrong?"],
    }),
    gameplayFunction:
      "Planning, field-protection, and team-social glue character.",
    tags: ["hero", "telekinesis"],
  }),
  createCharacter({
    id: "mumbo",
    displayName: "Mumbo",
    aliases: ["Dr Mumbo"],
    role: "Grian's friend and coworker",
    firstChapter: 1,
    chapters: [1, 2, 4, 5],
    shortDescription:
      "Hospital coworker and friend who treats Astraeus after the bank heist without knowing he is Grian.",
    sourceNotes: [
      "The fic establishes Mumbo as an ER nurse who works with Grian.",
    ],
    personality: {
      traits: ["kind", "curious", "professional", "enthusiastic"],
      strengths: [
        "respects Astraeus' mask and identity boundaries",
        "cares for Grian as a coworker and friend",
        "stays gentle while treating frightening injuries",
      ],
      flaws: [
        "admires villain stealth and powers from a distance",
        "does not yet know how central he is to Grian's secrecy fear",
      ],
      notes:
        "Source-backed from Chapters 2, 4, and 5: Mumbo treats Astraeus without knowing he is Grian, brings Grian flowers when he returns to work, and becomes the face of Grian's hallucinated trust fear.",
    },
    emotionalCore:
      "Mumbo represents ordinary friendship and professional care, which makes Grian's fear of betraying him more painful.",
    fears: [TODO],
    desires: ["to do good work at the hospital", "to understand powers and hero incidents"],
    arc: createArc({
      startingPoint:
        "Grian's hospital friend and coworker who is fascinated by hero and villain powers.",
      pressure:
        "He is close to Grian but unknowingly treats Grian's hero identity after the bank heist.",
      turningPoints: [
        "Chapter 2: treats Astraeus' broken ribs while respecting the mask.",
        "Chapter 4: welcomes Grian back to work with garden flowers.",
        "Chapter 5: appears in Lucid's hallucination as the friend Grian fears losing.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Established as Grian's ER coworker and best friend outside the hero team." },
        { chapterId: 2, beat: "Treats Astraeus and is fascinated by retractable wings." },
        { chapterId: 4, beat: "Shows care when Grian returns after injury." },
        { chapterId: 5, beat: "His imagined rejection becomes a targeted hallucination." },
      ],
      endingPoint:
        "By Chapter 5, Mumbo still does not know Grian's identity, but the secret is emotionally dangerous.",
      unresolvedQuestions: ["How will he respond when he learns Grian is Astraeus?"],
    }),
    gameplayFunction:
      "Hospital friendship and secret-identity consequence character.",
    tags: ["friend", "hospital", "nurse"],
  }),
  createCharacter({
    id: "solo",
    displayName: "Solo",
    aliases: [],
    role: "Villain healer who helps save Aceso",
    firstChapter: 1,
    chapters: [1, 3, 4, 5],
    shortDescription:
      "Villain-side healer who says he does not approve of the attempt to kill Aceso and uses his healing to save her.",
    sourceNotes: [
      "The fic establishes Solo as a healer connected to the villains.",
    ],
    personality: {
      traits: ["merciful", "secretive", "morally conflicted", "calm under pressure"],
      strengths: [
        "can heal beyond normal limits",
        "acts when the villain team crosses a moral line",
        "accepts risk to save Aceso",
      ],
      flaws: [
        "still operates from the villain side",
        "does not explain his full allegiance or motives",
      ],
      notes:
        "Source-backed from Chapter 3: Solo revives Aceso and says he does not approve of trying to kill her.",
    },
    emotionalCore:
      "Solo is proof that healing creates a moral boundary even inside the villain side.",
    fears: ["the other villains learning he helped the heroes"],
    desires: ["to prevent healer-on-healer killing", "to leave before his team sees him helping"],
    arc: createArc({
      startingPoint:
        "A villain-side healer mentioned by the villain team.",
      pressure:
        "The attempted killing of Aceso pushes him to intervene against his team's interests.",
      turningPoints: [
        "Chapter 3: approaches the heroes instead of fighting them.",
        "Chapter 3: revives Aceso and leaves before Tekbox and Ethical arrive.",
      ],
      chapterBeats: [
        { chapterId: 3, beat: "Saves Aceso with yellow healing despite the heroes' distrust." },
      ],
      endingPoint:
        "By Chapter 5 he remains a morally complicated villain-side healer whose intervention changed everything.",
      unresolvedQuestions: [
        "Why is he with the villains?",
        "What will happen if the villains learn he saved Aceso?",
      ],
    }),
    gameplayFunction:
      "Moral-conflict healer thread and bridge between hero and villain sides.",
    tags: ["villain", "healer", "moral-conflict"],
  }),
  createCharacter({
    id: "tekbox",
    displayName: "Tekbox",
    aliases: ["Tek"],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 5],
    shortDescription:
      "Villain with heat/fire powers who robs the restaurant and later sets fire to an office building.",
    sourceNotes: [
      "The fic shows Tekbox burning Grian at the restaurant and later burning Grian's wing under Cyclone's pressure.",
    ],
    personality: {
      traits: ["dangerous", "volatile", "pressured", "not fully unreadable"],
      strengths: ["powerful heat and fire control", "long-running villain presence"],
      flaws: [
        "causes serious civilian harm",
        "can be pushed into cruelty by stronger villain pressure",
      ],
      notes:
        "Source-backed from Chapters 1 and 5: Tekbox burns a restaurant, sets fire to an office building, and reluctantly burns Astraeus' wing when Cyclone orders it.",
    },
    emotionalCore:
      "Tekbox is dangerous and responsible for harm, but Chapter 5 shows discomfort when ordered into intimate torture.",
    fears: [TODO],
    desires: [TODO],
    arc: createArc({
      startingPoint:
        "A fire villain willing to burn buildings and fight heroes.",
      pressure:
        "Cyclone's return places Tekbox under a more sadistic command structure.",
      turningPoints: [
        "Chapter 1: burns Grian during the restaurant robbery.",
        "Chapter 5: sets fire to an occupied office building.",
        "Chapter 5: hesitates before burning Astraeus' wings under Cyclone's order.",
      ],
      chapterBeats: [
        { chapterId: 1, beat: "Restaurant robbery and patrol fight establish his fire threat." },
        { chapterId: 5, beat: "Office fire creates mass ER consequences, then Cyclone forces him into wing torture." },
      ],
      endingPoint:
        "By Chapter 5 he remains culpable while also showing visible reluctance around Cyclone's cruelty.",
      unresolvedQuestions: ["What does Tekbox want, and how much control does Cyclone have over him?"],
    }),
    gameplayFunction:
      "Fire-threat antagonist whose actions connect hero combat to hospital consequences.",
    tags: ["villain", "fire"],
  }),
  createCharacter({
    id: "ethical",
    displayName: "Ethical",
    aliases: [],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 3, 5],
    shortDescription:
      "Villain with super strength who appears with Tekbox at the restaurant and in later villain scenes.",
    sourceNotes: [
      "The fic describes Ethical's power as super strength.",
    ],
    personality: {
      traits: ["forceful", "team-oriented", "physically imposing"],
      strengths: ["super strength", "close combat pressure", "protects or extracts teammates"],
      flaws: ["uses force to restrain and intimidate", "follows the villain group's escalation"],
      notes:
        "Source-backed from Chapters 1-5: Ethical fights heroes, carries Tekbox from danger, and restrains Grian during interrogation.",
    },
    emotionalCore:
      "Ethical functions as the villain team's physical pressure point.",
    arc: createArc({
      startingPoint:
        "One of the earliest and longest-running public villains.",
      pressure:
        "Villain conflicts escalate from robberies and fights into kidnapping and torture.",
      chapterBeats: [
        { chapterId: 1, beat: "Robs the restaurant with Tekbox and fights Dawnstar." },
        { chapterId: 5, beat: "Helps hold Astraeus during the villains' identity interrogation." },
      ],
      endingPoint:
        "By Chapter 5 he is part of the headquarters threat around Grian.",
      unresolvedQuestions: [TODO],
    }),
    gameplayFunction:
      "Physical restraint and brute-force antagonist.",
    tags: ["villain", "super-strength"],
  }),
  createCharacter({
    id: "moonlight",
    displayName: "Moonlight",
    aliases: [],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 2, 5],
    shortDescription:
      "Villain who can appear suddenly, injures Astraeus at the bank, and attacks him again during patrol.",
    sourceNotes: [
      "The fic shows Moonlight turning invisible or disappearing during fights.",
    ],
    personality: {
      traits: ["ruthless", "stealthy", "opportunistic"],
      strengths: ["invisibility or sudden disappearance", "ambush attacks", "ranged escalation in Chapter 5"],
      flaws: ["targets injured or isolated heroes brutally"],
      notes:
        "Source-backed from Chapters 2 and 5: Moonlight knocks Astraeus down, breaks his ribs, disappears during fights, and later shoots his wing.",
    },
    emotionalCore:
      "Moonlight makes the battlefield feel unsafe because danger can appear without warning.",
    arc: createArc({
      startingPoint:
        "A stealth villain associated with sudden appearances and disappearances.",
      pressure:
        "Moonlight's attacks repeatedly isolate and injure Astraeus.",
      turningPoints: [
        "Chapter 2: stomps on Astraeus' ribs and knocks him unconscious.",
        "Chapter 5: shoots Astraeus' wing and slams his head into a wall.",
      ],
      endingPoint:
        "By Chapter 5 Moonlight has become one of Grian's most physically damaging enemies.",
      unresolvedQuestions: [TODO],
    }),
    gameplayFunction:
      "Ambush and injury antagonist.",
    tags: ["villain", "stealth"],
  }),
  createCharacter({
    id: "lucid",
    displayName: "Lucid",
    aliases: [],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 2, 3, 5],
    shortDescription:
      "Villain whose power causes hallucinations in a nearby radius.",
    sourceNotes: [
      "The fic explicitly describes Lucid's hallucination power.",
    ],
    personality: {
      traits: ["dangerous", "sharp", "manipulative", "capable of concern"],
      strengths: ["hallucinations", "knives", "psychological pressure"],
      flaws: ["uses fear and memory against targets", "works inside escalating villain harm"],
      notes:
        "Source-backed from Chapters 1-5: Lucid's radius hallucinations are treated as especially threatening, and Chapter 5 shows him using Grian's fear around Mumbo.",
    },
    emotionalCore:
      "Lucid weaponizes perception and trust, making him especially dangerous for a secret-identity story.",
    arc: createArc({
      startingPoint:
        "One of the original major villains whose hallucination power helped inspire the hero committee.",
      pressure:
        "His power shifts from battlefield confusion into personal psychological attack.",
      turningPoints: [
        "Chapter 2: causes memory-blackout confusion during the bank heist.",
        "Chapter 3: shows concern for an injured Zero.",
        "Chapter 5: traps Grian in a hallucination where Mumbo rejects him.",
      ],
      chapterBeats: [
        { chapterId: 2, beat: "Uses hallucination power while the villains escape the bank." },
        { chapterId: 3, beat: "Calls Zero by his civilian name while trying to understand his injury." },
        { chapterId: 5, beat: "Holds Grian non-responsive for an hour through hallucination." },
      ],
      endingPoint:
        "By Chapter 5 his power has directly exposed Grian's fear of losing trust.",
      unresolvedQuestions: ["What is the exact emotional bond between Lucid and Zero?"],
    }),
    gameplayFunction:
      "Psychological-threat antagonist for fear, memory, and secret-identity scenes.",
    tags: ["villain", "hallucinations"],
  }),
  createCharacter({
    id: "tithonus",
    displayName: "Tithonus",
    aliases: [],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 3, 5],
    shortDescription:
      "Villain described as immortal and repeatedly involved in fights against the heroes.",
    sourceNotes: [
      "The fic explicitly describes Tithonus as immortal.",
    ],
    personality: {
      traits: ["cruel", "commanding", "violent", "hard to read"],
      strengths: ["immortality", "close combat", "intimidation"],
      flaws: [
        "uses violence against heroes and teammates",
        "contributes to escalation even when boundaries appear uneven",
      ],
      notes:
        "Source-backed from Chapters 3 and 5: Tithonus threatens Gem, hurts Zero, interrogates Grian, and still asks Cyclone to let already-injured Astraeus go.",
    },
    emotionalCore:
      "Tithonus is a durable threat whose violence is complicated by hints of uneven limits inside the villain group.",
    arc: createArc({
      startingPoint:
        "One of the original major villains and a long-term threat because of immortality.",
      pressure:
        "The villain plot around Aceso and Astraeus exposes his cruelty and his place in internal villain conflict.",
      turningPoints: [
        "Chapter 3: threatens Gem and fights Grian in the rescue room.",
        "Chapter 3: is said to have attacked Zero.",
        "Chapter 5: interrogates Astraeus for his civilian name.",
        "Chapter 5: tells Cyclone to let Astraeus go because he is already injured.",
      ],
      endingPoint:
        "By Chapter 5 he is still an antagonist, but not identical to Cyclone's sadism.",
      unresolvedQuestions: ["Why did he attack Zero?", "What limits does he actually have?"],
    }),
    gameplayFunction:
      "Durable antagonist and villain-internal-tension signal.",
    tags: ["villain", "immortal"],
  }),
  createCharacter({
    id: "cyclone",
    displayName: "Cyclone",
    aliases: [],
    role: "Villain",
    firstChapter: 5,
    chapters: [5],
    shortDescription:
      "Villain who appears after years away, uses vines, and holds Astraeus in the Chapter 5 cliffhanger.",
    sourceNotes: [
      "The fic connects Cyclone to thorn bushes and vines in Chapter 5.",
    ],
    personality: {
      traits: ["controlling", "sadistic", "theatrical", "coercive"],
      strengths: ["vine and thorn restraints", "battlefield control", "psychological intimidation"],
      flaws: ["enjoys pain", "escalates the villain side into torture"],
      notes:
        "Source-backed from Chapter 5: Cyclone returns after years away, traps Astraeus with vines, orders Tekbox to burn his wings, and frames pain as leverage.",
    },
    emotionalCore:
      "Cyclone represents the story's escalation from recurring villain fights into personal coercion and torture.",
    fears: [TODO],
    desires: ["to control Astraeus", "to extract civilian identity information", "to reassert power after years away"],
    arc: createArc({
      startingPoint:
        "A rarely seen villain who has been absent from public view for years.",
      pressure:
        "His return changes the threat level and exposes the villains' headquarters plot.",
      turningPoints: [
        "Chapter 5: traps Astraeus in a thorn circle during patrol.",
        "Chapter 5: orders Tekbox to burn Astraeus' wings.",
        "Chapter 5: continues harming Astraeus after Tekbox leaves.",
      ],
      chapterBeats: [
        { chapterId: 5, beat: "Uses vines to restrain, drop, and later torture Astraeus." },
      ],
      endingPoint:
        "Chapter 5 positions him as the current escalation antagonist.",
      unresolvedQuestions: [
        "Why has he returned now?",
        "What happened between him and Astraeus or the city three years ago?",
      ],
    }),
    gameplayFunction:
      "Major escalation antagonist for restraint, fear, and Chapter 5 cliffhanger pressure.",
    tags: ["villain", "vines", "chapter-5"],
  }),
  createCharacter({
    id: "manic",
    displayName: "Manic",
    aliases: [],
    role: "Villain",
    firstChapter: 1,
    chapters: [1, 2, 5],
    shortDescription:
      "Villain who appears in the bank heist and can manipulate material into weapons or restraints.",
    sourceNotes: [
      "The fic shows Manic creating a concrete hammer and later shaping metal into handcuffs.",
    ],
    personality: {
      traits: ["resourceful", "combative", "practical"],
      strengths: ["material shaping", "improvised weapons", "restraints"],
      flaws: ["supports the villain team's confinement tactics"],
      notes:
        "Source-backed from Chapters 2 and 5: Manic shapes concrete and metal into weapons or restraints.",
    },
    emotionalCore:
      "Manic turns the environment into threat, making ordinary spaces unsafe.",
    arc: createArc({
      startingPoint:
        "A villain who can reshape available material into weapons.",
      pressure:
        "His power shifts from bank-heist offense to restraining a captured hero.",
      turningPoints: [
        "Chapter 2: creates concrete and metal weapons during the bank heist.",
        "Chapter 5: reshapes metal into handcuffs for Astraeus.",
      ],
      endingPoint:
        "By Chapter 5 he is part of the headquarters confinement system.",
      unresolvedQuestions: [TODO],
    }),
    gameplayFunction:
      "Environment-to-restraint antagonist for set-piece danger.",
    tags: ["villain", "material-shaping"],
  }),
  createCharacter({
    id: "zero",
    displayName: "Zero",
    aliases: ["Bdubs"],
    role: "Villain with moral conflict",
    firstChapter: 3,
    chapters: [3, 4],
    shortDescription:
      "Villain with speed whose civilian name is overheard as Bdubs and who helps Astraeus escape Tithonus.",
    sourceNotes: [
      "The fic establishes Zero's speed power and reveals Bdubs as his civilian name.",
    ],
    personality: {
      traits: ["morally conflicted", "wary", "injured", "defiant"],
      strengths: ["speed", "can act against his team when a line is crossed"],
      flaws: [
        "participated in Gem's kidnapping under orders",
        "hides key truth even from Lucid",
      ],
      notes:
        "Source-backed from Chapters 3-4: Zero kidnapped Gem under orders, was not on board with killing her, was hurt by Tithonus, and lets Astraeus leave.",
    },
    emotionalCore:
      "Zero is trapped between villain orders and a moral line he does not fully cross.",
    fears: ["being overheard by heroes", "returning to the villains alone", "the consequences of defying Tithonus"],
    desires: ["to survive the villain side", "to avoid being part of murder", "to keep his civilian name protected"],
    arc: createArc({
      startingPoint:
        "A speed villain usually associated with Lucid.",
      pressure:
        "Being ordered to kidnap Aceso and witnessing the attempted killing pushes him into conflict with his team.",
      turningPoints: [
        "Chapter 3: admits he was told to kidnap Aceso and was not on board.",
        "Chapter 3: is revealed as Bdubs when Lucid says his name.",
        "Chapter 3: helps Astraeus escape Tithonus.",
        "Chapter 4: Grian chooses not to weaponize Zero's civilian name.",
      ],
      chapterBeats: [
        { chapterId: 3, beat: "Appears injured after Tithonus attacked him and later lets Astraeus go." },
        { chapterId: 4, beat: "Becomes an ethical problem for the heroes once Grian reveals his name." },
      ],
      endingPoint:
        "By Chapter 4 he is a live moral-conflict thread rather than a simple enemy.",
      unresolvedQuestions: [
        "Why is he with the villains?",
        "What exactly happened between him and Tithonus?",
        "How much does Lucid know or protect him?",
      ],
    }),
    dialogueStyle: createDialogueStyle({
      voice: "Tense, defensive, and clipped when scared or hurt.",
      rhythm: "Short refusals and guarded admissions.",
      vocabulary: ["orders", "names", "fairness", "not killing"],
      avoids: ["explaining what happened with Tithonus"],
    }),
    gameplayFunction:
      "Villain-side moral-conflict character for mercy, secrecy, and restraint choices.",
    tags: ["villain", "speed", "moral-conflict", "bdubs"],
  }),
  createCharacter({
    id: "theo-innit",
    displayName: "Theo_innit",
    aliases: [],
    role: "Author/meta frame",
    firstChapter: null,
    chapters: [],
    shortDescription:
      "Author codename credited by the current app and AO3 linkout. Keep this meta-only unless the user explicitly makes it part of the story world.",
    gameplayFunction: "Credits and source framing.",
    sourceNotes: ["Referenced in app presentation copy and AO3 source links."],
    tags: ["meta", "author"],
  }),
];

export const CHARACTER_RELATIONSHIPS = [
  {
    sourceId: "grian",
    targetId: "scar",
    relationshipType: "roommates to romantic partners",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    publicDynamic:
      "They live together, Scar takes care of Grian during recovery, and they become boyfriends.",
    privateDynamic:
      "Grian hides that he is Astraeus, while Scar hides telepathy until after their confession.",
    emotionalWeight: "high",
    conflict:
      "Their intimacy grows while Grian's hero identity remains a major unrevealed truth.",
    trust:
      "High emotional trust, incomplete factual honesty.",
    notes:
      "Chapters 1-5 build this through food, care, comfortable silence, the Chapter 4 confession, and Scar's Chapter 5 telepathy reveal.",
    spoilerLevel: "chapter-4",
  },
  {
    sourceId: "grian",
    targetId: "gem",
    relationshipType: "hero teammates and friends",
    firstChapter: 1,
    chapters: [1, 2, 3, 4, 5],
    publicDynamic:
      "Gem heals Grian after Tekbox burns him and later disappears after the bank heist.",
    privateDynamic:
      "Grian relies on Gem as a friend and healer, then has to face being unable to save her without Solo.",
    emotionalWeight: "high",
    conflict:
      "Gem's absence exposes how vulnerable the team is without their healer.",
    trust: "High team trust.",
    notes: "Aceso is Gem's hero identity.",
    spoilerLevel: "setup",
  },
  {
    sourceId: "grian",
    targetId: "jimmy",
    relationshipType: "childhood friends and hero teammates",
    firstChapter: 1,
    chapters: [1, 2, 3, 4],
    publicDynamic:
      "They are childhood friends, both avians, and helped create the hero committee.",
    privateDynamic:
      "Their bond is old enough that worry and bickering sit side by side.",
    emotionalWeight: "high",
    conflict:
      "Injuries force Jimmy from banter partner into emergency protector.",
    trust: "Very high; Jimmy knows Grian's hero identity and power history.",
    notes:
      "Jimmy carries Astraeus to the hospital in Chapter 2 and argues for hope when Solo may be able to save Aceso in Chapter 3.",
    spoilerLevel: "setup",
  },
  {
    sourceId: "gem",
    targetId: "pearl",
    relationshipType: "close friends",
    firstChapter: 1,
    chapters: [1, 3, 4],
    publicDynamic:
      "Gem promises Pearl a movie night in Chapter 1 and recovers at Pearl's house after Solo saves her.",
    privateDynamic:
      "Pearl's fear of losing Gem turns into fierce protection and quiet care.",
    emotionalWeight: "high",
    conflict:
      "Pearl's urgency can outrun the plan when Gem is in danger.",
    trust: "Very high.",
    notes:
      "Chapter 4 recovery scenes make this one of the clearest care relationships.",
    spoilerLevel: "setup",
  },
  {
    sourceId: "tekbox",
    targetId: "ethical",
    relationshipType: "villain teammates",
    firstChapter: 1,
    chapters: [1, 3, 5],
    publicDynamic:
      "They rob the restaurant together and appear together in later villain activity.",
    privateDynamic:
      "They operate as field partners, with Ethical physically extracting Tekbox after Tekbox is injured.",
    emotionalWeight: "medium",
    conflict: "Unknown beyond villain teamwork.",
    trust: "Functional field trust.",
    notes:
      "Their deeper motive and loyalty structure should remain TODO until more source detail exists.",
    spoilerLevel: "setup",
  },
  {
    sourceId: "grian",
    targetId: "cyclone",
    relationshipType: "hero and antagonist",
    firstChapter: 5,
    chapters: [5],
    publicDynamic:
      "Cyclone traps Astraeus with vines and drives the Chapter 5 cliffhanger.",
    privateDynamic:
      "Cyclone seems to know Astraeus from earlier public villain history and escalates the threat into personal torture.",
    emotionalWeight: "high",
    conflict:
      "Cyclone wants Astraeus' civilian identity and uses restraint, pain, and humiliation to force it.",
    trust: "None.",
    notes:
      "Chapter 5 says Cyclone has not been seen in years, leaving the prior history unresolved.",
    spoilerLevel: "chapter-5",
  },
  {
    sourceId: "grian",
    targetId: "mumbo",
    relationshipType: "hospital friends and secret-identity risk",
    firstChapter: 1,
    chapters: [1, 2, 4, 5],
    publicDynamic:
      "They work together as ER nurses, and Mumbo treats Astraeus after the bank heist without knowing he is Grian.",
    privateDynamic:
      "Grian fears Mumbo would feel betrayed if he learned how long Grian hid his hero identity.",
    emotionalWeight: "high",
    conflict:
      "Mumbo does not know Grian is Astraeus, and Lucid weaponizes that fear in Chapter 5.",
    trust:
      "Strong friendship, threatened by secrecy.",
    notes:
      "The Chapter 5 hallucination should drive future trust-choice design.",
    spoilerLevel: "chapter-5",
  },
  {
    sourceId: "zero",
    targetId: "lucid",
    relationshipType: "villain teammates with private concern",
    firstChapter: 3,
    chapters: [3],
    publicDynamic:
      "Zero is usually associated with Lucid, and Lucid uses Zero's civilian name while checking his injury.",
    privateDynamic:
      "Lucid appears concerned for Zero after Tithonus hurts him, but the full bond is unknown.",
    emotionalWeight: "medium",
    conflict:
      "Zero refuses to fully explain why Tithonus attacked him.",
    trust:
      "Partial trust with guarded secrets.",
    notes:
      "Keep this thread suggestive and source-bound until more chapters explain it.",
    spoilerLevel: "chapter-3",
  },
  {
    sourceId: "zero",
    targetId: "grian",
    relationshipType: "villain and hero with moral debt",
    firstChapter: 3,
    chapters: [3, 4],
    publicDynamic:
      "Zero helps Astraeus escape Tithonus after saying he does not believe the villains' actions were fair.",
    privateDynamic:
      "Grian knows Zero's civilian name but does not want the team to use it against him.",
    emotionalWeight: "medium",
    conflict:
      "Zero still kidnapped Aceso under orders, even though he resisted the attempted killing.",
    trust:
      "Fragile, situational trust.",
    notes:
      "Useful for future mercy/restraint choices.",
    spoilerLevel: "chapter-4",
  },
  {
    sourceId: "solo",
    targetId: "gem",
    relationshipType: "villain healer and hero healer",
    firstChapter: 3,
    chapters: [3],
    publicDynamic:
      "Solo saves Aceso after the villains' attempted killing leaves her dead or nearly dead.",
    privateDynamic:
      "Solo frames his intervention around disapproving of killing Aceso as a fellow healer.",
    emotionalWeight: "high",
    conflict:
      "Solo is still villain-side and does not want the other villains to know he helped.",
    trust:
      "Low trust from the heroes, but his action creates a moral opening.",
    notes:
      "This relationship should support the future villain-side moral-conflict thread.",
    spoilerLevel: "chapter-3",
  },
  {
    sourceId: "cyclone",
    targetId: "tekbox",
    relationshipType: "coercive villain command",
    firstChapter: 5,
    chapters: [5],
    publicDynamic:
      "Cyclone orders Tekbox to burn Astraeus' wings during the headquarters interrogation.",
    privateDynamic:
      "Tekbox appears uncomfortable with the order but follows it.",
    emotionalWeight: "medium",
    conflict:
      "Cyclone's sadism pushes Tekbox past visible hesitation.",
    trust:
      "Command pressure, not clear trust.",
    notes:
      "Use this to avoid flattening the villains into one identical motive.",
    spoilerLevel: "chapter-5",
  },
];

export const CHARACTER_GROUPS = {
  heroes: ["grian", "jimmy", "gem", "pearl", "lizzie"],
  hospital: ["grian", "mumbo"],
  apartment: ["grian", "scar"],
  villains: [
    "tekbox",
    "ethical",
    "moonlight",
    "lucid",
    "tithonus",
    "cyclone",
    "manic",
    "zero",
    "solo",
  ],
  meta: ["theo-innit"],
};

export function getCharacterById(id) {
  return CHARACTERS.find((character) => character.id === id) || null;
}

export function getCharactersForChapter(chapterId) {
  const numericChapterId = Number(chapterId);
  return CHARACTERS.filter((character) =>
    character.chapters.includes(numericChapterId),
  );
}

export function getCharacterRelationship(sourceId, targetId) {
  return (
    CHARACTER_RELATIONSHIPS.find(
      (relationship) =>
        relationship.sourceId === sourceId && relationship.targetId === targetId,
    ) ||
    CHARACTER_RELATIONSHIPS.find(
      (relationship) =>
        relationship.sourceId === targetId && relationship.targetId === sourceId,
    ) ||
    null
  );
}

export function getCharacterRelationshipsForChapter(chapterId) {
  const numericChapterId = Number(chapterId);
  return CHARACTER_RELATIONSHIPS.filter((relationship) =>
    relationship.chapters.includes(numericChapterId),
  );
}
