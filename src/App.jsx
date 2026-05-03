import { useEffect, useMemo, useState } from "react";
import BookOpen from "lucide-react/dist/esm/icons/book-open.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.js";
import Home from "lucide-react/dist/esm/icons/house.js";
import Lock from "lucide-react/dist/esm/icons/lock.js";
import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw.js";
import Search from "lucide-react/dist/esm/icons/search.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import Shield from "lucide-react/dist/esm/icons/shield.js";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Star from "lucide-react/dist/esm/icons/star.js";
import UserRound from "lucide-react/dist/esm/icons/user-round.js";
import { getCharacterById } from "./game/characters.js";
import { generatedAssets } from "./game/generatedAssets.js";
import { ao3Links, vaultQuestions } from "./game/levels.js";
import {
  chapterOneStory,
  createStoryProgress,
  storyStats,
} from "./game/storyScenes.js";

const STORAGE_KEY = "hidden-hearts-progress";
const VAULT_KEY = "hidden-hearts-vault-open";
const FEEDBACK_KEY = "hidden-hearts-feedback";
const REPO_ISSUE_URL = "https://github.com/calvik28/hidden-hearts/issues/new";
const STAT_PAIR_COPY = {
  "tenderness-trust": {
    label: "Trust + Tenderness",
    text:
      "This run lets Chapter 1 lean into care: Grian survives the danger by noticing who stays close, and the softer scenes carry the ending home.",
  },
  "courage-secrecy": {
    label: "Courage + Secrecy",
    text:
      "This run keeps the split life sharp. Grian moves toward danger when people need him, but every brave step asks him to hide more carefully.",
  },
  "courage-trust": {
    label: "Courage + Trust",
    text:
      "This run frames Chapter 1 around team pressure: Grian acts when the city calls, and the people beside him matter as much as the rescue.",
  },
  "secrecy-tenderness": {
    label: "Secrecy + Tenderness",
    text:
      "This run keeps the ache close to home. Grian wants ordinary warmth, but the secret identity keeps shaping what he can safely show.",
  },
  "secrecy-trust": {
    label: "Trust + Secrecy",
    text:
      "This run keeps care and concealment in tension. Grian lets people steady him in small ways while still protecting the truth of Astraeus.",
  },
  "courage-tenderness": {
    label: "Courage + Tenderness",
    text:
      "This run lets action and softness answer each other. The city needs Grian brave, and the quiet scenes show why that bravery costs him.",
  },
};
const STAT_PAIR_ORDER = ["trust", "courage", "secrecy", "tenderness"];
const CAST_NOTE_FALLBACKS = {
  grian: "You choose how Grian carries this beat.",
  scar: "Home life enters the scene through Scar.",
  jimmy: "Jimmy keeps the moment close to friendship and alarm.",
  gem: "Gem brings care, healing, and direct concern into the room.",
  pearl: "Pearl steadies the team side of the chapter.",
  lizzie: "Lizzie keeps the group practical and present.",
  mumbo: "Mumbo belongs to Grian's hospital day.",
  tekbox: "Tekbox is one of the named restaurant threats.",
  ethical: "Ethical is one of the named restaurant threats.",
  tithonus: "Tithonus is part of the active street danger.",
};
const CAST_ROLE_FALLBACKS = {
  grian: "Player character",
  scar: "Roommate",
  jimmy: "Friend",
  gem: "Friend and healer",
  pearl: "Hero teammate",
  lizzie: "Hero teammate",
  mumbo: "Hospital coworker",
  tekbox: "Villain",
  ethical: "Villain",
  tithonus: "Villain",
};
const SCENE_CAST_NOTES = {
  "restaurant-smoke": {
    grian: "Thinking like a hero while staying visibly civilian.",
    jimmy: "Caught beside Grian as the restaurant turns dangerous.",
    tekbox: "One of the named threats forcing the crisis.",
    ethical: "One of the named threats forcing the crisis.",
  },
  "under-the-table": {
    grian: "Keeping low, counting exits, and trying not to reveal too much.",
    jimmy: "Close enough for Grian to steady without making a scene.",
    tekbox: "A voice and threat Grian has to track from hiding.",
    ethical: "A second pressure in the room while everyone stays down.",
  },
  "smoke-still-there": {
    grian: "Still carrying the restaurant smoke after everyone gets out.",
    jimmy: "Safe now, but still close enough for Grian to check on.",
    gem: "Healing the injury while watching what Grian tries to minimize.",
  },
  "apartment-healing": {
    grian: "Hurt, embarrassed, and trying to stay easy to joke with.",
    jimmy: "Hovering because the joke stopped being funny at the restaurant.",
    gem: "Doing the healing and noticing what it costs.",
  },
  "before-they-go": {
    grian: "Helped by friends, already preparing to hide the proof.",
    jimmy: "Hovering with affection tucked under familiar teasing.",
    gem: "Watching the healed wound and the guilt around it.",
  },
  "waiting-for-scar": {
    grian: "Alone with the apartment, the ache, and the dinner plan.",
    scar: "Not home yet, but already shaping what Grian prepares for.",
  },
  "key-in-door": {
    grian: "Choosing what version of the night Scar gets to enter.",
    scar: "Bringing the apartment back toward warmth after work.",
  },
  "pasta-dinner": {
    grian: "Letting a small dinner carry more feeling than he says.",
    scar: "Turning plain pasta into home by being there.",
  },
  "night-thoughts": {
    grian: "Sorting the people he cares about from behind a closed door.",
    scar: "Part of the feeling Grian is not ready to say cleanly.",
    mumbo: "Part of Grian's ordinary life outside the apartment.",
    jimmy: "One of the old bonds tied to Grian's hidden life.",
    gem: "A friend whose care still lingers after the injury.",
    pearl: "Part of the wider friend circle in Grian's thoughts.",
    lizzie: "Part of the wider friend circle in Grian's thoughts.",
  },
  "hero-context": {
    grian: "Remembering why the hidden work started.",
    jimmy: "One of the friends tied to that hidden work.",
    gem: "One of the friends who keeps the team standing.",
    pearl: "A steady presence in the hero circle.",
    lizzie: "A practical presence in the hero circle.",
    mumbo: "A hospital friend in the life Grian keeps separate.",
    scar: "A home friend in the life Grian keeps separate.",
  },
  "morning-group-chat": {
    grian: "Trying to let the morning be normal before work.",
    scar: "Present through small care before the day starts.",
    jimmy: "Part of the group plan waiting after work.",
    gem: "Part of the group plan waiting after work.",
    pearl: "Part of the group plan waiting after work.",
    lizzie: "Part of the group plan waiting after work.",
  },
  "hospital-locker-room": {
    grian: "Switching into the workday version of himself.",
    mumbo: "Making the hospital day feel less heavy.",
  },
  "post-shift-alert": {
    grian: "Exhausted, home, and being pulled toward danger again.",
    scar: "Part of the quiet evening Grian has to leave behind.",
    jimmy: "The first call when the alert feels wrong.",
  },
  "city-patrol": {
    grian: "Back in the mask and watching what the team needs first.",
    jimmy: "Fighting beside Grian as Acanthus.",
    gem: "Keeping the team alive as Aceso.",
    pearl: "Helping hold the line as Dawnstar.",
    lizzie: "Helping hold the line as Phera.",
    tekbox: "A returning threat from the restaurant crisis.",
    ethical: "A returning threat from the restaurant crisis.",
    tithonus: "Another threat in the street fight.",
  },
  "after-patrol": {
    grian: "Choosing restraint after the danger breaks.",
    gem: "Aceso healing before anyone can pretend the fight was clean.",
    pearl: "Dawnstar calling the team back from chasing too far.",
    lizzie: "Part of the team regrouping after the retreat.",
    jimmy: "Acanthus regrouping after the retreat.",
  },
  "bar-table": {
    grian: "Trying to be off duty at a table full of friends.",
    scar: "Close enough for the night to feel warmer.",
    jimmy: "Friend-table noise, teasing, and familiarity.",
    gem: "Friend-table warmth after a long chapter day.",
    pearl: "Friend-table warmth after a long chapter day.",
    lizzie: "Friend-table warmth after a long chapter day.",
  },
  "one-more-round": {
    grian: "Losing the game and letting the night blur softer.",
    scar: "Staying steady beside Grian.",
    jimmy: "Part of the laughter around the table.",
    gem: "Part of the laughter around the table.",
    pearl: "Part of the laughter around the table.",
    lizzie: "Part of the laughter around the table.",
  },
  "walk-home": {
    grian: "Cold, tired, and closer to honesty than he means to be.",
    scar: "Steadying Grian through the chapter's soft landing.",
  },
};

