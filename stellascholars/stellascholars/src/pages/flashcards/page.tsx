import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { getFlashcardDeck, FLASHCARD_DECKS } from "../../mocks/flashcard-decks";
import { FLASHCARD_TERM_TRANSLATIONS } from "../../mocks/translations";
import { useAuth } from "../../contexts/AuthContext";

type Pile = "learning" | "almost" | "mastered";

const BILINGUAL_IDS = new Set(["math-chinese", "cs-chinese", "chinese-vocab"]);



export default function FlashcardsPage() {
  const { user } = useAuth();
  const { setId } = useParams<{ setId: string }>();
  const nativeLang = user?.nativeLanguage ?? "none";
  const topicId = setId ?? "algebra";
  const cards = getFlashcardDeck(topicId);
  const isBilingual = BILINGUAL_IDS.has(topicId) || (cards.length > 0 && !!cards[0].termZh);
  const hasCards = cards.length > 0;

  const displayName = topicId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  const [piles, setPiles] = useState<Record<string, Pile>>({});
  const [finished, setFinished] = useState(false);

  if (!hasCards) {
    return (
      <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center px-6" />
      </div>
    );
  }

  const card = cards[current];
  const mastered = Object.values(piles).filter((v) => v === "mastered").length;
  const learning = Object.values(piles).filter((v) => v === "learning").length;

  const handleRate = (pile: Pile) => {
    setPiles((p) => ({ ...p, [card.id]: pile }));
    setFlipped(false);
    if (current + 1 < cards.length) {
      setTimeout(() => setCurrent((c) => c + 1), 200);
    } else {
      setTimeout(() => setFinished(true), 200);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center px-6">
          <div className="border border-white/10 rounded-2xl bg-white/3 p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="font-orbitron font-bold text-2xl text-white mb-2">Session Complete!</h2>
            <p className="text-slate-400 mb-1">{cards.length} cards reviewed</p>
            <p className="text-xs text-cyan-400 mb-6">{displayName}</p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {([
                ["Mastered", mastered, "text-emerald-400 bg-emerald-400/10"],
                ["Almost", cards.length - mastered - learning, "text-orange-400 bg-orange-400/10"],
                ["Learning", learning, "text-red-400 bg-red-400/10"],
              ] as const).map(([label, val, cls]) => (
                <div key={String(label)} className={`p-3 rounded-xl ${String(cls).split(" ")[1]}`}>
                  <p className={`font-orbitron font-bold text-xl ${String(cls).split(" ")[0]}`}>{val}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setCurrent(0); setFlipped(false); setPiles({}); setFinished(false); }}
                className="flex-1 py-3 rounded-xl border border-white/12 text-slate-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Restart
              </button>
              <Link to="/subjects" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-sm font-semibold text-center transition-all cursor-pointer">
                Back to Subjects
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ── BILINGUAL LAYOUT ── */
  if (isBilingual) {
    return (
      <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="max-w-4xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-orbitron font-bold text-lg text-white">{displayName}</h1>
                <p className="text-xs text-slate-500 mt-0.5">Card {current + 1} of {cards.length}</p>
              </div>
              <div className="flex items-center gap-4 text-center">
                <div>
                  <p className="font-orbitron font-bold text-base text-emerald-400">{mastered}</p>
                  <p className="text-xs text-slate-500">Mastered</p>
                </div>
                <div>
                  <p className="font-orbitron font-bold text-base text-red-400">{learning}</p>
                  <p className="text-xs text-slate-500">Learning</p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/8 rounded-full mb-8 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${((current) / cards.length) * 100}%` }}
              />
            </div>

            {/* Side-by-side bilingual card */}
            <div
              className="cursor-pointer select-none"
              onClick={() => setFlipped(!flipped)}
            >
              {!flipped ? (
                /* FRONT — Term side by side */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 min-h-[280px]">
                  {/* English side */}
                  <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/5 to-white/3 border-b md:border-b-0 md:border-r border-white/10">
                    <p className="text-xs text-cyan-400 uppercase tracking-widest mb-4 font-semibold">English</p>
                    <p className="font-orbitron font-bold text-xl text-white text-center leading-snug">{card.term}</p>
                  </div>
                  {/* Chinese side */}
                  <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-red-500/8 to-orange-500/5">
                    <p className="text-xs text-red-400 uppercase tracking-widest mb-4 font-semibold">中文</p>
                    <p className="font-bold text-2xl text-white text-center mb-2" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {card.termZh ?? "—"}
                    </p>
                    {card.pinyin && (
                      <p className="text-sm text-slate-400 text-center italic">{card.pinyin}</p>
                    )}
                  </div>
                </div>
              ) : (
                /* BACK — Definition side by side */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-orange-400/20 min-h-[280px]">
                  {/* English definition */}
                  <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-white/5 to-white/3 border-b md:border-b-0 md:border-r border-white/10">
                    <p className="text-xs text-orange-400 uppercase tracking-widest mb-4 font-semibold">Definition</p>
                    <p className="text-sm text-slate-200 leading-relaxed">{card.definition}</p>
                  </div>
                  {/* Chinese explanation */}
                  <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-red-500/8 to-orange-500/5">
                    <p className="text-xs text-red-400 uppercase tracking-widest mb-4 font-semibold">中文解释</p>
                    <p className="text-sm text-slate-200 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {card.defZh ?? card.definition}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-slate-600 mt-4">Click card to {flipped ? "show terms" : "reveal definitions"}</p>

            {/* Rating buttons */}
            {flipped && (
              <div className="grid grid-cols-3 gap-3 mt-6">
                <button onClick={() => handleRate("learning")} className="py-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-sm font-semibold transition-all cursor-pointer">
                  Still Learning
                </button>
                <button onClick={() => handleRate("almost")} className="py-3 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-sm font-semibold transition-all cursor-pointer">
                  Almost There
                </button>
                <button onClick={() => handleRate("mastered")} className="py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-semibold transition-all cursor-pointer">
                  Got It!
                </button>
              </div>
            )}

            <div className="text-center mt-8">
              <Link to="/subjects" className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer">← Back to subjects</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ── STANDARD FLASHCARD LAYOUT ── */
  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-2xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-orbitron font-bold text-xl text-white">Flashcards</h1>
              <p className="text-xs text-slate-500 mt-0.5">{displayName} · {current + 1} / {cards.length} cards</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-orbitron font-bold text-base text-emerald-400">{mastered}</p>
                <p className="text-xs text-slate-500">Mastered</p>
              </div>
              <div className="text-center">
                <p className="font-orbitron font-bold text-base text-red-400">{learning}</p>
                <p className="text-xs text-slate-500">Learning</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="h-1.5 bg-white/8 rounded-full mb-8 overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${(current / cards.length) * 100}%` }} />
          </div>

          {/* Flashcard */}
          <div className="cursor-pointer select-none" onClick={() => setFlipped(!flipped)} style={{ perspective: "1000px" }}>
            <div
              className="relative transition-transform duration-500"
              style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: "260px" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex items-center justify-center p-8 rounded-2xl border-2 border-cyan-400/20 bg-gradient-to-br from-white/6 to-white/3"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-center">
                  <p className="text-xs text-cyan-400 uppercase tracking-widest mb-4 font-semibold">Term</p>
                  <p className="font-orbitron font-bold text-xl text-white">{card.term}</p>
                  {nativeLang && nativeLang !== "none" && FLASHCARD_TERM_TRANSLATIONS[nativeLang]?.[card.id] && (
                    <p className="text-slate-400 text-sm mt-2">
                      ({FLASHCARD_TERM_TRANSLATIONS[nativeLang][card.id].term}
                      {FLASHCARD_TERM_TRANSLATIONS[nativeLang][card.id].roman && (
                        <span className="text-slate-500 italic"> · {FLASHCARD_TERM_TRANSLATIONS[nativeLang][card.id].roman}</span>
                      )})
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-5">Click to reveal definition</p>
                </div>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 flex items-center justify-center p-8 rounded-2xl border-2 border-orange-400/20 bg-gradient-to-br from-orange-500/8 to-white/3"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-center">
                  <p className="text-xs text-orange-400 uppercase tracking-widest mb-4 font-semibold">Definition</p>
                  <p className="text-base text-slate-200 leading-relaxed">{card.definition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating buttons */}
          {flipped && (
            <div className="grid grid-cols-3 gap-3 mt-6">
              <button onClick={() => handleRate("learning")} className="py-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-sm font-semibold transition-all cursor-pointer">
                Still Learning
              </button>
              <button onClick={() => handleRate("almost")} className="py-3 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-sm font-semibold transition-all cursor-pointer">
                Almost There
              </button>
              <button onClick={() => handleRate("mastered")} className="py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-semibold transition-all cursor-pointer">
                Got It!
              </button>
            </div>
          )}

          {!flipped && (
            <div className="text-center mt-6">
              <p className="text-xs text-slate-600">Click the card to flip it</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/subjects" className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer">← Back to subjects</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
