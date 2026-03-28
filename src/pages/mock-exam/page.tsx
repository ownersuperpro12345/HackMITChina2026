import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";

import { SUBJECTS } from "../../mocks/subjects";
import { QUESTION_BANK } from "../../mocks/questions";
import { getWrittenQuestionsForSubjects, ShortQuestion, LongQuestion, EssayQuestion } from "../../mocks/written-questions";
import { useAuth } from "../../contexts/AuthContext";
import { checkAchievements, ACHIEVEMENTS, RARITY_COLORS } from "../../mocks/achievements";

type Phase = "setup" | "exam" | "review" | "results";

type QuestionType = "mcq" | "short" | "long" | "essay";

interface MCQExamQ {
  id: string;
  type: "mcq";
  subjectName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: 1;
}

interface WrittenExamQ {
  id: string;
  type: "short" | "long" | "essay";
  subjectName: string;
  question: string;
  sampleAnswer: string;
  markingPoints?: string[];
  keyPoints?: string[];
  minWords?: number;
  points: number;
}

type ExamQuestion = MCQExamQ | WrittenExamQ;

interface QuestionMix {
  mc: number;
  short: number;
  long: number;
  essay: number;
}

// Default breakdown by duration
const DEFAULTS: Record<number, QuestionMix> = {
  30: { mc: 10, short: 3, long: 2, essay: 0 },
  60: { mc: 20, short: 7, long: 5, essay: 1 },
  90: { mc: 30, short: 15, long: 7, essay: 2 },
  120: { mc: 50, short: 20, long: 10, essay: 3 },
};

// Minutes per question for each type
const MINS_PER_Q: Record<QuestionType, number> = {
  mcq: 0.67,
  short: 3,
  long: 6,
  essay: 20,
};

function calcMix(duration: number, pct: Record<QuestionType, number>): QuestionMix {
  const mc = Math.max(0, Math.round((duration * pct.mcq) / 100 / MINS_PER_Q.mcq));
  const short = Math.max(0, Math.round((duration * pct.short) / 100 / MINS_PER_Q.short));
  const long = Math.max(0, Math.round((duration * pct.long) / 100 / MINS_PER_Q.long));
  const essay = Math.max(0, Math.round((duration * pct.essay) / 100 / MINS_PER_Q.essay));
  return { mc, short, long, essay };
}