function createProgress() {
  return {
    completed: [],
    highestChapter: 1,
    hearts: 0,
    courage: 0,
    storyRuns: {
      [chapterOneStory.id]: createStoryProgress(),
    },
  };
}

function safeReadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function safeWriteJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
  return true;
}

function normalizeStoryFlags(flags) {
  if (Array.isArray(flags)) {
    return Object.fromEntries(flags.filter((flag) => typeof flag === "string" && flag).map((flag) => [flag, true]));
  }

  if (!flags || typeof flags !== "object") return {};

  return Object.fromEntries(
    Object.entries(flags).filter(([flag, value]) => typeof flag === "string" && flag && Boolean(value)),
  );
}

function normalizeStoryStats(stats = {}) {
  return Object.fromEntries(
    Object.keys(storyStats).map((key) => {
      const value = Number(stats?.[key]);
      return [key, Number.isFinite(value) ? value : 0];
    }),
  );
}

function normalizeChoiceLog(choices = []) {
  if (!Array.isArray(choices)) return [];

  return choices
    .filter((choice) => choice && typeof choice === "object" && typeof choice.sceneId === "string")
    .map((choice) => ({
      sceneId: choice.sceneId,
      sceneTitle: typeof choice.sceneTitle === "string" ? choice.sceneTitle : "Unknown scene",
      choiceId: typeof choice.choiceId === "string" ? choice.choiceId : "unknown-choice",
      label: typeof choice.label === "string" ? choice.label : "Choice",
      ...(Array.isArray(choice.flags) && choice.flags.length > 0 ? { flags: choice.flags } : {}),
    }));
}

