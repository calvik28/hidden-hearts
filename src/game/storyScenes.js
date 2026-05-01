export const storyStats = {
  trust: {
    label: "Trust",
    description: "How openly Grian lets people care for him.",
    pointEvent:
      "Grian lets someone else matter in the moment, which makes the relationship thread clearer.",
  },
  courage: {
    label: "Courage",
    description: "How firmly Grian steps into danger when people need him.",
    pointEvent:
      "The scene shows why danger keeps pulling Grian forward, even when he is already tired.",
  },
  secrecy: {
    label: "Secrecy",
    description: "How tightly Grian protects Astraeus from his civilian life.",
    pointEvent:
      "The split between Grian and Astraeus gets sharper, and the cost of hiding stays visible.",
  },
  tenderness: {
    label: "Tenderness",
    description: "How much the chapter lets quiet care land.",
    pointEvent:
      "The scene slows down around ordinary care so the friendships and romance have more weight.",
  },
};

export const chapterOneStory = {
  id: 1,
  chapter: "Chapter 1",
  title: "Smoke And Secrets",
  sourceUrl: "https://archiveofourown.org/works/76451261/chapters/200068196",
  logline:
    "Chapter 1 stretches across one long day of danger, healing, home, work, patrol, and a night out while Grian keeps Astraeus hidden.",
  opening:
    "The current playable scope is Chapter 1 only. It is divided into six story parts so the existing game architecture can hold more small moments without rushing toward later chapters.",
  parts: [
    {
      id: "restaurant-crisis",
      label: "Part 1",
      title: "Restaurant Crisis",
      firstSceneId: "restaurant-smoke",
      description: "Public danger forces Grian to think like Astraeus while staying visibly civilian.",
    },
    {
      id: "healed-but-hiding",
      label: "Part 2",
      title: "Healed But Hiding",
      firstSceneId: "apartment-healing",
      description: "Gem and Jimmy help, but the cost of being hurt follows Grian home.",
    },
    {
      id: "roommate-dinner",
      label: "Part 3",
      title: "Roommate Dinner",
      firstSceneId: "key-in-door",
      description: "Scar turns a small dinner into the kind of home Grian is afraid to want.",
    },
    {
      id: "ordinary-day",
      label: "Part 4",
      title: "Ordinary Day",
      firstSceneId: "hero-context",
      description: "Morning texts, hospital work, and hero context show how split Grian's life is.",
    },
    {
      id: "hero-shift",
      label: "Part 5",
      title: "Hero Shift",
      firstSceneId: "post-shift-alert",
      description: "The second job calls before Grian has recovered from the first one.",
    },
    {
      id: "bar-night",
      label: "Part 6",
      title: "Bar Night",
      firstSceneId: "bar-table",
      description: "The chapter closes on friends, teasing, and ordinary intimacy with Scar.",
    },
  ],
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
      inspectables: [
        {
          id: "villain-voices",
          label: "Villain voices",
          text:
            "Tekbox and Ethical's voices cut through the smoke in fragments. Grian files the sound away because later, with the mask on, knowing a voice might matter.",
          setsFlag: "inspected_villain_voices",
        },
      ],
      choices: [
        {
          id: "guide-civilians",
          label: "Watch for civilians first",
          result:
            "Grian keeps his fear practical. Jimmy follows his lead, and they look for a way out that does not draw villain attention.",
          stats: { courage: 1, tenderness: 1 },
          setsFlag: "restaurant_guided_civilians",
        },
        {
          id: "track-villains",
          label: "Track Tekbox and Ethical",
          result:
            "Grian studies the villains instead of the exit. It gives him useful details, but it keeps him too close to danger.",
          stats: { courage: 2, secrecy: 1 },
          setsFlag: "restaurant_tracked_villains",
        },
        {
          id: "stay-civilian",
          label: "Stay visibly civilian",
          result:
            "Grian swallows the instinct to fight. Tonight, protecting his identity also protects the people around him.",
          stats: { secrecy: 2 },
          setsFlag: "restaurant_stayed_civilian",
        },
      ],
    },
    {
      id: "under-the-table",
      location: "Restaurant Floor",
      time: "Evening",
      mood: "Pinned beneath the noise, counting breaths and exits.",
      participants: ["grian", "jimmy", "tekbox", "ethical"],
      title: "Under The Table",
      narration:
        "The robbery stretches. Grian has to stay low, keep Jimmy from doing something heroic, and remember every detail that might matter once the mask can come back on.",
      focus:
        "This beat slows the restaurant scene so the player feels the trapped civilian version of Grian before the aftermath.",
      choices: [
        {
          id: "keep-jimmy-still",
          label: "Keep Jimmy still",
          result:
            "Grian keeps his voice low and steady. Jimmy hates waiting, but he follows the lead because Grian sounds certain.",
          stats: { trust: 1, courage: 1 },
        },
        {
          id: "count-the-exits",
          label: "Count the exits",
          result:
            "The room becomes doors, smoke, tables, bodies. Grian cannot act yet, but he can prepare.",
          stats: { courage: 1, secrecy: 1 },
        },
        {
          id: "listen-for-names",
          label: "Listen for names",
          result:
            "Tekbox and Ethical say enough for Grian to file the voices away. Later, Astraeus will know what Grian pretended not to hear.",
          stats: { secrecy: 2 },
        },
      ],
    },
    {
      id: "smoke-still-there",
      location: "Apartment Floor",
      time: "After The Robbery",
      mood: "The danger is over, but the smoke has followed him home.",
      participants: ["grian", "jimmy", "gem"],
      title: "Smoke In His Nose",
      narration:
        "The restaurant is behind them, but Grian still smells smoke. Everyone got out with minor wounds, and that should be enough. It does not feel like enough.",
      focus:
        "This small beat gives the player time to sit with the aftermath before the scene becomes banter again.",
      callbacks: [
        {
          flag: "restaurant_guided_civilians",
          label: "Earlier choice",
          text:
            "Because Grian watched civilians first, the part that keeps replaying is not the villains. It is Jimmy breathing beside him and the path everyone needed to reach.",
        },
        {
          flag: "restaurant_tracked_villains",
          label: "Earlier choice",
          text:
            "The details he gathered are still useful. Right now, though, every remembered voice makes the apartment feel a little smoky too.",
        },
        {
          flag: "restaurant_stayed_civilian",
          label: "Earlier choice",
          text:
            "Staying visibly civilian protected the secret. It also leaves Grian with the awful feeling of having survived by holding himself still.",
        },
      ],
      choices: [
        {
          id: "name-the-close-call",
          label: "Admit it was close",
          result:
            "Grian lets the room get quiet for a second. Jimmy does not joke right away, and Gem keeps healing.",
          stats: { trust: 1, tenderness: 1 },
        },
        {
          id: "make-it-a-joke",
          label: "Make it sound smaller",
          result:
            "Grian folds the fear down into humor. It works because everyone in the room knows exactly what he is doing.",
          stats: { secrecy: 1, tenderness: 1 },
        },
        {
          id: "check-on-jimmy",
          label: "Check Jimmy too",
          result:
            "Jimmy complains, naturally, but the question matters. Grian is not the only one who had to sit and watch.",
          stats: { trust: 1, courage: 1 },
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
          setsFlag: "gem_thanked_properly",
        },
        {
          id: "deflect-with-jimmy",
          label: "Deflect toward Jimmy",
          result:
            "The teasing lands where it always does: on both avians sharing one terrible survival plan.",
          stats: { secrecy: 1, tenderness: 1 },
          setsFlag: "care_deflected_with_jimmy",
        },
        {
          id: "ask-about-pearl",
          label: "Ask about Pearl",
          result:
            "Gem brightens at the mention of movie night. The hero world softens for a moment into ordinary friendship.",
          stats: { tenderness: 2 },
          setsFlag: "asked_gem_about_pearl",
        },
      ],
    },
    {
      id: "before-they-go",
      location: "Apartment Floor",
      time: "Later",
      mood: "The room is safer now, which somehow makes the pain easier to notice.",
      participants: ["grian", "jimmy", "gem"],
      title: "Before They Go",
      narration:
        "Gem's healing settles into a dull ache. Jimmy keeps hovering, Gem keeps watching him like she knows he will minimize it, and Grian starts thinking about how normal the apartment needs to look before Scar gets home.",
      focus:
        "This beat lets care linger instead of jumping straight from injury to dinner. Grian is helped, but he is already preparing to hide the proof.",
      callbacks: [
        {
          flag: "gem_thanked_properly",
          label: "Care carried forward",
          text:
            "Gem's worry sits softer after the thank-you. She checks the burn like a friend, not like someone Grian has to defend himself from.",
        },
        {
          flag: "care_deflected_with_jimmy",
          label: "Care carried forward",
          text:
            "Because Grian pushed the room back toward banter, Jimmy fills the quiet first. It helps, and it keeps everyone from looking too closely.",
        },
        {
          flag: "asked_gem_about_pearl",
          label: "Care carried forward",
          text:
            "Mentioning Pearl leaves a warmer thread in the room, proof that the hero world is not only alarms, injuries, and secrets.",
        },
      ],
      choices: [
        {
          id: "let-gem-check-once-more",
          label: "Let Gem check once more",
          result:
            "Grian does not make her ask twice. Gem's worry eases by a fraction, and the room gets quieter around that trust.",
          stats: { trust: 1, tenderness: 2 },
          setsFlag: "gem_checked_once_more",
        },
        {
          id: "tell-jimmy-to-stop-hovering",
          label: "Tell Jimmy to stop hovering",
          result:
            "It comes out sharper than Grian means. Jimmy hears the affection under it anyway, because this is how they survive each other.",
          stats: { tenderness: 1, secrecy: 1 },
          setsFlag: "jimmy_told_to_stop_hovering",
        },
        {
          id: "start-hiding-the-evidence",
          label: "Start hiding evidence",
          result:
            "The medical supplies, the mask, the ruined clothes. Grian turns care into cleanup before Scar can see the shape of the night.",
          stats: { secrecy: 2 },
          setsFlag: "hero_evidence_hidden",
        },
      ],
    },
    {
      id: "waiting-for-scar",
      location: "Small Kitchen",
      time: "Before Scar Gets Home",
      mood: "Too quiet, too normal, and somehow scarier than patrol.",
      participants: ["grian", "scar"],
      title: "A Rare Attempt At Dinner",
      narration:
        "Gem and Jimmy leave, and the apartment settles. Grian has time to notice the ache in his leg, the quiet around him, and the fact that Scar will be home soon.",
      focus:
        "The chapter needs little domestic pauses so Scar feels like part of Grian's daily life, not just the romance destination.",
      choices: [
        {
          id: "make-pasta",
          label: "Make the pasta anyway",
          result:
            "Grian commits to the one dish he can manage. It is not elegant, but it is effort, and effort has to count for something.",
          stats: { tenderness: 2 },
          setsFlag: "pasta_made_anyway",
        },
        {
          id: "hide-hero-things",
          label: "Hide the hero things",
          result:
            "Mask, glasses, jacket, bow. Grian makes the room safe for Scar by making part of himself disappear.",
          stats: { secrecy: 2 },
          setsFlag: "hero_things_hidden_before_scar",
        },
        {
          id: "let-the-room-soften",
          label: "Let the room soften",
          result:
            "For once, Grian does not run toward the next crisis. He sets the table and lets himself want Scar to smile.",
          stats: { tenderness: 1, trust: 1 },
          setsFlag: "room_softened_for_scar",
        },
      ],
    },
    {
      id: "key-in-door",
      location: "Apartment Entry",
      time: "Night",
      mood: "A key turns, and the whole apartment changes temperature.",
      participants: ["grian", "scar"],
      title: "Key In The Door",
      narration:
        "Scar gets home from Clockers Cafe, tired and bright at the same time. Grian has a second to decide what version of the evening Scar is allowed to walk into.",
      focus:
        "This gives Scar's arrival its own moment. The romance works better when home visibly changes around him.",
      dialogue: [
        {
          speakerId: "scar",
          line: "I'm home. Please tell me the apartment still exists and you didn't fight the stove.",
        },
        {
          speakerId: "grian",
          line: "The stove and I have reached a very fragile agreement.",
        },
        {
          speakerId: "scar",
          line: "That sounds like dinner and a warning label.",
        },
      ],
      choices: [
        {
          id: "call-from-the-kitchen",
          label: "Call from the kitchen",
          result:
            "Grian makes the apartment sound casual before Scar can worry. The dinner is small, but the welcome is real.",
          stats: { tenderness: 2 },
        },
        {
          id: "stand-too-quickly",
          label: "Stand too quickly",
          result:
            "The healed burn protests. Grian hides it under movement, but the stumble still tells the room something happened.",
          stats: { secrecy: 1, trust: 1 },
        },
        {
          id: "let-scar-talk-first",
          label: "Let Scar talk first",
          result:
            "Scar fills the doorway with cafe stories and warmth. Grian lets the sound of him be the first normal thing all night.",
          stats: { trust: 1, tenderness: 1 },
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
          setsFlag: "scar_saw_dinner_effort",
        },
        {
          id: "tease-back",
          label: "Tease Scar back",
          result:
            "The room settles into their usual rhythm: too much sarcasm for strangers, exactly enough warmth for them.",
          stats: { tenderness: 1 },
          setsFlag: "scar_teased_back_at_dinner",
        },
        {
          id: "hide-the-burn",
          label: "Keep the injury out of sight",
          result:
            "Grian protects the secret by making the evening look normal. It works, but only because Scar does not know what to ask yet.",
          stats: { secrecy: 2 },
          setsFlag: "burn_hidden_from_scar",
        },
      ],
    },
    {
      id: "night-thoughts",
      location: "Grian's Room",
      time: "Late Night",
      mood: "Old feelings, old friends, and a secret life folded under the bed.",
      participants: ["grian", "scar", "mumbo", "jimmy", "gem", "pearl", "lizzie"],
      title: "What He Does Not Say",
      narration:
        "After dinner, the apartment goes quiet. Grian thinks about high school, Scar, medical school, Mumbo, the hero committee, and how many people still do not know who Astraeus is.",
      focus:
        "This replaces a fast lore dump with a reflective character beat: the secret matters because the people around Grian matter.",
      choices: [
        {
          id: "think-of-scar",
          label: "Think of Scar first",
          result:
            "The feeling is old enough to be familiar and sharp enough to hurt. Grian still tells himself Scar probably does not feel the same.",
          stats: { tenderness: 2, secrecy: 1 },
        },
        {
          id: "think-of-mumbo",
          label: "Think of Mumbo too",
          result:
            "Mumbo knows the hospital version of him. Grian wonders, quietly, what would happen if that version cracked open.",
          stats: { trust: 1, secrecy: 1 },
        },
        {
          id: "think-of-committee",
          label: "Think of the committee",
          result:
            "Posters, powers, patrol routes. The hero committee started as a way to help, and somehow became a whole second life.",
          stats: { courage: 1, secrecy: 1 },
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
      id: "morning-group-chat",
      location: "Grian's Bed",
      time: "Morning",
      mood: "Unread texts, tea from Scar, and a normal plan for once.",
      participants: ["grian", "scar", "jimmy", "gem", "pearl", "lizzie"],
      title: "The Group Chat",
      narration:
        "Grian wakes to Scar's text and the friend group's plan to meet at the bar. For a moment, the day looks like work, tea, and something to look forward to.",
      focus:
        "This small scene gives the wider friend group a social rhythm before they appear as heroes or bar-table names.",
      choices: [
        {
          id: "answer-with-scar",
          label: "Say yes for him and Scar",
          result:
            "Grian sends the answer before overthinking it. Scar wanted to go too, and that makes the morning easier.",
          stats: { tenderness: 1, trust: 1 },
        },
        {
          id: "notice-scar-tea",
          label: "Take the tea Scar made",
          result:
            "It is such a small thing, and somehow that is exactly why it lands. Scar has already been there before the day begins.",
          stats: { tenderness: 2 },
        },
        {
          id: "brace-for-shift",
          label: "Brace for the shift",
          result:
            "The hospital is waiting. Grian puts the softness away, but not all the way.",
          stats: { courage: 1, secrecy: 1 },
        },
      ],
    },
    {
      id: "hospital-locker-room",
      location: "Hospital Locker Room",
      time: "Before Shift",
      mood: "Scrubs, fluorescent light, and Mumbo making the day less heavy.",
      participants: ["grian", "mumbo"],
      title: "Nine Hours Waiting",
      narration:
        "At the hospital, Grian meets Mumbo in the locker room. They trade tired greetings, shift complaints, and the familiar weird comfort of ER work.",
      focus:
        "Mumbo needs space in Chapter 1 because his friendship becomes a major secret-identity pressure later.",
      choices: [
        {
          id: "joke-with-mumbo",
          label: "Match Mumbo's energy",
          result:
            "The locker room becomes easier to breathe in. Mumbo has a way of making long shifts feel briefly survivable.",
          stats: { trust: 1, tenderness: 1 },
        },
        {
          id: "keep-it-professional",
          label: "Focus on the shift",
          result:
            "Grian keeps the morning clipped and practical. Nine hours is still nine hours, even with friends nearby.",
          stats: { courage: 1 },
        },
        {
          id: "hide-the-burn-ache",
          label: "Hide the leftover ache",
          result:
            "Mumbo knows Grian well enough to notice tiredness, so Grian makes sure tiredness is all there is to see.",
          stats: { secrecy: 2 },
        },
      ],
    },
    {
      id: "post-shift-alert",
      location: "Apartment Couch",
      time: "After Work",
      mood: "Exhaustion interrupted by a city-wide warning.",
      participants: ["grian", "scar", "jimmy"],
      title: "The Alert",
      narration:
        "Grian gets home exhausted, ready for a movie and food. Then the alert hits: villain activity in central city. He has just finished one job, and the other is already calling.",
      focus:
        "This beat is the hinge between nurse-Grian and Astraeus. The player should feel how little rest he gets.",
      choices: [
        {
          id: "call-jimmy",
          label: "Call Jimmy first",
          result:
            "The missing alert makes the danger feel wrong. Grian starts moving, but he makes sure the team knows.",
          stats: { trust: 1, courage: 1 },
        },
        {
          id: "change-fast",
          label: "Change immediately",
          result:
            "There is no graceful transition from couch to mask. There is only the practiced rush of becoming Astraeus.",
          stats: { courage: 2 },
        },
        {
          id: "check-the-window",
          label: "Check that Scar is gone",
          result:
            "The window route stays secret. Grian keeps the apartment split into the life Scar knows and the life he does not.",
          stats: { secrecy: 2 },
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
      id: "after-patrol",
      location: "Quiet Street",
      time: "After The Retreat",
      mood: "Green sparks, sore backs, and not chasing danger just because it runs.",
      participants: ["grian", "gem", "pearl", "lizzie", "jimmy"],
      title: "Good As New",
      narration:
        "The villains retreat. Phera is hurt, Aceso heals her, and Grian watches the green sparks stitch the wound closed while the team decides not to chase.",
      focus:
        "The aftermath matters because the team is choosing care and restraint, not just victory.",
      choices: [
        {
          id: "stay-with-phera",
          label: "Stay near Phera",
          result:
            "Grian keeps close while Aceso works. It is not dramatic, but it tells the team he is watching them too.",
          stats: { trust: 1, tenderness: 1 },
        },
        {
          id: "respect-dawn-call",
          label: "Respect Dawnstar's call",
          result:
            "Pearl says not to chase. Grian listens, because getting home alive is also part of the job.",
          stats: { trust: 1, courage: 1 },
        },
        {
          id: "study-gem-healing",
          label: "Watch Gem heal",
          result:
            "The green sparks are mesmerizing. Grian wonders, not for the first time, how people discover powers they were not born with.",
          stats: { tenderness: 1, secrecy: 1 },
        },
      ],
    },
    {
      id: "bar-table",
      location: "The Bar",
      time: "9 PM",
      mood: "Friends at one table, one missing Tango, and Grian losing every round.",
      participants: ["grian", "scar", "jimmy", "gem", "pearl", "lizzie"],
      title: "Heads Up",
      narration:
        "The friend group finally gets a normal night. They talk, play, drink, tease, and Grian loses enough rounds that the walk home is already becoming a problem.",
      focus:
        "Letting the group be silly matters. The hero story needs ordinary friendship to give the danger a reason to hurt.",
      choices: [
        {
          id: "sit-near-scar",
          label: "Sit near Scar",
          result:
            "Grian tells himself it is just where the seats worked out. The game records that as a lie with excellent posture.",
          stats: { tenderness: 2, secrecy: 1 },
        },
        {
          id: "play-anyway",
          label: "Play anyway",
          result:
            "Grian is terrible at the game. He plays anyway, because everyone is laughing and the night is finally normal.",
          stats: { trust: 1, tenderness: 1 },
        },
        {
          id: "watch-the-room",
          label: "Watch the room",
          result:
            "Even off duty, some part of Grian keeps checking exits. It is hard to stop being Astraeus once the mask is off.",
          stats: { secrecy: 1, courage: 1 },
        },
      ],
    },
    {
      id: "one-more-round",
      location: "The Bar Table",
      time: "Late Night",
      mood: "Too much laughter, not enough balance, and Scar staying close.",
      participants: ["grian", "scar", "jimmy", "gem", "pearl", "lizzie"],
      title: "One More Round",
      narration:
        "The game keeps going. Grian keeps losing. The table gets louder around him, and the line between normal night and too-much night starts getting blurry.",
      focus:
        "This gives the bar scene another step before the walk home so the ending earns its softness.",
      choices: [
        {
          id: "laugh-at-himself",
          label: "Laugh at himself",
          result:
            "Grian lets himself be terrible at something with no stakes. The table loves him for it, which is its own kind of safety.",
          stats: { trust: 1, tenderness: 1 },
        },
        {
          id: "lean-toward-scar",
          label: "Lean toward Scar",
          result:
            "It is probably the drinks. It is definitely not only the drinks. Scar stays steady beside him.",
          stats: { tenderness: 2, secrecy: 1 },
        },
        {
          id: "watch-everyone-smile",
          label: "Watch everyone smile",
          result:
            "For once, everyone is at one table and nobody needs saving. Grian notices because he knows how rare that is.",
          stats: { tenderness: 1, courage: 1 },
        },
      ],
    },
    {
      id: "walk-home",
      location: "Sidewalk Home",
      time: "Late Night",
      mood: "Cold air, slow steps, and Scar's arm steadying him.",
      participants: ["grian", "scar"],
      title: "Carry Me?",
      narration:
        "Grian and Scar leave the bar together. The apartment is not far, but Grian is cold, tired, and drunk enough to ask for what he wants without meaning to be honest.",
      focus:
        "Chapter 1 should close with ordinary intimacy. Scar feels like home before the story has language for what that means.",
      callbacks: [
        {
          flag: "scar_saw_dinner_effort",
          label: "Dinner echo",
          text:
            "The dinner comes back in miniature: Scar saw the effort at the table, and now Grian lets him see the need too.",
        },
        {
          flag: "scar_teased_back_at_dinner",
          label: "Dinner echo",
          text:
            "Their dinner rhythm follows them into the cold. Grian can hide inside teasing for one more block, but Scar hears the warmth under it.",
        },
        {
          flag: "burn_hidden_from_scar",
          label: "Dinner echo",
          text:
            "The injury he kept out of sight all evening makes every careful step feel louder now.",
        },
      ],
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
    flags: {},
    complete: false,
  };
}
