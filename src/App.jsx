import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Heart,
  Home,
  Lock,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
  Share2,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from "lucide-react";
import HiddenHeartsScene from "./game/HiddenHeartsScene.jsx";
import { generatedAssets, getLevelGeneratedAssets } from "./game/generatedAssets.js";
import { ao3Links, finale, levels, vaultQuestions } from "./game/levels.js";

const STORAGE_KEY = "hidden-hearts-progress";
const VAULT_KEY = "hidden-hearts-vault-open";

function createProgress() {
  return {
    completed: [],
    highestChapter: 1,
    hearts: 0,
    courage: 0,
  };
}

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && Array.isArray(parsed.completed)) {
      return { ...createProgress(), ...parsed };
    }
  } catch {
    return createProgress();
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

function missionState(level) {
  return {
    hp: 100,
    collected: [],
    defeated: [],
    portalReady: false,
    complete: false,
    log: [`${level.chapter}: ${level.title}`],
  };
}

export default function App() {
  const [progress, setProgress] = useState(readProgress);
  const [vaultOpen, setVaultOpen] = useState(readVaultOpen);
  const [levelIndex, setLevelIndex] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [showFinale, setShowFinale] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(true);
  const [mission, setMission] = useState(() => missionState(levels[0]));
  const [controls, setControls] = useState({});
  const [shareStatus, setShareStatus] = useState("");

  const level = levels[levelIndex];
  const completedSet = useMemo(() => new Set(progress.completed), [progress]);
  const uiAssetStyle = useMemo(
    () => ({
      "--ui-frame-image": `url("${generatedAssets.ui.uiFrameTexture}")`,
    }),
    [],
  );
  const chapterStyle = useMemo(
    () => ({
      ...uiAssetStyle,
      "--chapter-accent": level.accent,
      "--chapter-secondary": level.visual?.secondary ?? "#f8c75c",
      "--chapter-mist": level.visual?.mist ?? level.accent,
      "--chapter-bg-image": `url("${getLevelGeneratedAssets(level).background}")`,
    }),
    [level, uiAssetStyle],
  );
  const vaultAssetStyle = useMemo(
    () => ({
      ...uiAssetStyle,
      "--vault-bg-image": `url("${generatedAssets.ui.titleEntranceBackground}")`,
      "--vault-door-image": `url("${generatedAssets.ui.vaultDoorTexture}")`,
    }),
    [uiAssetStyle],
  );
  const finaleAssetStyle = useMemo(
    () => ({
      ...uiAssetStyle,
      "--finale-bg-image": `url("${generatedAssets.ui.finaleIllustration}")`,
    }),
    [uiAssetStyle],
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      return;
    }
  }, [progress]);

  const unlockVault = () => {
    writeVaultOpen();
    setVaultOpen(true);
  };

  const resetMission = useCallback((nextIndex) => {
    setLevelIndex(nextIndex);
    setRunKey((value) => value + 1);
    setShowFinale(false);
    setBriefingOpen(true);
    setMission(missionState(levels[nextIndex]));
    setControls({});
  }, []);

  const patchMission = useCallback((updater) => {
    setMission((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      return next;
    });
  }, []);

  const markComplete = useCallback(() => {
    setMission((current) => {
      if (current.complete) return current;
      return {
        ...current,
        complete: true,
        log: [level.completion, ...current.log].slice(0, 4),
      };
    });
    setProgress((current) => {
      const completed = new Set(current.completed);
      completed.add(level.id);
      return {
        ...current,
        completed: [...completed].sort((a, b) => a - b),
        highestChapter: Math.max(current.highestChapter, level.id + 1),
        hearts: current.hearts + 1,
        courage: current.courage + level.id * 12,
      };
    });
  }, [level]);

  const handleCollect = useCallback((label) => {
    patchMission((current) => {
      if (current.collected.includes(label)) return current;
      return {
        ...current,
        collected: [...current.collected, label],
        log: [`Recovered ${label}.`, ...current.log].slice(0, 4),
      };
    });
  }, [patchMission]);

  const handleDefeat = useCallback((name) => {
    patchMission((current) => {
      if (current.defeated.includes(name)) return current;
      return {
        ...current,
        defeated: [...current.defeated, name],
        log: [`${name} retreated.`, ...current.log].slice(0, 4),
      };
    });
  }, [patchMission]);

  const handleDamage = useCallback((amount) => {
    patchMission((current) => ({
      ...current,
      hp: Math.max(12, current.hp - amount),
      log:
        current.hp - amount <= 18
          ? ["Hold steady. The team is still with you.", ...current.log].slice(0, 4)
          : current.log,
    }));
  }, [patchMission]);

  const handleReady = useCallback(() => {
    patchMission((current) => ({
      ...current,
      portalReady: true,
      log: ["The chapter gate is open.", ...current.log].slice(0, 4),
    }));
  }, [patchMission]);

  const continueChapter = () => {
    if (level.finalLevel || levelIndex === levels.length - 1) {
      setShowFinale(true);
      setBriefingOpen(false);
      return;
    }
    resetMission(levelIndex + 1);
  };

  const replay = () => {
    resetMission(levelIndex);
  };

  const returnToStart = () => {
    resetMission(0);
  };

  const selectLevel = (index) => {
    resetMission(index);
  };

  const setControl = (name, value) => {
    setControls((current) => ({ ...current, [name]: value }));
  };

  const shareGame = async () => {
    const payload = {
      title: "Hidden Hearts RPG",
      text: "I played Hidden Hearts, a 3D chapter RPG based on Theo_innit's fanfic.",
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
        assetStyle={vaultAssetStyle}
        onUnlock={unlockVault}
        shareGame={shareGame}
        shareStatus={shareStatus}
      />
    );
  }

  if (showFinale) {
    return (
      <main className="app-shell finale-shell" style={finaleAssetStyle}>
        <FinaleBackdrop />
        <section className="finale-content" aria-labelledby="finale-title">
          <p className="kicker">{finale.chapter}</p>
          <h1 id="finale-title">{finale.title}</h1>
          <p className="finale-lede">
            Thank you for your heroic efforts. You carried the team through smoke,
            fear, healing, trust, and the cliff edge of the latest chapter.
          </p>
          <p>
            The next chapter is coming soon. In the meantime, read Leah's fanfic
            as Theo_innit on AO3 and leave a comment about what you enjoyed most
            in Hidden Hearts. Come back soon to play the next chapter in the
            series.
          </p>
          <div className="finale-actions">
            <a className="command primary" href={ao3Links.firstChapter} target="_blank" rel="noreferrer">
              <BookOpen size={18} />
              Read Fanfic
            </a>
            <a className="command" href={ao3Links.latestComments} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              Leave Comment
            </a>
            <button className="command" type="button" onClick={shareGame}>
              <Share2 size={18} />
              Share
            </button>
            <button className="icon-command" type="button" onClick={returnToStart} aria-label="Replay from chapter one" title="Replay from chapter one">
              <RotateCcw size={20} />
            </button>
          </div>
          {shareStatus && <p className="share-note">{shareStatus}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell" style={chapterStyle}>
      <HiddenHeartsScene
        key={`${level.id}-${runKey}`}
        level={level}
        controls={controls}
        disabled={briefingOpen || mission.complete}
        onCollect={handleCollect}
        onDefeat={handleDefeat}
        onDamage={handleDamage}
        onReadyForPortal={handleReady}
        onComplete={markComplete}
      />

      <header className="topbar">
        <div>
          <p className="kicker">Theo_innit presents</p>
          <h1>Hidden Hearts</h1>
        </div>
        <nav className="chapter-nav" aria-label="Chapter levels">
          {levels.map((chapterLevel, index) => (
            <button
              className={`chapter-dot ${index === levelIndex ? "active" : ""} ${
                completedSet.has(chapterLevel.id) ? "complete" : ""
              }`}
              key={chapterLevel.id}
              type="button"
              onClick={() => selectLevel(index)}
              aria-label={`Open ${chapterLevel.chapter}`}
              title={`${chapterLevel.chapter}: ${chapterLevel.title}`}
            >
              {chapterLevel.id}
            </button>
          ))}
          <button
            className="chapter-dot finale-dot"
            type="button"
            onClick={() => setShowFinale(true)}
            aria-label="Open coming soon chapter"
            title="Coming soon"
          >
            6
          </button>
        </nav>
      </header>

      <section className="hud-panel mission-panel" aria-labelledby="mission-title">
        <p className="kicker">{level.chapter}</p>
        <h2 id="mission-title">{level.title}</h2>
        <p>{level.subtitle}</p>
        <div className="meter-group" aria-label="Hero condition">
          <div className="meter">
            <span>Heart</span>
            <strong>{mission.hp}</strong>
            <div className="bar">
              <span style={{ width: `${mission.hp}%` }} />
            </div>
          </div>
          <div className="stat-row">
            <span>
              <Heart size={16} /> {progress.hearts}
            </span>
            <span>
              <Shield size={16} /> {progress.courage}
            </span>
          </div>
        </div>
      </section>

      <section className="hud-panel objective-panel" aria-label="Mission objective">
        <div className="objective-heading">
          <Swords size={18} />
          <strong>{level.objective}</strong>
        </div>
        <ul>
          {level.pickups.map((item) => (
            <li key={item} className={mission.collected.includes(item) ? "done" : ""}>
              <Sparkles size={14} />
              {item}
            </li>
          ))}
          {level.enemies.map((enemy) => (
            <li key={enemy} className={mission.defeated.includes(enemy) ? "done" : ""}>
              <Zap size={14} />
              {enemy}
            </li>
          ))}
        </ul>
      </section>

      <section className="hud-panel log-panel" aria-label="Chapter log">
        {mission.log.map((entry) => (
          <p key={entry}>{entry}</p>
        ))}
      </section>

      <div className="quick-actions">
        <button className="icon-command" type="button" onClick={returnToStart} aria-label="Return to chapter one" title="Return to chapter one">
          <Home size={19} />
        </button>
        <a className="icon-command" href={level.sourceUrl} target="_blank" rel="noreferrer" aria-label="Read this chapter on AO3" title="Read this chapter on AO3">
          <BookOpen size={19} />
        </a>
        <button className="icon-command" type="button" onClick={shareGame} aria-label="Share game" title="Share game">
          <Share2 size={19} />
        </button>
      </div>

      <MobileControls setControl={setControl} />

      {briefingOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="briefing-title">
          <section className="briefing">
            <p className="kicker">{level.zone} / {level.weather}</p>
            <h2 id="briefing-title">{level.title}</h2>
            <p>{level.briefing}</p>
            <div className="briefing-actions">
              <button className="command primary" type="button" onClick={() => setBriefingOpen(false)}>
                <Swords size={18} />
                Begin Chapter
              </button>
              <a className="command" href={level.sourceUrl} target="_blank" rel="noreferrer">
                <BookOpen size={18} />
                Source
              </a>
            </div>
          </section>
        </div>
      )}

      {mission.complete && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="complete-title">
          <section className="briefing complete-briefing">
            <p className="kicker">{level.chapter} Complete</p>
            <h2 id="complete-title">{level.finalLevel ? "The Current Final Chapter" : "Chapter Gate Opened"}</h2>
            <p>{level.completion}</p>
            <div className="briefing-actions">
              <button className="command primary" type="button" onClick={continueChapter}>
                <Sparkles size={18} />
                {level.finalLevel ? "Continue" : "Next Chapter"}
              </button>
              <button className="command" type="button" onClick={replay}>
                <RotateCcw size={18} />
                Replay
              </button>
            </div>
          </section>
        </div>
      )}

      {shareStatus && <div className="toast">{shareStatus}</div>}
    </main>
  );
}