function normalizeStoryProgress(storyProgress) {
  const base = createStoryProgress();
  if (!storyProgress || typeof storyProgress !== "object") return base;

  const rawSceneIndex = Number(storyProgress.sceneIndex);
  const maxSceneIndex = Math.max(0, chapterOneStory.scenes.length - 1);

  return {
    ...base,
    sceneIndex: Number.isInteger(rawSceneIndex)
      ? Math.max(0, Math.min(rawSceneIndex, maxSceneIndex))
      : base.sceneIndex,
    choices: normalizeChoiceLog(storyProgress.choices),
    stats: normalizeStoryStats(storyProgress.stats),
    flags: normalizeStoryFlags(storyProgress.flags),
    complete: Boolean(storyProgress.complete),
  };
}

function normalizeStoryRuns(storyRuns) {
  const savedRuns = storyRuns && typeof storyRuns === "object" && !Array.isArray(storyRuns) ? storyRuns : {};

  return {
    ...savedRuns,
    [chapterOneStory.id]: normalizeStoryProgress(savedRuns[chapterOneStory.id]),
  };
}

function getStoredStoryProgress(progress) {
  return normalizeStoryProgress(progress?.storyRuns?.[chapterOneStory.id]);
}

function withStoredStoryProgress(progress, storyProgress) {
  return {
    ...progress,
    storyRuns: {
      ...(progress.storyRuns ?? {}),
      [chapterOneStory.id]: normalizeStoryProgress(storyProgress),
    },
  };
}

function readProgress() {
  const parsed = safeReadJson(STORAGE_KEY, null);
  if (parsed && Array.isArray(parsed.completed)) {
    const merged = { ...createProgress(), ...parsed };
    return { ...merged, storyRuns: normalizeStoryRuns(merged.storyRuns) };
  }
  return createProgress();
}

function readVaultOpen() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("resume") !== "story") return false;
  } catch {
    return false;
  }

  try {
    return localStorage.getItem(VAULT_KEY) === "true";
  } catch {
    return false;
  }
}

function writeVaultOpen() {
  try {
    localStorage.setItem(VAULT_KEY, "true");
  } catch {
    return;
  }
}

function updateResumeUrl(shouldResume) {
  try {
    const nextUrl = new URL(window.location.href);
    if (shouldResume) {
      nextUrl.searchParams.set("resume", "story");
    } else {
      nextUrl.searchParams.delete("resume");
    }
    window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  } catch {
    return;
  }
}

function shuffleVaultOptions(question) {
  const options = [...question.options];
  for (let index = options.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }
  if (options.length > 1 && options[0] === question.answer) {
    const swapIndex = 1 + Math.floor(Math.random() * (options.length - 1));
    [options[0], options[swapIndex]] = [options[swapIndex], options[0]];
  }
  return options;
}

function createVaultOptionOrder() {
  return vaultQuestions.map((question) => ({
    options: shuffleVaultOptions(question),
  }));
}