function buildExamQuestions(subjectIds: string[], mix: QuestionMix): ExamQuestion[] {
  const subjects = SUBJECTS.filter((s) => subjectIds.length === 0 || subjectIds.includes(s.id));

  // MCQ questions
  const mcqPool: MCQExamQ[] = [];
  subjects.forEach((sub) => {
    sub.topics.forEach((topic) => {
      topic.subtopics.forEach((st) => {
        const bank = QUESTION_BANK[st.id] ?? [];
        bank.forEach((q) => {
          mcqPool.push({
            id: q.id,
            type: "mcq",
            subjectName: sub.name,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            points: 1,
          });
        });
      });
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
  const mcqs = shuffle(mcqPool).slice(0, mix.mc);

  // Written questions
  const { shorts, longs, essays } = getWrittenQuestionsForSubjects(subjectIds, mix.short, mix.long, mix.essay);

  const shortQs: WrittenExamQ[] = shorts.map((q: ShortQuestion) => ({
    id: q.id,
    type: "short",
    subjectName: subjectIds.length === 0 ? "General" : subjects.find((s) => s.id === q.subjectId)?.name ?? q.subjectId,
    question: q.question,
    sampleAnswer: q.sampleAnswer,
    markingPoints: q.markingPoints,
    points: 2,
  }));

  const longQs: WrittenExamQ[] = longs.map((q: LongQuestion) => ({
    id: q.id,
    type: "long",
    subjectName: subjects.find((s) => s.id === q.subjectId)?.name ?? q.subjectId,
    question: q.question,
    sampleAnswer: q.sampleAnswer,
    markingPoints: q.markingPoints,
    points: 3,
  }));

  const essayQs: WrittenExamQ[] = essays.map((q: EssayQuestion) => ({
    id: q.id,
    type: "essay",
    subjectName: subjects.find((s) => s.id === q.subjectId)?.name ?? q.subjectId,
    question: q.question,
    sampleAnswer: q.sampleAnswer,
    keyPoints: q.keyPoints,
    minWords: q.minWords,
    points: q.points,
  }));

  // Interleave: start with MCQ, intersperse written questions
  const all: ExamQuestion[] = [...mcqs];
  const written = shuffle([...shortQs, ...longQs, ...essayQs]);
  // Insert written questions evenly throughout
  if (written.length > 0 && all.length > 0) {
    const step = Math.floor(all.length / (written.length + 1));
    written.forEach((wq, i) => {
      all.splice(step * (i + 1) + i, 0, wq);
    });
  } else {
    all.push(...written);
  }

  return all;
}

function getTypeBadge(type: QuestionType) {
  const map: Record<QuestionType, { label: string; cls: string }> = {
    mcq: { label: "Multiple Choice", cls: "bg-purple-100 text-purple-700 border-purple-200" },
    short: { label: "Short Answer", cls: "bg-blue-100 text-blue-700 border-blue-200" },
    long: { label: "Long Answer", cls: "bg-amber-100 text-amber-700 border-amber-200" },
    essay: { label: "Essay", cls: "bg-rose-100 text-rose-700 border-rose-200" },
  };
  return map[type];
}

function gradeWrittenAnswer(type: QuestionType, answer: string, maxPoints: number, minWords?: number): number {
  const wc = answer.trim().split(/\s+/).filter(Boolean).length;
  const len = answer.trim().length;
  if (type === "short") {
    if (len >= 80) return maxPoints;
    if (len >= 30) return 1;
    return 0;
  }
  if (type === "long") {
    if (len >= 150) return maxPoints;
    if (len >= 80) return 2;
    if (len >= 30) return 1;
    return 0;
  }
  if (type === "essay") {
    const target = minWords ?? 200;
    const ratio = Math.min(1, wc / target);
    return Math.round(ratio * maxPoints * 0.85);
  }
  return 0;
}

export default function MockExamPage() {
  const { user, recordStudySession, updateUser } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [duration, setDuration] = useState(60);

  // Percentage sliders
  const [pctMC, setPctMC] = useState(60);
  const [pctShort, setPctShort] = useState(20);
  const [pctLong, setPctLong] = useState(15);
  const [pctEssay, setPctEssay] = useState(5);
  const [useCustom, setUseCustom] = useState(false);

  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Achievement modal
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);
  const [achIdx, setAchIdx] = useState(0);
  const [showAchModal, setShowAchModal] = useState(false);

  const availableSubjects = user?.qualification
    ? SUBJECTS.filter((s) => {
        const userSubs = [...(user.coreSubjects ?? []), ...(user.electiveSubjects ?? [])];
        return userSubs.includes(s.id);
      })
    : SUBJECTS;

  // Compute effective mix
  const effectiveMix: QuestionMix = useCustom
    ? calcMix(duration, { mcq: pctMC, short: pctShort, long: pctLong, essay: pctEssay })
    : DEFAULTS[duration] ?? DEFAULTS[60];

  const totalQuestions = effectiveMix.mc + effectiveMix.short + effectiveMix.long + effectiveMix.essay;
  const totalMarks = effectiveMix.mc * 1 + effectiveMix.short * 2 + effectiveMix.long * 3 +
    effectiveMix.essay * 8;

  // Simpler approach: let users set values freely and show total

  // Simpler approach: just clamp and allow sum != 100, show warning
  const pctSum = pctMC + pctShort + pctLong + pctEssay;
  const pctValid = pctSum === 100;

  // Timer countdown
  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === "exam" && timeLeft === 0 && questions.length > 0) {
      handleSubmitExam();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  };

  const startExam = () => {
    const qs = buildExamQuestions(selectedSubjects, effectiveMix);
    setQuestions(qs);
    setTimeLeft(duration * 60);
    setCurrent(0);
    setAnswers({});
    setPhase("exam");
  };

  const handleSubmitExam = useCallback(() => {
    setShowSubmitConfirm(false);
    setPhase("review");
  }, []);

  const calculateResults = () => {
    let earned = 0;
    let total = 0;
    questions.forEach((q) => {
      total += q.points;
      const ans = answers[q.id];
      if (q.type === "mcq") {
        if (ans !== undefined && Number(ans) === (q as MCQExamQ).correctAnswer) earned += q.points;
      } else {
        const wq = q as WrittenExamQ;
        const pts = gradeWrittenAnswer(q.type, String(ans ?? ""), q.points, wq.minWords);
        earned += pts;
      }
    });
    return { earned, total, pct: total > 0 ? Math.round((earned / total) * 100) : 0 };
  };

  const finishReview = () => {
    const { earned, pct } = calculateResults();
    const mockExams = parseInt(localStorage.getItem("stella-mock-exams") ?? "0", 10) + 1;
    localStorage.setItem("stella-mock-exams", String(mockExams));

    recordStudySession({ minutes: duration, questionsAnswered: questions.length, xp: Math.round(earned * 5) });

    // Check achievements
    if (user) {
      const totalQ = (user.totalQuestionsAnswered ?? 0) + questions.length;
      const newIds = checkAchievements({
        totalQuestionsAnswered: totalQ,
        streakDays: user.streakDays ?? 0,
        perfectQuizCount: parseInt(localStorage.getItem("stella-perfect-quizzes") ?? "0", 10),
        topicsCompleted: Object.values(JSON.parse(localStorage.getItem("stella-progress-v2") ?? "{}") as Record<string,number>).filter(v => v >= 100).length,
        flashcardsReviewed: parseInt(localStorage.getItem("stella-flashcards-reviewed") ?? "0", 10),
        mockExamsCompleted: mockExams,
        leaderboardRank: 999,
        planetRank: user.planetRank ?? "Moon",
        xp: user.xp + earned * 5,
        unlockedAchievements: user.unlockedAchievements ?? [],
      });
      if (newIds.length > 0) {
        setAchievementQueue(newIds);
        setAchIdx(0);
        setShowAchModal(true);
        updateUser({ unlockedAchievements: [...new Set([...(user.unlockedAchievements ?? []), ...newIds])] });
      }
    }

    setPhase("results");
  };

  const currentQ = questions[current];

  // =============================== SETUP PHASE ===============================
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full mb-4">
                <div className="w-3 h-3 flex items-center justify-center"><i className="ri-file-paper-2-line text-purple-600 text-xs" /></div>
                <span className="text-xs text-purple-700 font-semibold">Mock Examination</span>
              </div>
              <h1 className="font-orbitron font-bold text-3xl text-slate-900 mb-2">Set Up Your Mock Exam</h1>
              <p className="text-slate-600">Simulate exam conditions with timed questions across all types.</p>
            </div>

            {/* Duration */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-5">
              <h3 className="font-orbitron font-semibold text-sm text-slate-900 mb-4">Exam Duration</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {([30, 60, 90, 120] as const).map((d) => {
                  const def = DEFAULTS[d];
                  return (
                    <button key={d} onClick={() => { setDuration(d); setUseCustom(false); }}
                      className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${duration === d && !useCustom ? "border-purple-400 bg-purple-50" : "border-slate-200 bg-white hover:border-purple-200"}`}>
                      <p className={`font-orbitron font-bold text-lg ${duration === d && !useCustom ? "text-purple-600" : "text-slate-700"}`}>{d} min</p>
                      <p className="text-xs text-slate-500 mt-1">{def.mc} MC · {def.short} Short · {def.long} Long{def.essay > 0 ? ` · ${def.essay} Essay` : ""}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Type Ratio */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-semibold text-sm text-slate-900">Question Mix</h3>
                <button onClick={() => setUseCustom(!useCustom)}
                  className={`text-xs px-3 py-1 rounded-full border font-semibold cursor-pointer transition-all ${useCustom ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-600 border-slate-300 hover:border-purple-300"}`}>
                  {useCustom ? "Custom" : "Customise"}
                </button>
              </div>

              {!useCustom ? (
                /* Default mix display */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Multiple Choice", count: effectiveMix.mc, pts: "1 mark each", color: "text-purple-600 bg-purple-50 border-purple-200" },
                    { label: "Short Answer", count: effectiveMix.short, pts: "2 marks each", color: "text-blue-600 bg-blue-50 border-blue-200" },
                    { label: "Long Answer", count: effectiveMix.long, pts: "3 marks each", color: "text-amber-600 bg-amber-50 border-amber-200" },
                    { label: "Essay", count: effectiveMix.essay, pts: "8 marks each", color: "text-rose-600 bg-rose-50 border-rose-200" },
                  ].map((t) => (
                    <div key={t.label} className={`p-3 rounded-xl border text-center ${t.color}`}>
                      <p className="font-orbitron font-bold text-2xl">{t.count}</p>
                      <p className="text-xs font-semibold mt-0.5">{t.label}</p>
                      <p className="text-xs opacity-70 mt-0.5">{t.pts}</p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Custom sliders */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">Adjust the percentage of each question type. Percentages must total 100%.</p>
                  {[
                    { label: "Multiple Choice (1 mk ea)", key: "mc" as const, val: pctMC, set: setPctMC, color: "accent-purple-600" },
                    { label: "Short Answer (2 mk ea)", key: "short" as const, val: pctShort, set: setPctShort, color: "accent-blue-600" },
                    { label: "Long Answer (3 mk ea)", key: "long" as const, val: pctLong, set: setPctLong, color: "accent-amber-500" },
                    { label: "Essay (8 mk ea)", key: "essay" as const, val: pctEssay, set: setPctEssay, color: "accent-rose-600" },
                  ].map((item) => (
                    <div key={item.key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                        <span className="text-sm font-bold text-slate-900">{item.val}%</span>
                      </div>
                      <input type="range" min={0} max={100} value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className={`w-full h-2 rounded-full cursor-pointer ${item.color}`} />
                    </div>
                  ))}
                  <div className={`flex items-center justify-between pt-2 border-t border-slate-200 ${pctValid ? "text-emerald-600" : "text-red-600"}`}>
                    <span className="text-xs font-semibold">Total: {pctSum}%</span>
                    <span className="text-xs">{pctValid ? "✓ Valid" : `Adjust by ${100 - pctSum > 0 ? "+" : ""}${100 - pctSum}%`}</span>
                  </div>
                  {/* Preview */}
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {[
                      { count: effectiveMix.mc, label: "MC" },
                      { count: effectiveMix.short, label: "Short" },
                      { count: effectiveMix.long, label: "Long" },
                      { count: effectiveMix.essay, label: "Essay" },
                    ].map((t) => (
                      <div key={t.label} className="text-center py-2 bg-white border border-slate-200 rounded-xl">
                        <p className="font-orbitron font-bold text-lg text-slate-900">{t.count}</p>
                        <p className="text-xs text-slate-500">{t.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                <span className="text-slate-600">{totalQuestions} total questions</span>
                <span className="text-slate-600 font-semibold">{totalMarks} total marks</span>
              </div>
            </div>

            {/* Subject selection */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-semibold text-sm text-slate-900">Select Subjects</h3>
                <button onClick={() => setSelectedSubjects(selectedSubjects.length === availableSubjects.length ? [] : availableSubjects.map((s) => s.id))}
                  className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer font-semibold">
                  {selectedSubjects.length === availableSubjects.length ? "Deselect all" : "Select all"}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableSubjects.map((s) => {
                  const sel = selectedSubjects.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleSubject(s.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${sel ? "border-purple-300 bg-purple-50" : "border-slate-200 bg-white hover:border-purple-200"}`}>
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <i className={`${s.icon} text-sm ${sel ? "text-purple-600" : "text-slate-500"}`} />
                      </div>
                      <span className={`text-xs font-medium truncate ${sel ? "text-slate-900" : "text-slate-600"}`}>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={startExam} disabled={useCustom && !pctValid}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold font-orbitron tracking-wide text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed">
              Begin Mock Exam → {totalQuestions} questions · {totalMarks} marks
            </button>
          </div>
        </main>

      </div>
    );
  }

  // =============================== EXAM PHASE ===============================
  if (phase === "exam" && currentQ) {
    const isWritten = currentQ.type !== "mcq";
    const wq = isWritten ? (currentQ as WrittenExamQ) : null;
    const mcq = !isWritten ? (currentQ as MCQExamQ) : null;
    const badge = getTypeBadge(currentQ.type);
    const wordCount = isWritten ? String(answers[currentQ.id] ?? "").trim().split(/\s+/).filter(Boolean).length : 0;

    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {/* Exam header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-16 z-30">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold whitespace-nowrap ${badge.cls}`}>{badge.label}</span>
                <span className="text-xs text-slate-500 whitespace-nowrap">Q{current + 1}/{questions.length}</span>
                <span className="text-xs text-purple-600 font-semibold whitespace-nowrap">{currentQ.points} mk</span>
              </div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full max-w-xs overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
              <div className={`font-orbitron font-bold text-lg flex-shrink-0 ${timeLeft < 300 ? "text-red-600" : "text-slate-900"}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs text-slate-500">{currentQ.subjectName}</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 mb-5">
              <p className="text-base text-slate-900 font-medium leading-relaxed mb-5">{currentQ.question}</p>

              {/* MCQ */}
              {mcq && (
                <div className="space-y-2.5">
                  {mcq.options.map((opt, i) => (
                    <button key={opt} onClick={() => setAnswers((a) => ({ ...a, [currentQ.id]: i }))}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${answers[currentQ.id] === i ? "border-purple-400 bg-purple-50 text-slate-900" : "border-slate-200 bg-white hover:border-purple-200 text-slate-700"}`}>
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${answers[currentQ.id] === i ? "border-purple-600 bg-purple-600 text-white" : "border-slate-300 text-slate-500"}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Short Answer */}
              {wq?.type === "short" && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">Write a concise answer (1–3 sentences). Worth 2 marks.</p>
                  <textarea value={String(answers[currentQ.id] ?? "")}
                    onChange={(e) => setAnswers((a) => ({ ...a, [currentQ.id]: e.target.value }))}
                    placeholder="Write your answer here..." rows={4}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none" />
                </div>
              )}

              {/* Long Answer */}
              {wq?.type === "long" && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">Write a detailed response (1–2 paragraphs). Worth 3 marks.</p>
                  <textarea value={String(answers[currentQ.id] ?? "")}
                    onChange={(e) => setAnswers((a) => ({ ...a, [currentQ.id]: e.target.value }))}
                    placeholder="Write your detailed response here..." rows={7}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none" />
                  <p className="text-xs text-slate-400 mt-1">{wordCount} words</p>
                </div>
              )}

              {/* Essay */}
              {wq?.type === "essay" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-500">Write a full essay response. Minimum {wq.minWords ?? 200} words. Worth {wq.points} marks.</p>
                    <span className={`text-xs font-semibold ${wordCount >= (wq.minWords ?? 200) ? "text-emerald-600" : "text-amber-600"}`}>
                      {wordCount}/{wq.minWords ?? 200} words
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mb-3">
                    <div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (wordCount / (wq.minWords ?? 200)) * 100)}%` }} />
                  </div>
                  <textarea value={String(answers[currentQ.id] ?? "")}
                    onChange={(e) => setAnswers((a) => ({ ...a, [currentQ.id]: e.target.value }))}
                    placeholder="Begin your essay here..." rows={12}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none" />
                  {wq.keyPoints && wq.keyPoints.length > 0 && (
                    <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                      <p className="text-xs font-semibold text-rose-700 mb-1.5">Key points to include:</p>
                      <ul className="space-y-1">
                        {wq.keyPoints.map((kp, i) => (
                          <li key={i} className="text-xs text-rose-600 flex items-start gap-1.5">
                            <span className="mt-0.5 flex-shrink-0">•</span>{kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all whitespace-nowrap">
                ← Previous
              </button>

              {/* Question dots */}
              <div className="flex items-center gap-1 flex-wrap justify-center max-w-sm">
                {questions.map((q, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`w-6 h-6 rounded-md text-xs font-semibold transition-all cursor-pointer ${i === current ? "bg-purple-600 text-white" : answers[questions[i].id] !== undefined ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>

              {current < questions.length - 1 ? (
                <button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap">
                  Next →
                </button>
              ) : (
                <button onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap">
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </main>
        {/* Submit confirm */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-7 max-w-sm w-full text-center">
              <div className="w-12 h-12 mx-auto bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center mb-4">
                <i className="ri-alarm-warning-line text-purple-600 text-xl" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-slate-900 mb-2">Submit Exam?</h3>
              <p className="text-slate-600 text-sm mb-2">
                You have answered <span className="font-bold text-slate-900">{Object.keys(answers).length}</span> of <span className="font-bold">{questions.length}</span> questions.
              </p>
              <p className="text-slate-500 text-xs mb-6">Unanswered questions will score zero.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm cursor-pointer hover:bg-slate-50">Review</button>
                <button onClick={handleSubmitExam} className="flex-1 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-purple-500">Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =============================== REVIEW PHASE ===============================
  if (phase === "review") {
    const reviewQ = questions[current];
    const isWritten = reviewQ?.type !== "mcq";
    const wqR = isWritten ? (reviewQ as WrittenExamQ) : null;
    const mcqR = !isWritten ? (reviewQ as MCQExamQ) : null;

    const earnedOnThis = (() => {
      if (!reviewQ) return 0;
      const ans = answers[reviewQ.id];
      if (reviewQ.type === "mcq") return Number(ans) === (reviewQ as MCQExamQ).correctAnswer ? reviewQ.points : 0;
      return gradeWrittenAnswer(reviewQ.type, String(ans ?? ""), reviewQ.points, (reviewQ as WrittenExamQ).minWords);
    })();

    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <div className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-16 z-30">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-200 rounded-full text-xs text-amber-700 font-semibold">
                  <i className="ri-eye-line" /> Review Mode
                </span>
                <span className="text-xs text-slate-500">Q{current + 1}/{questions.length}</span>
              </div>
              <button onClick={finishReview}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap">
                See Results →
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            {reviewQ && (
              <>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${getTypeBadge(reviewQ.type).cls}`}>
                  {getTypeBadge(reviewQ.type).label} · {reviewQ.points} marks
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-4">
                  <p className="text-base text-slate-900 font-medium leading-relaxed mb-4">{reviewQ.question}</p>

                  {/* MCQ review */}
                  {mcqR && (
                    <div className="space-y-2">
                      {mcqR.options.map((opt, i) => {
                        const userAns = Number(answers[reviewQ.id]);
                        const isCorrect = i === mcqR.correctAnswer;
                        const isUserChoice = i === userAns;
                        let cls = "border-slate-200 bg-white text-slate-600 opacity-50";
                        if (isCorrect) cls = "border-emerald-400 bg-emerald-50 text-slate-900";
                        else if (isUserChoice && !isCorrect) cls = "border-red-400 bg-red-50 text-slate-700";
                        return (
                          <div key={opt} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${cls}`}>
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0">{String.fromCharCode(65+i)}</span>
                            <span className="flex-1">{opt}</span>
                            {isCorrect && <i className="ri-check-line text-emerald-600 text-base" />}
                            {isUserChoice && !isCorrect && <i className="ri-close-line text-red-600 text-base" />}
                          </div>
                        );
                      })}
                      {mcqR.explanation && (
                        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-xl text-sm text-slate-700">
                          <span className="font-semibold text-purple-700">Explanation: </span>{mcqR.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Written review */}
                  {wqR && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-1.5">Your answer:</p>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed min-h-[60px] whitespace-pre-wrap">
                          {String(answers[reviewQ.id] ?? "")}
                          {!answers[reviewQ.id] && <span className="text-slate-400 italic">No answer given</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-700 mb-1.5">Model answer:</p>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                          {wqR.sampleAnswer}
                        </div>
                      </div>
                      {wqR.markingPoints && (
                        <div>
                          <p className="text-xs font-semibold text-slate-600 mb-1.5">Marking points:</p>
                          <ul className="space-y-1">
                            {wqR.markingPoints.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
                        <span className="text-xs text-slate-600">Auto-awarded marks:</span>
                        <span className="font-orbitron font-bold text-sm text-purple-600">{earnedOnThis}/{reviewQ.points}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nav */}
                <div className="flex justify-between">
                  <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
                    className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer whitespace-nowrap">
                    ← Previous
                  </button>
                  {current < questions.length - 1 ? (
                    <button onClick={() => setCurrent((c) => c + 1)}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap">
                      Next Question →
                    </button>
                  ) : (
                    <button onClick={finishReview}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap">
                      View Final Results →
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

      </div>
    );
  }

  // =============================== RESULTS PHASE ===============================
  if (phase === "results") {
    const { earned, total, pct } = calculateResults();
    const grade = pct >= 90 ? "A*" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "U";
    const gradeColor = pct >= 70 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-red-600";
    const gradeRingColor = pct >= 70 ? "border-emerald-300 bg-emerald-50" : pct >= 50 ? "border-amber-300 bg-amber-50" : "border-red-300 bg-red-50";

    const byType = { mcq: { count: 0, earned: 0, total: 0 }, short: { count: 0, earned: 0, total: 0 }, long: { count: 0, earned: 0, total: 0 }, essay: { count: 0, earned: 0, total: 0 } };
    questions.forEach((q) => {
      const ans = answers[q.id];
      const t = q.type as QuestionType;
      byType[t].count += 1;
      byType[t].total += q.points;
      if (t === "mcq") { if (Number(ans) === (q as MCQExamQ).correctAnswer) byType[t].earned += q.points; }
      else { byType[t].earned += gradeWrittenAnswer(t, String(ans ?? ""), q.points, (q as WrittenExamQ).minWords); }
    });

    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
            <div className="text-center mb-10">
              <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-5 font-orbitron font-black text-4xl ${gradeRingColor} ${gradeColor}`}>
                {grade}
              </div>
              <h2 className="font-orbitron font-bold text-2xl text-slate-900 mb-2">Exam Complete</h2>
              <p className="text-slate-600">You scored <span className={`font-bold ${gradeColor}`}>{earned}/{total} marks</span> ({pct}%)</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Score", value: `${earned}/${total}`, color: gradeColor },
                { label: "Percentage", value: `${pct}%`, color: gradeColor },
                { label: "Grade", value: grade, color: gradeColor },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <p className={`font-orbitron font-bold text-xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Performance by type */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
              <h3 className="font-orbitron font-semibold text-sm text-slate-900 mb-4">Performance by Question Type</h3>
              <div className="space-y-3">
                {(["mcq", "short", "long", "essay"] as QuestionType[])
                  .filter((t) => byType[t].count > 0)
                  .map((t) => {
                    const bt = byType[t];
                    const typePct = bt.total > 0 ? Math.round((bt.earned / bt.total) * 100) : 0;
                    const badge = getTypeBadge(t);
                    return (
                      <div key={t}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${badge.cls}`}>{badge.label}</span>
                            <span className="text-xs text-slate-500">{bt.count} questions</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-900">{bt.earned}/{bt.total} marks ({typePct}%)</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${typePct}%` }} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setPhase("setup"); setAnswers({}); setCurrent(0); }}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-semibold cursor-pointer">
                New Exam
              </button>
              <button onClick={() => setPhase("review")}
                className="flex-1 py-3 border border-purple-200 bg-purple-50 rounded-xl text-purple-700 text-sm font-semibold cursor-pointer hover:bg-purple-100">
                Review Answers
              </button>
              <button onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl cursor-pointer font-orbitron">
                Dashboard
              </button>
            </div>
          </div>
        </main>


        {/* Achievement modal */}
        {showAchModal && achievementQueue.length > 0 && (() => {
          const ach = ACHIEVEMENTS.find((a) => a.id === achievementQueue[achIdx]);
          if (!ach) return null;
          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white border border-purple-200 rounded-3xl p-10 max-w-sm w-full text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full mb-4">
                  <i className="ri-trophy-fill text-purple-600 text-xs" />
                  <span className="text-xs text-purple-700 font-semibold">Achievement Unlocked!</span>
                </div>
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-5">
                  <i className={`${ach.icon} text-4xl text-white`} />
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-semibold mb-3 ${RARITY_COLORS[ach.rarity]}`}>{ach.rarity}</div>
                <h2 className="font-orbitron font-bold text-xl text-slate-900 mb-2">{ach.name}</h2>
                <p className="text-slate-600 text-sm mb-5">{ach.description}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl py-2.5 mb-5">
                  <p className="font-orbitron font-bold text-xl text-amber-600">+{ach.xpReward} XP</p>
                </div>
                <button onClick={() => { if (achIdx + 1 < achievementQueue.length) setAchIdx(i => i + 1); else setShowAchModal(false); }}
                  className="w-full py-3 rounded-xl bg-purple-600 text-white text-sm font-bold font-orbitron cursor-pointer whitespace-nowrap">
                  {achIdx + 1 < achievementQueue.length ? "Next →" : "Continue"}
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  return null;
}