function VaultEntrance({ assetStyle, onUnlock, shareGame, shareStatus }) {
  const [step, setStep] = useState(0);
  const [reinforced, setReinforced] = useState(false);
  const [answered, setAnswered] = useState([]);
  const current = vaultQuestions[step];
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
            Three lock turns. Three Chapter 1 receipts. The door only respects
            people who paid attention.
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
                {current.options.map((option) => (
                  <button className="answer-button" key={option} type="button" onClick={() => answerQuestion(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="vault-fail" role="alert">
              <strong>Try again, loser.</strong>
              <p>
                You could not even be considered a sidekick to the worst villain.
                Bahahaha. The vault has reinforced itself out of secondhand
                embarrassment.
              </p>
              <div className="briefing-actions">
                <a className="command primary" href={ao3Links.firstChapter} target="_blank" rel="noreferrer">
                  <BookOpen size={18} />
                  Re-read Chapter 1
                </a>
                <button className="command" type="button" onClick={retry}>
                  <RotateCcw size={18} />
                  Try Again
                </button>
                <button className="icon-command" type="button" onClick={shareGame} aria-label="Share game" title="Share game">
                  <Share2 size={19} />
                </button>
              </div>
            </div>
          )}
          {shareStatus && <p className="share-note">{shareStatus}</p>}
        </div>
      </section>
    </main>
  );
}

function MobileControls({ setControl }) {
  const bind = (name) => ({
    onPointerDown: () => setControl(name, true),
    onPointerUp: () => setControl(name, false),
    onPointerCancel: () => setControl(name, false),
    onPointerLeave: () => setControl(name, false),
  });

  return (
    <div className="mobile-controls" aria-label="Movement controls">
      <button className="icon-command" type="button" aria-label="Move forward" title="Move forward" {...bind("forward")}>
        <ArrowUp size={20} />
      </button>
      <button className="icon-command" type="button" aria-label="Move left" title="Move left" {...bind("left")}>
        <ArrowLeft size={20} />
      </button>
      <button className="icon-command action-button" type="button" aria-label="Power strike" title="Power strike" {...bind("action")}>
        <Zap size={22} />
      </button>
      <button className="icon-command" type="button" aria-label="Move right" title="Move right" {...bind("right")}>
        <ArrowRight size={20} />
      </button>
      <button className="icon-command" type="button" aria-label="Move backward" title="Move backward" {...bind("backward")}>
        <ArrowDown size={20} />
      </button>
    </div>
  );
}

function FinaleBackdrop() {
  return (
    <div className="finale-backdrop" aria-hidden="true">
      <div className="gate gate-one" />
      <div className="gate gate-two" />
      <div className="gate gate-three" />
      <div className="skyline-strip" />
    </div>
  );
}