function readFeedback() {
  const parsed = safeReadJson(FEEDBACK_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

function applyChoiceStats(currentStats, choiceStats = {}) {
  const next = { ...currentStats };
  for (const [key, value] of Object.entries(choiceStats)) {
    next[key] = (next[key] ?? 0) + value;
  }
  return next;
}

function getChoiceFlagList(setsFlag) {
  if (!setsFlag) return [];
  if (Array.isArray(setsFlag)) return setsFlag.filter((flag) => typeof flag === "string" && flag);
  return typeof setsFlag === "string" && setsFlag ? [setsFlag] : [];
}

function applyChoiceFlags(currentFlags = {}, setsFlag) {
  const next = normalizeStoryFlags(currentFlags);
  for (const flag of getChoiceFlagList(setsFlag)) {
    next[flag] = true;
  }
  return next;
}

function getPointEvents(stats = {}) {
  return Object.entries(stats)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => {
      const stat = storyStats[key] ?? {};
      const amount = value > 0 ? `+${value}` : `${value}`;
      return {
        key,
        amount,
        label: stat.label ?? key,
        note: stat.pointEvent ?? stat.description ?? "This choice changes how the chapter reads.",
      };
    });
}

function getPendingResultFromStory(storyProgress, scene) {
  if (storyProgress.complete) return null;
  const lastChoice = storyProgress.choices.at(-1);
  if (!lastChoice || lastChoice.sceneId !== scene.id) return null;

  const choice = scene.choices.find((candidate) => candidate.id === lastChoice.choiceId);
  if (!choice) return null;

  return {
    sceneTitle: scene.title,
    label: lastChoice.label || choice.label,
    result: choice.result,
    stats: choice.stats ?? {},
  };
}

function getSceneCallback(scene, flags = {}) {
  if (!Array.isArray(scene.callbacks)) return null;
  return scene.callbacks.find((callback) => flags?.[callback.flag]) ?? null;
}

function getSceneCastNote(scene, character) {
  return (
    SCENE_CAST_NOTES[scene.id]?.[character.id]
    ?? CAST_NOTE_FALLBACKS[character.id]
    ?? `Present in ${scene.title}.`
  );
}

function getSceneCastRole(character) {
  return CAST_ROLE_FALLBACKS[character.id] ?? "Present";
}

function getSceneInspectables(scene) {
  return Array.isArray(scene.inspectables) ? scene.inspectables : [];
}

function isDetailInspected(detail, flags = {}) {
  return Boolean(detail.setsFlag && flags?.[detail.setsFlag]);
}

function getChapterOnePartIndex(sceneIndex) {
  const parts = chapterOneStory.parts ?? [];
  if (parts.length === 0) return 0;
  const safeSceneIndex = Math.max(0, Math.min(sceneIndex, chapterOneStory.scenes.length - 1));
  let activePartIndex = 0;

  parts.forEach((part, index) => {
    const firstSceneIndex = chapterOneStory.scenes.findIndex((scene) => scene.id === part.firstSceneId);
    if (firstSceneIndex !== -1 && firstSceneIndex <= safeSceneIndex) {
      activePartIndex = index;
    }
  });

  return activePartIndex;
}

function getTopStatEntries(stats) {
  return Object.entries(stats)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return STAT_PAIR_ORDER.indexOf(a[0]) - STAT_PAIR_ORDER.indexOf(b[0]);
    })
    .slice(0, 2);
}

function getCompletionPath(story) {
  const topEntries = getTopStatEntries(story.stats);
  if (topEntries.length === 0 || topEntries.every(([, value]) => value === 0)) {
    return {
      label: "Unformed",
      text:
        "This run has not settled into an emotional path yet. Replay Chapter 1 to let the choices leave a clearer shape.",
    };
  }

  const orderedLabels = topEntries.map(([key]) => storyStats[key]?.label ?? key).join(" + ");
  const pairKey = topEntries.map(([key]) => key).sort().join("-");
  const copy = STAT_PAIR_COPY[pairKey];

  return {
    label: orderedLabels,
    text:
      copy?.text
      ?? "This run gives Chapter 1 a mixed emotional shape, with Grian pulled between care, danger, secrecy, and trust.",
  };
}

function buildFeedbackBody(feedback) {
  return [
    "## In-game suggestion",
    "",
    `Scene: ${feedback.sceneTitle}`,
    `Type: ${feedback.type}`,
    `From: ${feedback.name || "Player"}`,
    "",
    "## Note",
    feedback.message,
    "",
    "## Prototype state",
    `Choice path: ${feedback.choicePath || "No choices recorded yet"}`,
    `Stats: ${feedback.statsSummary}`,
  ].join("\n");
}

