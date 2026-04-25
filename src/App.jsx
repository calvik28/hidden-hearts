import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Lightbulb,
  Lock,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
  Send,
  Shield,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
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

function createProgress() {
  return {
    completed: [],
    highestChapter: 1,
    hearts: 0,
    courage: 0,
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

function readProgress() {
  const parsed = safeReadJson(STORAGE_KEY, null);
  if (parsed && Array.isArray(parsed.completed)) {
    return { ...createProgress(), ...parsed };
  }
  return createProgress();
}

function readVaultOpen() {
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
    dial: question.dial,
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
  const [story, setStory] = useState(createStoryProgress);
  const [pendingResult, setPendingResult] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const scene = chapterOneStory.scenes[story.sceneIndex] ?? chapterOneStory.scenes[0];
  const completedChapter = progress.completed.includes(chapterOneStory.id);
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

  const unlockVault = () => {
    writeVaultOpen();
    setVaultOpen(true);
  };

  const chooseOption = (choice) => {
    if (pendingResult || story.complete) return;
    setStory((current) => ({
      ...current,
      stats: applyChoiceStats(current.stats, choice.stats),
      choices: [
        ...current.choices,
        {
          sceneId: scene.id,
          sceneTitle: scene.title,
          choiceId: choice.id,
          label: choice.label,
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
          highestChapter: Math.max(current.highestChapter, 2),
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

  const previousScene = () => {
    if (pendingResult || story.sceneIndex === 0 || story.complete) return;
    setStory((current) => ({
      ...current,
      sceneIndex: Math.max(0, current.sceneIndex - 1),
    }));
  };

  const resetStory = () => {
    setStory(createStoryProgress());
    setPendingResult(null);
  };

  const returnToVault = () => {
    setVaultOpen(false);
    try {
      localStorage.removeItem(VAULT_KEY);
    } catch {
      return;
    }
  };

  const shareGame = async () => {
    const payload = {
      title: "Hidden Hearts RPG",
      text: "I played the Hidden Hearts 2D story RPG prototype.",
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
          <p className="kicker">Production Prototype</p>
          <h1>Hidden Hearts</h1>
        </div>
        <div className="topbar-actions">
          <a className="icon-button" href={chapterOneStory.sourceUrl} target="_blank" rel="noreferrer" aria-label="Read Chapter 1 on AO3" title="Read Chapter 1 on AO3">
            <BookOpen size={19} />
          </a>
          <button className="icon-button" type="button" onClick={() => setFeedbackOpen(true)} aria-label="Send suggestion" title="Send suggestion">
            <MessageCircle size={19} />
          </button>
          <button className="icon-button" type="button" onClick={shareGame} aria-label="Share prototype" title="Share prototype">
            <Send size={18} />
          </button>
        </div>
      </header>

      <section className="chapter-rail" aria-label="Chapter prototype progress">
        <button className="chapter-node active" type="button">
          1
        </button>
        {[2, 3, 4, 5].map((chapter) => (
          <button className="chapter-node" type="button" disabled key={chapter} title="Future 2D chapter prototype">
            {chapter}
          </button>
        ))}
        <button className="chapter-node future" type="button" disabled title="Chapter 6 coming soon">
          6
        </button>
      </section>

      <StoryPrototype
        completedChapter={completedChapter}
        onChoose={chooseOption}
        onContinue={continueStory}
        onFeedback={() => setFeedbackOpen(true)}
        onPrevious={previousScene}
        onReset={resetStory}
        onReturnToVault={returnToVault}
        pendingResult={pendingResult}
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
  onPrevious,
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

  return (
    <div className="story-layout">
      <aside className="story-card chapter-card">
        <p className="kicker">{chapterOneStory.chapter}</p>
        <h2>{chapterOneStory.title}</h2>
        <p>{chapterOneStory.logline}</p>
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
            </div>
            <p className="kicker">{scene.mood}</p>
            <h2 id="scene-title">{scene.title}</h2>
            <p className="scene-narration">{scene.narration}</p>
            <div className="scene-focus">
              <Lightbulb size={18} />
              <p>{scene.focus}</p>
            </div>

            {pendingResult ? (
              <div className="choice-result" role="status">
                <p className="kicker">Choice Logged</p>
                <h3>{pendingResult.label}</h3>
                <p>{pendingResult.result}</p>
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
                    <small>{summarizeChoiceStats(choice.stats)}</small>
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
          <button className="command" type="button" onClick={onPrevious} disabled={story.sceneIndex === 0 || Boolean(pendingResult) || story.complete}>
            <ChevronLeft size={17} />
            Previous
          </button>
          <button className="command" type="button" onClick={onFeedback}>
            <MessageCircle size={17} />
            Suggest
          </button>
        </div>
      </section>

      <aside className="story-card cast-card">
        <p className="kicker">Scene Cast</p>
        <div className="cast-list">
          {participants.map((character) => (
            <article className="cast-entry" key={character.id}>
              <div className="portrait-token" aria-hidden="true">
                {character.displayName.slice(0, 1)}
              </div>
              <div>
                <h3>{character.displayName}</h3>
                <p>{character.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="source-note">
          <Shield size={18} />
          <p>Character depth is source-backed from the current AO3 chapters and marked TODO where motives are still unknown.</p>
        </div>
      </aside>
    </div>
  );
}

function ChapterComplete({ completedChapter, onFeedback, onReset, story }) {
  const topStats = Object.entries(story.stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => storyStats[key]?.label)
    .join(" + ");

  return (
    <div className="complete-card">
      <p className="kicker">{completedChapter ? "Chapter Replay Complete" : "Chapter Prototype Complete"}</p>
      <h2>Chapter 1 Has A Playable Shape</h2>
      <p>
        This pass establishes Grian as the main character, Scar as home, Gem as healer, and the hero team as a source of both banter and pressure.
      </p>
      <div className="complete-summary">
        <Star size={20} />
        <span>Main emotional path: {topStats || "Unformed"}</span>
      </div>
      <div className="brief-actions">
        <button className="command primary" type="button" onClick={onFeedback}>
          <MessageCircle size={18} />
          Send Leah Feedback
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

function summarizeChoiceStats(stats = {}) {
  const labels = Object.entries(stats).map(([key, value]) => {
    const sign = value > 0 ? "+" : "";
    return `${storyStats[key]?.label ?? key} ${sign}${value}`;
  });
  return labels.join(" / ") || "Story beat";
}

function FeedbackPanel({ currentScene, isOpen, onClose, story }) {
  const [savedFeedback, setSavedFeedback] = useState(readFeedback);
  const [draft, setDraft] = useState({
    name: "Leah",
    type: "Story note",
    message: "",
  });
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const choicePath = story.choices.map((choice) => `${choice.sceneTitle}: ${choice.label}`).join(" > ");
  const statsSummary = Object.entries(story.stats)
    .map(([key, value]) => `${storyStats[key]?.label ?? key}: ${value}`)
    .join(", ");

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
            <p className="kicker">Leah Feedback Channel</p>
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
            placeholder="Write what should change, what feels off, or what Leah wants us to build next."
            rows={7}
          />
        </label>
        <div className="feedback-context">
          <UserRound size={17} />
          <span>{choicePath || "No choices recorded yet"}</span>
        </div>
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
  const [answered, setAnswered] = useState([]);
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
    const nextAnswered = [...answered, current.dial];
    setAnswered(nextAnswered);
    if (step === vaultQuestions.length - 1) {
      window.setTimeout(onUnlock, 620);
      return;
    }
    setStep((value) => value + 1);
  };

  const retry = () => {
    setStep(0);
    setAnswered([]);
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
            Unlock the story prototype with Chapter 1 receipts. From here on, production follows the 2D story RPG path.
          </p>

          <div className="vault-progress" aria-label="Dial progress">
            {vaultQuestions.map((question, index) => (
              <span
                key={question.dial}
                className={answered.includes(question.dial) ? "lit" : index === step ? "current" : ""}
              >
                {question.dial}
              </span>
            ))}
          </div>

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
