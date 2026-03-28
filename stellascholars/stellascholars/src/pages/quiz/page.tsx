import { useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";

import { getQuizQuestions, QUESTION_BANK } from "../../mocks/questions";
import { ACHIEVEMENTS, RARITY_COLORS, checkAchievements } from "../../mocks/achievements";
import { QUESTION_TRANSLATIONS } from "../../mocks/translations";
import { useAuth } from "../../contexts/AuthContext";
import { useProgress } from "../../hooks/useProgress";
import { useTheme } from "../../contexts/ThemeContext";

function getStoredStat(key: string, fallback: number): number {
  try { return parseInt(localStorage.getItem(key) ?? String(fallback), 10) || fallback; } catch (_e) { return fallback; }
}
function setStoredStat(key: string, value: number) {
  try { localStorage.setItem(key, String(value)); } catch (_e) { /* ignore */ }
}

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { user, recordStudySession, updateUser } = useAuth();
  const { setSubtopicProgress, getSubtopicProgress } = useProgress();
  const { isDark } = useTheme();

  const subtopicId = quizId ?? "linear-equations";
  const hasBank = !!QUESTION_BANK[subtopicId];

  const [questions] = useState(() => getQuizQuestions(subtopicId, 15));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const prevProgress = getSubtopicProgress(subtopicId);

  // Achievement unlock state
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);
  const [currentAchIdx, setCurrentAchIdx] = useState(0);

  const displayName = subtopicId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const nativeLang = user?.nativeLanguage ?? "none";

  const q = questions[current];
  const totalPoints = questions.reduce((a, qq) => a + qq.points, 0);
  const progress = ((current + 1) / questions.length) * 100;

  const triggerAchievementChecks = useCallback(
    (finalScore: number, totalQAfterSession: number, perfect: boolean) => {
      if (!user) return;
      const pq = getStoredStat("stella-perfect-quizzes", 0) + (perfect ? 1 : 0);
      if (perfect) setStoredStat("stella-perfect-quizzes", pq);
      const mockExams = getStoredStat("stella-mock-exams", 0);
      const flashcardsReviewed = getStoredStat("stella-flashcards-reviewed", 0);
      const studyPoints = totalQAfterSession * 3 + (user.streakDays ?? 0) * 5;
      const allLbPoints = [1840,1720,1590,1460,1350,1280,1190,1070,980,890,820,750,680,610,540,490,420,360,310,260];
      const userRank = allLbPoints.filter((p) => p > studyPoints).length + 1;
      const topicsCompleted = Object.values(JSON.parse(localStorage.getItem("stella-progress-v2") ?? "{}") as Record<string,number>).filter(v => v >= 100).length;

      const newIds = checkAchievements({
        totalQuestionsAnswered: totalQAfterSession,
        streakDays: user.streakDays ?? 0,
        perfectQuizCount: pq,
        topicsCompleted,
        flashcardsReviewed,
        mockExamsCompleted: mockExams,
        leaderboardRank: userRank,
        planetRank: user.planetRank ?? "Moon",
        xp: (user.xp ?? 0) + finalScore * 3,
        unlockedAchievements: user.unlockedAchievements ?? [],
      });

      if (newIds.length > 0) {
        setAchievementQueue(newIds);
        setCurrentAchIdx(0);
        setShowAchievementModal(true);
        setNewlyUnlocked(newIds);
        const existing = user.unlockedAchievements ?? [];
        updateUser({ unlockedAchievements: [...new Set([...existing, ...newIds])] });
      }
    },
    [user, updateUser]
  );

  if (!hasBank || questions.length === 0) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-[#05051a] text-white" : "bg-gray-50 text-slate-900"} flex flex-col`}>
        <Navbar />
        <main className="flex-1 pt-20" />
      </div>
    );
  }

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    let earned = 0;
    let isCorrect = false;
    if (selected === q.correctAnswer) {
      earned = q.points;
      isCorrect = true;
    }
    setScore((s) => s + earned);
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      const minutes = Math.max(1, Math.round((Date.now() - startTime.current) / 60000));
      const finalScore = score + (submitted && selected === q.correctAnswer ? q.points : 0);
      const finalCorrect = correctCount + (submitted && selected === q.correctAnswer ? 1 : 0);
      const pct = Math.round((finalScore / totalPoints) * 100);
      const isPerfect = pct === 100;

      const newProgress = Math.max(prevProgress, pct);
      setSubtopicProgress(subtopicId, newProgress);

      const prevTotal = user?.totalQuestionsAnswered ?? 0;
      const totalQAfterSession = prevTotal + questions.length;

      recordStudySession({
        minutes,
        questionsAnswered: questions.length,
        correct: finalCorrect,
        xp: Math.round(finalScore * 3),
      });

      triggerAchievementChecks(finalScore, totalQAfterSession, isPerfect);
      setFinished(true);
    }
  };

  const dismissAchievement = () => {
    if (currentAchIdx + 1 < achievementQueue.length) {
      setCurrentAchIdx((i) => i + 1);
    } else {
      setShowAchievementModal(false);
      setAchievementQueue([]);
    }
  };

  if (finished) {
    const pct = Math.round((score / totalPoints) * 100);
    const unlocks = pct >= 80;
    return (
      <div className={`min-h-screen ${isDark ? "bg-[#05051a] text-white" : "bg-gray-50 text-slate-900"} flex flex-col`}>
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center px-6">
          <div className={`${isDark ? "bg-white/5 border border-white/10" : "bg-white border-2 border-slate-200"} rounded-2xl p-10 text-center max-w-md w-full`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 80 ? "bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-300" : pct >= 60 ? "bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300" : "bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300"}`}>
              <span className={`font-orbitron font-black text-3xl ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-600"}`}>{pct}%</span>
            </div>
            <h2 className={`font-orbitron font-bold text-2xl ${isDark ? "text-white" : "text-slate-900"} mb-2`}>
              {pct >= 80 ? "Nailed it!" : pct >= 60 ? "Good effort!" : "Keep practising!"}
            </h2>
            <p className={`${isDark ? "text-slate-400" : "text-slate-600"} mb-2 text-sm`}>
              <span className="text-purple-500 font-semibold">{displayName}</span> quiz complete
            </p>
            {unlocks && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                <i className="ri-lock-unlock-line mr-2"></i>
                80%+ reached — next subtopic unlocked!
              </div>
            )}
            {!unlocks && (
              <div className={`mb-4 px-4 py-3 rounded-xl ${isDark ? "bg-amber-400/10 border border-amber-400/20 text-amber-300" : "bg-amber-50 border border-amber-200 text-amber-700"} text-sm`}>
                Score 80%+ to unlock the next subtopic
              </div>
            )}

            {newlyUnlocked.length > 0 && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold">
                <i className="ri-trophy-line mr-2"></i>
                {newlyUnlocked.length} achievement{newlyUnlocked.length > 1 ? "s" : ""} unlocked!
              </div>
            )}

            <div className="space-y-3 text-left mb-8">
              {[
                ["Score", `${score}/${totalPoints} points`, pct >= 80 ? "text-emerald-500" : isDark ? "text-white" : "text-slate-900"],
                ["Correct", `${correctCount}/${questions.length} questions`, pct >= 80 ? "text-emerald-500" : "text-amber-500"],
                ["XP Earned", `+${Math.round(score * 3)} XP`, "text-amber-500"],
                ["Your Best", `${Math.max(prevProgress, pct)}%`, pct >= 80 ? "text-emerald-500" : "text-orange-500"],
              ].map(([label, val, color]) => (
                <div key={String(label)} className={`flex justify-between text-sm p-3 ${isDark ? "bg-white/5 border border-white/8" : "bg-slate-50 border border-slate-100"} rounded-xl`}>
                  <span className={isDark ? "text-slate-400" : "text-slate-600"}>{label}</span>
                  <span className={`font-semibold ${color}`}>{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className={`flex-1 text-center py-3 rounded-xl border ${isDark ? "border-white/15 text-slate-300 hover:text-white hover:bg-white/5" : "border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"} text-sm font-semibold transition-all cursor-pointer whitespace-nowrap`}
              >
                Retry Quiz
              </button>
              <Link to="/subjects" className="flex-1 text-center py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all cursor-pointer whitespace-nowrap">
                Back to Subjects
              </Link>
            </div>
          </div>
        </main>

        {/* Achievement Unlock Modal */}
        {showAchievementModal && achievementQueue.length > 0 && (() => {
          const ach = ACHIEVEMENTS.find((a) => a.id === achievementQueue[currentAchIdx]);
          if (!ach) return null;
          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white border border-purple-200 rounded-3xl p-10 max-w-sm w-full text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ top: `${10 + i * 10}%`, left: `${5 + i * 12}%`, animationDelay: `${i * 0.15}s`, opacity: 0.6 }} />
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full mb-4">
                    <i className="ri-trophy-fill text-purple-600 text-xs" />
                    <span className="text-xs text-purple-700 font-semibold">Achievement Unlocked!</span>
                  </div>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-5">
                    <i className={`${ach.icon} text-4xl text-white`} />
                  </div>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-semibold mb-3 ${RARITY_COLORS[ach.rarity]}`}>
                    {ach.rarity}
                  </div>
                  <h2 className="font-orbitron font-bold text-xl text-slate-900 mb-2">{ach.name}</h2>
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">{ach.description}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5">
                    <p className="font-orbitron font-bold text-xl text-amber-600">+{ach.xpReward} XP</p>
                  </div>
                  {achievementQueue.length > 1 && (
                    <p className="text-xs text-slate-500 mb-3">{currentAchIdx + 1} of {achievementQueue.length} achievements</p>
                  )}
                  <button
                    onClick={dismissAchievement}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-bold font-orbitron cursor-pointer whitespace-nowrap"
                  >
                    {currentAchIdx + 1 < achievementQueue.length ? "Next Achievement →" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#05051a] text-white" : "bg-gray-50 text-slate-900"} flex flex-col`}>
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <div className={`${isDark ? "bg-[#08082a] border-b border-white/8" : "bg-white border-b border-slate-200"} px-6 py-4 sticky top-16 z-30`}>
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <span className={`font-orbitron text-xs ${isDark ? "text-slate-500" : "text-slate-500"} block truncate`}>{displayName}</span>
              <span className={`font-orbitron text-sm ${isDark ? "text-white" : "text-slate-900"}`}>Q{current + 1} of {questions.length}</span>
            </div>
            <div className={`flex-1 h-2 ${isDark ? "bg-white/8" : "bg-slate-200"} rounded-full max-w-xs overflow-hidden`}>
              <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 whitespace-nowrap">
                {q.points} pts
              </span>
              <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} whitespace-nowrap`}>Score: {score}/{totalPoints}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-5">
            <span className={`text-xs uppercase tracking-widest font-semibold px-3 py-1 ${isDark ? "bg-white/8 border border-white/10 text-slate-400" : "bg-slate-100 border border-slate-200 text-slate-500"} rounded-full`}>
              Multiple Choice
            </span>
          </div>

          <div className={`${isDark ? "bg-white/5 border border-white/10" : "bg-white border border-slate-200"} rounded-2xl p-7 mb-6`}>
            <div className="mb-6">
              <p className={`text-lg ${isDark ? "text-white" : "text-slate-900"} font-medium leading-relaxed`}>
                {q.question}
                {nativeLang && nativeLang !== "none" && QUESTION_TRANSLATIONS[nativeLang]?.[q.id] && (
                  <span className={`${isDark ? "text-slate-500" : "text-slate-400"} font-normal`}> ({QUESTION_TRANSLATIONS[nativeLang][q.id]})</span>
                )}
              </p>
            </div>

            <div className="space-y-3">
              {q.options.map((opt: string, i: number) => {
                let cls: string;
                if (submitted) {
                  if (i === q.correctAnswer)
                    cls = "border-emerald-400 bg-emerald-50 cursor-default text-slate-900";
                  else if (i === selected && i !== q.correctAnswer)
                    cls = "border-red-400 bg-red-50 cursor-default text-slate-700";
                  else
                    cls = isDark
                      ? "border-white/5 bg-white/3 opacity-40 cursor-default text-slate-400"
                      : "border-slate-100 bg-white opacity-40 cursor-default text-slate-600";
                } else if (selected === i) {
                  cls = "border-purple-400 bg-purple-50 cursor-pointer text-slate-900";
                } else {
                  cls = isDark
                    ? "border-white/10 bg-white/4 hover:border-purple-400/50 hover:bg-purple-400/8 cursor-pointer text-slate-200"
                    : "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer text-slate-700";
                }
                return (
                  <button
                    key={i}
                    onClick={() => !submitted && setSelected(i)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all ${cls}`}
                  >
                    <span className={`font-bold mr-3 text-xs ${submitted && i === q.correctAnswer ? "text-emerald-600" : submitted && i === selected ? "text-red-600" : isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                    {submitted && i === q.correctAnswer && <i className="ri-check-line text-emerald-600 float-right mt-0.5" />}
                    {submitted && i === selected && i !== q.correctAnswer && <i className="ri-close-line text-red-600 float-right mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {submitted && q.explanation && (
              <div className="mt-5 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-lightbulb-line text-purple-600 text-sm"></i>
                  </div>
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Explanation</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={handleNext} className={`text-sm ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"} cursor-pointer whitespace-nowrap transition-colors`}>
              Skip →
            </button>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                Submit Answer <i className="ri-send-plane-line"></i>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                {current + 1 < questions.length ? "Next Question" : "See Results"} <i className="ri-arrow-right-line"></i>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