export default function App() {
  const [progress, setProgress] = useState(readProgress);
  const [vaultOpen, setVaultOpen] = useState(readVaultOpen);
  const [story, setStory] = useState(() => getStoredStoryProgress(readProgress()));
  const [pendingResult, setPendingResult] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const scene = chapterOneStory.scenes[story.sceneIndex] ?? chapterOneStory.scenes[0];
  const pendingResultForScene = pendingResult ?? getPendingResultFromStory(story, scene);
  const completedChapter = progress.completed.includes(chapterOneStory.id);
  const activePartIndex = getChapterOnePartIndex(story.sceneIndex);
  const shellStyle = useMemo(
    () => ({
      "--vault-bg-image": `url("${generatedAssets.ui.titleEntranceBackground}")`,
      "--vault-door-image": `url("${generatedAssets.ui.vaultDoorTexture}")`,
    }),
    [],
  );

  useEffect(() => {
    safeWriteJson(STORAGE_KEY, progress);
  }, [progress]);

  useEffect(() => {
    setProgress((current) => withStoredStoryProgress(current, story));
  }, [story]);

  const unlockVault = () => {
    writeVaultOpen();
    updateResumeUrl(true);
    setVaultOpen(true);
  };

  const chooseOption = (choice) => {
    if (pendingResultForScene || story.complete) return;
    const flags = getChoiceFlagList(choice.setsFlag);
    setStory((current) => ({
      ...current,
      stats: applyChoiceStats(current.stats, choice.stats),
      flags: applyChoiceFlags(current.flags, choice.setsFlag),
      choices: [
        ...current.choices,
        {
          sceneId: scene.id,
          sceneTitle: scene.title,
          choiceId: choice.id,
          label: choice.label,
          ...(flags.length > 0 ? { flags } : {}),
        },
      ],
    }));
    setPendingResult({
      sceneTitle: scene.title,
      label: choice.label,
      result: choice.result,
      stats: choice.stats ?? {},
    });
  };

  const inspectDetail = (detail) => {
    if (pendingResultForScene || story.complete || !detail.setsFlag) return;
    setStory((current) => ({
      ...current,
      flags: applyChoiceFlags(current.flags, detail.setsFlag),
    }));
  };

  const continueStory = () => {
    if (story.sceneIndex >= chapterOneStory.scenes.length - 1) {
      setPendingResult(null);
      setStory((current) => ({ ...current, complete: true }));
      setProgress((current) => {
        const completed = new Set(current.completed);
        const wasComplete = completed.has(chapterOneStory.id);
        completed.add(chapterOneStory.id);
        return {
          ...current,
          completed: [...completed].sort((a, b) => a - b),
          highestChapter: Math.max(current.highestChapter, chapterOneStory.id),
          hearts: wasComplete ? current.hearts : current.hearts + 1,
          courage: wasComplete ? current.courage : current.courage + 12,
        };
      });
      return;
    }
    setPendingResult(null);
    setStory((current) => ({
      ...current,
      sceneIndex: current.sceneIndex + 1,
    }));
  };

  const resetStory = () => {
    setStory(createStoryProgress());
    setPendingResult(null);
  };

  const returnToVault = () => {
    setVaultOpen(false);
    updateResumeUrl(false);
    try {
      localStorage.removeItem(VAULT_KEY);
    } catch {
      return;
    }
  };

  const shareGame = async () => {
    const payload = {
      title: "Hidden Hearts RPG",
      text: "I played the Hidden Hearts Chapter 1 story path.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setShareStatus("Shared.");
      } else {
        await navigator.clipboard.writeText(payload.url);
        setShareStatus("Link copied.");
      }
    } catch {
      setShareStatus("Share canceled.");
    }
    window.setTimeout(() => setShareStatus(""), 2400);
  };

  if (!vaultOpen) {
    return (
      <VaultEntrance
        assetStyle={shellStyle}
        onUnlock={unlockVault}
        shareGame={shareGame}
        shareStatus={shareStatus}
      />
    );
  }

  return (
    <main className="story-shell" style={shellStyle}>
      <StoryBackdrop />
      <header className="story-topbar">
        <div>
          <p className="kicker">Chapter 1 Story Path</p>
          <h1>Hidden Hearts</h1>
        </div>
        <div className="topbar-actions">
          <a className="icon-button" href={chapterOneStory.sourceUrl} target="_blank" rel="noreferrer" aria-label="Read Chapter 1 on AO3" title="Read Chapter 1 on AO3">
            <BookOpen size={19} />
          </a>
          <button className="icon-button" type="button" onClick={() => setFeedbackOpen(true)} aria-label="Send suggestion" title="Send suggestion">
            <MessageCircle size={19} />
          </button>
          <button className="icon-button" type="button" onClick={shareGame} aria-label="Share story path" title="Share story path">
            <Send size={18} />
          </button>
        </div>
      </header>

      <section className="chapter-rail" aria-label="Vault and Chapter 1 story parts">
        <button
          className="chapter-node vault-node"
          type="button"
          onClick={returnToVault}
          aria-label="Return to vault entrance"
          title="Return to vault entrance"
        >
          <LockKeyhole size={18} />
        </button>
        {chapterOneStory.parts.map((part, index) => (
          <div
            className={`chapter-node story-part-node ${index === activePartIndex ? "active" : ""} ${index < activePartIndex || story.complete ? "complete" : ""}`}
            key={part.id}
            aria-current={index === activePartIndex ? "step" : undefined}
            aria-label={`${part.label}: ${part.title}`}
            title={`${part.label}: ${part.title}`}
          >
            {index + 1}
          </div>
        ))}
      </section>

      <StoryPrototype
        completedChapter={completedChapter}
        onChoose={chooseOption}
        onContinue={continueStory}
        onFeedback={() => setFeedbackOpen(true)}
        onInspect={inspectDetail}
        onReset={resetStory}
        onReturnToVault={returnToVault}
        pendingResult={pendingResultForScene}
        scene={scene}
        story={story}
      />

      <FeedbackPanel
        currentScene={scene}
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        story={story}
      />

      {shareStatus && <div className="toast">{shareStatus}</div>}
    </main>
  );
}

function StoryPrototype({
  completedChapter,
  onChoose,
  onContinue,
  onFeedback,
  onInspect,
  onReset,
  onReturnToVault,
  pendingResult,
  scene,
  story,
}) {
  const participants = scene.participants
    .map((id) => getCharacterById(id))
    .filter(Boolean);
  const progressPercent =
    ((story.sceneIndex + (story.complete ? 1 : 0)) / chapterOneStory.scenes.length) * 100;
  const pointEvents = getPointEvents(pendingResult?.stats);
  const currentPartIndex = getChapterOnePartIndex(story.sceneIndex);
  const currentPart = chapterOneStory.parts[currentPartIndex];
  const sceneCallback = getSceneCallback(scene, story.flags);
  const inspectables = getSceneInspectables(scene);

  return (
    <div className="story-layout">
      <aside className="story-card chapter-card">
        <p className="kicker">{chapterOneStory.chapter}</p>
        <h2>{chapterOneStory.title}</h2>
        <p>{chapterOneStory.logline}</p>
        <div className="player-brief">
          <div className="player-token" aria-hidden="true">
            <UserRound size={22} />
          </div>
          <div>
            <span>Playing As</span>
            <strong>Grian</strong>
            <p>
              Choose how he gets through each Chapter 1 beat: protect people, accept care, keep secrets, or stay brave.
            </p>
          </div>
        </div>
        {currentPart && (
          <div className="part-summary">
            <span>{currentPart.label}</span>
            <strong>{currentPart.title}</strong>
            <p>{currentPart.description}</p>
          </div>
        )}
        <div className="path-panel" aria-label="Chapter 1 path">
          <div className="path-header">
            <span>Path</span>
            <strong>
              Scene {story.sceneIndex + 1} / {chapterOneStory.scenes.length}
            </strong>
          </div>
          <ol className="path-list">
            {chapterOneStory.parts.map((part, index) => (
              <li
                className={`path-step ${index === currentPartIndex ? "active" : ""} ${index < currentPartIndex || story.complete ? "complete" : ""}`}
                key={part.id}
              >
                <span>{part.label}</span>
                <strong>{index <= currentPartIndex || story.complete ? part.title : "Unopened part"}</strong>
              </li>
            ))}
          </ol>
        </div>
        <div className="story-progress" aria-label="Chapter progress">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="stat-grid">
          {Object.entries(storyStats).map(([key, stat]) => (
            <div className="story-stat" key={key}>
              <span>{stat.label}</span>
              <strong>{story.stats[key] ?? 0}</strong>
            </div>
          ))}
        </div>
        <div className="chapter-actions">
          <button className="command" type="button" onClick={onReturnToVault}>
            <Home size={17} />
            Vault
          </button>
          <button className="command" type="button" onClick={onReset}>
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </aside>

      <section className="story-card scene-card" aria-labelledby="scene-title">
        {!story.complete ? (
          <>
            <div className="scene-meta">
              <span>{scene.location}</span>
              <span>{scene.time}</span>
              <span>
                Scene {story.sceneIndex + 1} / {chapterOneStory.scenes.length}
              </span>
            </div>
            <p className="kicker">{scene.mood}</p>
            <h2 id="scene-title">{scene.title}</h2>
            <p className="scene-narration">{scene.narration}</p>
            {scene.dialogue && <SceneDialogue key={scene.id} lines={scene.dialogue} />}
            {sceneCallback && <SceneCallback callback={sceneCallback} />}
            {inspectables.length > 0 && !pendingResult && (
              <SceneInspectables
                details={inspectables}
                flags={story.flags}
                onInspect={onInspect}
              />
            )}

            {pendingResult ? (
              <div className="choice-result" role="status">
                <p className="kicker">Choice Logged</p>
                <h3>{pendingResult.label}</h3>
                <p>{pendingResult.result}</p>
                {pointEvents.length > 0 && (
                  <div className="point-event" aria-label="Points gained">
                    <div className="point-event-header">
                      <Sparkles size={18} />
                      <span>Points Gained</span>
                    </div>
                    <div className="point-event-grid">
                      {pointEvents.map((event) => (
                        <div className="point-tick" key={event.key}>
                          <strong>
                            {event.label} {event.amount}
                          </strong>
                          <p>{event.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button className="command primary" type="button" onClick={onContinue}>
                  <ChevronRight size={18} />
                  Continue
                </button>
              </div>
            ) : (
              <div className="choice-grid" aria-label="Scene choices">
                {scene.choices.map((choice) => (
                  <button className="choice-card" type="button" key={choice.id} onClick={() => onChoose(choice)}>
                    <span>{choice.label}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <ChapterComplete
            completedChapter={completedChapter}
            onFeedback={onFeedback}
            onReset={onReset}
            story={story}
          />
        )}

        <div className="scene-footer">
          <button className="command" type="button" onClick={onFeedback}>
            <MessageCircle size={17} />
            Suggest
          </button>
        </div>
      </section>

      <aside className="story-card cast-card">
        <p className="kicker">People Here</p>
        <div className="cast-list">
          {participants.map((character) => (
            <article className="cast-entry" key={character.id}>
              <div className="portrait-token" aria-hidden="true">
                {character.displayName.slice(0, 1)}
              </div>
              <div>
                <h3>{character.displayName}</h3>
                <span className="cast-role">{getSceneCastRole(character)}</span>
                <p className="cast-scene-note">{getSceneCastNote(scene, character)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="source-note">
          <Shield size={18} />
          <p>Chapter 1 lens: this panel only names what matters in the current beat.</p>
        </div>
      </aside>
    </div>
  );
}

function SceneCallback({ callback }) {
  return (
    <div className="scene-callback" role="status">
      <Sparkles size={18} />
      <div>
        <strong>{callback.label}</strong>
        <p>{callback.text}</p>
      </div>
    </div>
  );
}

function SceneInspectables({ details, flags, onInspect }) {
  const revealedDetails = details.filter((detail) => isDetailInspected(detail, flags));

  return (
    <div className="inspect-panel">
      <div className="inspect-header">
        <Search size={17} />
        <span>Inspect</span>
      </div>
      <div className="inspect-actions">
        {details.map((detail) => {
          const inspected = isDetailInspected(detail, flags);
          return (
            <button
              aria-pressed={inspected}
              className={`command inspect-command ${inspected ? "active" : ""}`}
              key={detail.id}
              onClick={() => onInspect(detail)}
              type="button"
            >
              <Search size={16} />
              {detail.label}
            </button>
          );
        })}
      </div>
      {revealedDetails.map((detail) => (
        <p className="inspect-result" key={detail.id}>
          {detail.text}
        </p>
      ))}
    </div>
  );
}

function SceneDialogue({ lines }) {
  const [lineIndex, setLineIndex] = useState(0);
  if (!Array.isArray(lines) || lines.length === 0) return null;

  const line = lines[Math.min(lineIndex, lines.length - 1)];
  const speaker = getCharacterById(line.speakerId);
  const speakerName = speaker?.displayName ?? line.speakerId;
  const speakerInitial = speakerName.slice(0, 1);
  const hasNextLine = lineIndex < lines.length - 1;

  return (
    <div className="scene-dialogue" aria-label="Scene dialogue">
      <div className="dialogue-speaker">
        <div className="dialogue-token" aria-hidden="true">
          {speakerInitial}
        </div>
        <div>
          <strong>{speakerName}</strong>
          {line.tone && <span>{line.tone}</span>}
        </div>
      </div>
      <p>{line.line}</p>
      {hasNextLine && (
        <button
          className="command dialogue-next"
          onClick={() => setLineIndex((current) => Math.min(current + 1, lines.length - 1))}
          type="button"
        >
          <ChevronRight size={16} />
          Next
        </button>
      )}
    </div>
  );
}

function ChapterComplete({ completedChapter, onFeedback, onReset, story }) {
  const completionPath = getCompletionPath(story);

  return (
    <div className="complete-card">
      <p className="kicker">{completedChapter ? "Chapter Replay Complete" : "Chapter Path Complete"}</p>
      <h2>Chapter 1 Run Complete</h2>
      <p>
        This build stays inside Chapter 1 and stretches it across the current game structure: restaurant danger, recovery, home, work, patrol, and the bar night.
      </p>
      <div className="complete-summary">
        <Star size={20} />
        <span>Main emotional path: {completionPath.label}</span>
      </div>
      <p className="complete-path-copy">{completionPath.text}</p>
      <div className="brief-actions">
        <button className="command primary" type="button" onClick={onFeedback}>
          <MessageCircle size={18} />
          Send T-i Feedback
        </button>
        <button className="command" type="button" onClick={onReset}>
          <RotateCcw size={18} />
          Replay Chapter 1
        </button>
        <a className="command" href={ao3Links.firstChapter} target="_blank" rel="noreferrer">
          <BookOpen size={18} />
          Source
        </a>
      </div>
    </div>
  );
}

function FeedbackPanel({ currentScene, isOpen, onClose, story }) {
  const [savedFeedback, setSavedFeedback] = useState(readFeedback);
  const [draft, setDraft] = useState({
    name: "T-i",
    type: "Story note",
    message: "",
  });
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const choicePath = story.choices.map((choice) => `${choice.sceneTitle}: ${choice.label}`).join(" > ");
  const choiceCount = story.choices.length;
  const statsSummary = Object.entries(story.stats)
    .map(([key, value]) => `${storyStats[key]?.label ?? key}: ${value}`)
    .join(", ");
  const feedbackContextSummary =
    choiceCount > 0
      ? `${choiceCount} choice${choiceCount === 1 ? "" : "s"} recorded. ${statsSummary}`
      : "No choices recorded yet.";

  const feedback = {
    id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
    createdAt: new Date().toISOString(),
    sceneId: currentScene.id,
    sceneTitle: currentScene.title,
    choicePath,
    statsSummary,
    ...draft,
  };

  const saveAndOpenIssue = () => {
    if (!draft.message.trim()) {
      setStatus("Write a note first.");
      return;
    }
    const nextFeedback = [feedback, ...savedFeedback].slice(0, 20);
    setSavedFeedback(nextFeedback);
    safeWriteJson(FEEDBACK_KEY, nextFeedback);
    const title = `[Prototype feedback] ${currentScene.title}`;
    const issueUrl = `${REPO_ISSUE_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(buildFeedbackBody(feedback))}`;
    window.open(issueUrl, "_blank", "noopener,noreferrer");
    setDraft((current) => ({ ...current, message: "" }));
    setStatus("Saved locally and opened GitHub.");
  };

  const copyFeedback = async () => {
    if (!draft.message.trim()) {
      setStatus("Write a note first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(buildFeedbackBody(feedback));
      setStatus("Copied feedback.");
    } catch {
      setStatus("Copy unavailable in this browser.");
    }
  };

  return (
    <div className="feedback-layer" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <section className="feedback-panel">
        <div className="feedback-header">
          <div>
            <p className="kicker">T-i Feedback Channel</p>
            <h2 id="feedback-title">Send In-game Suggestion</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close feedback">
            <Check size={19} />
          </button>
        </div>
        <label>
          Name
          <input
            value={draft.name}
            onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label>
          Type
          <select
            value={draft.type}
            onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value }))}
          >
            <option>Story note</option>
            <option>Character correction</option>
            <option>Gameplay change</option>
            <option>Bug</option>
            <option>Visual direction</option>
          </select>
        </label>
        <label>
          Suggestion for {currentScene.title}
          <textarea
            value={draft.message}
            onChange={(event) => setDraft((current) => ({ ...current, message: event.target.value }))}
            placeholder="Write what should change, what feels off, or what T-i wants us to build next."
            rows={7}
          />
        </label>
        <details className="feedback-context">
          <summary>
            <UserRound size={17} />
            <span>{feedbackContextSummary}</span>
          </summary>
          <div className="feedback-context-body">
            <strong>Choice path</strong>
            <span>{choicePath || "No choices recorded yet"}</span>
            <strong>Stats</strong>
            <span>{statsSummary}</span>
          </div>
        </details>
        <div className="brief-actions">
          <button className="command primary" type="button" onClick={saveAndOpenIssue}>
            <Send size={18} />
            Send To GitHub
          </button>
          <button className="command" type="button" onClick={copyFeedback}>
            <MessageCircle size={18} />
            Copy
          </button>
        </div>
        <p className="feedback-status">
          {status || `${savedFeedback.length} saved local suggestion${savedFeedback.length === 1 ? "" : "s"}.`}
        </p>
      </section>
    </div>
  );
}

function StoryBackdrop() {
  return (
    <div className="story-backdrop" aria-hidden="true">
      <div className="pixel-sky" />
      <div className="moon" />
      <div className="city-row far">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="city-row near">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="street-glow" />
    </div>
  );
}

function VaultEntrance({ assetStyle, onUnlock, shareGame, shareStatus }) {
  const [step, setStep] = useState(0);
  const [reinforced, setReinforced] = useState(false);
  const [optionOrder, setOptionOrder] = useState(createVaultOptionOrder);
  const current = vaultQuestions[step];
  const currentOptions = optionOrder[step]?.options ?? current.options;
  const dialRotation = reinforced ? step * 118 - 24 : step * 118;

  const answerQuestion = (option) => {
    if (reinforced || !current) return;
    if (option !== current.answer) {
      setReinforced(true);
      return;
    }
    if (step === vaultQuestions.length - 1) {
      window.setTimeout(onUnlock, 620);
      return;
    }
    setStep((value) => value + 1);
  };

  const retry = () => {
    setStep(0);
    setReinforced(false);
    setOptionOrder(createVaultOptionOrder());
  };

  return (
    <main className={`vault-shell ${reinforced ? "reinforced" : ""}`} style={assetStyle}>
      <section className="vault-stage" aria-labelledby="vault-title">
        <div className="vault-door" aria-hidden="true">
          <div className="vault-bolts">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="vault-ring" />
          <div className="vault-lock" style={{ "--dial-turn": `${dialRotation}deg` }}>
            <div className="dial-notch" />
            <LockKeyhole size={44} />
          </div>
          <div className="vault-bars">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="vault-console">
          <p className="kicker">Vault Entrance</p>
          <h1 id="vault-title">Hidden Hearts</h1>
          <p className="vault-copy">
            Unlock the Chapter 1 story path with Chapter 1 receipts. This build stays in Chapter 1; Chapters 2-6 come later.
          </p>

          {!reinforced ? (
            <div className="vault-question">
              <div className="question-row">
                <Lock size={18} />
                <strong>{current.prompt}</strong>
              </div>
              <div className="answer-grid">
                {currentOptions.map((option) => (
                  <button key={option} type="button" onClick={() => answerQuestion(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="vault-warning">
              <p>The vault locks itself again. Chapter details matter here.</p>
              <button className="command primary" type="button" onClick={retry}>
                <RotateCcw size={18} />
                Retry
              </button>
            </div>
          )}

          <div className="vault-actions">
            <a className="command" href={ao3Links.firstChapter} target="_blank" rel="noreferrer">
              <BookOpen size={18} />
              Read Chapter 1
            </a>
            <button className="command" type="button" onClick={shareGame}>
              <Send size={18} />
              Share
            </button>
          </div>
          {shareStatus && <p className="share-note">{shareStatus}</p>}
        </div>
      </section>
    </main>
  );
}
