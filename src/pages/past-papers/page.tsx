import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { getPapersForSubject, PAST_PAPERS, type PastPaper, type PastPaperQuestion } from "../../mocks/past-papers";
import { SUBJECTS } from "../../mocks/subjects";
import { markAnswerWithAI } from "../../lib/deepseek";
import { useAuth } from "../../contexts/AuthContext";

type Phase = "select" | "exam" | "marking" | "results";

interface MarkResult {
  questionId: string;
  marks: number;
  maxMarks: number;
  feedback: string;
  improvements: string[];
}

function flattenQuestions(paper: PastPaper): PastPaperQuestion[] {
  return paper.questions;
}

function getTotalMarks(paper: PastPaper): number {
  return paper.questions.reduce((s, q) => s + q.marks, 0);
}

function getTypeLabel(type: string) {
  const map: Record<string, { label: string; color: string }> = {
    short: { label: "Short Answer", color: "bg-purple-50 text-purple-700 border-purple-200" },
    structured: { label: "Structured", color: "bg-amber-50 text-amber-700 border-amber-200" },
    essay: { label: "Extended Response", color: "bg-rose-50 text-rose-700 border-rose-200" },
    calculation: { label: "Calculation", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    mcq: { label: "Multiple Choice", color: "bg-slate-100 text-slate-700 border-slate-200" },
  };
  return map[type] ?? { label: type, color: "bg-slate-100 text-slate-700 border-slate-200" };
}

export default function PastPapersPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { recordStudySession } = useAuth();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const papers = subjectId ? getPapersForSubject(subjectId) : PAST_PAPERS;

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState<MarkResult[]>([]);
  const [isMarking, setIsMarking] = useState(false);
  const [markProgress, setMarkProgress] = useState(0);
  const [error, setError] = useState("");
  const startTime = useRef(Date.now());

  const handleSelectPaper = (paper: PastPaper) => {
    setSelectedPaper(paper);
    setAnswers({});
    setCurrentQ(0);
    setResults([]);
    setError("");
    startTime.current = Date.now();
    setPhase("exam");
  };

  const allQuestions = selectedPaper ? flattenQuestions(selectedPaper) : [];
  const totalMarks = selectedPaper ? getTotalMarks(selectedPaper) : 0;
  const q = allQuestions[currentQ];

  const handleMarkPaper = async () => {
    if (!selectedPaper) return;
    setPhase("marking");
    setIsMarking(true);
    setMarkProgress(0);
    setError("");
    const markResults: MarkResult[] = [];

    for (let i = 0; i < allQuestions.length; i++) {
      const question = allQuestions[i];
      const answer = answers[question.id] ?? "";
      setMarkProgress(Math.round(((i + 1) / allQuestions.length) * 100));
      try {
        const result = await markAnswerWithAI(
          question.question,
          answer,
          question.markScheme,
          question.marks,
          selectedPaper.subjectName
        );
        markResults.push({ questionId: question.id, ...result, maxMarks: question.marks });
      } catch (err) {
        const errMsg = String(err);
        if (errMsg.includes("INVALID_KEY") || errMsg.includes("NO_KEY")) {
          setError("AI marking is temporarily unavailable. Please try again shortly.");
          setIsMarking(false);
          setPhase("exam");
          return;
        }
        markResults.push({ questionId: question.id, marks: 0, maxMarks: question.marks, feedback: "Could not mark this question — AI error. Check your answer against the mark scheme.", improvements: [] });
      }
    }

    const earned = markResults.reduce((s, r) => s + r.marks, 0);
    const minutes = Math.max(1, Math.round((Date.now() - startTime.current) / 60000));
    recordStudySession({ minutes, xp: Math.round(earned * 4) });
    setResults(markResults);
    setIsMarking(false);
    setPhase("results");
  };

  // ── SELECT PAPER ─────────────────────────────────────────────────────────────
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          {/* Header */}
          <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 text-xs text-purple-400/70 mb-4">
                <Link to="/subjects" className="hover:text-purple-300 cursor-pointer">Subjects</Link>
                {subject && (<><i className="ri-arrow-right-s-line" /><Link to={`/subjects/${subjectId}`} className="hover:text-purple-300 cursor-pointer">{subject.name}</Link></>)}
                <i className="ri-arrow-right-s-line" />
                <span className="text-purple-200">Past Papers</span>
              </div>
              <h1 className="font-orbitron font-bold text-2xl text-white mb-1">2025 Past Papers</h1>
              <p className="text-purple-300/70 text-sm">
                {subject ? subject.name : "All Subjects"} — attempt real exam-style questions, then get marked by AI
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
            {papers.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-purple-900/40 border border-purple-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-paper-2-line text-purple-400 text-2xl" />
                </div>
                <p className="text-slate-400 mb-4">No past papers available for this subject yet.</p>
                <Link to="/subjects" className="text-purple-400 hover:text-purple-300 text-sm cursor-pointer">← Back to Subjects</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {papers.map((paper) => (
                  <div key={paper.id} className="bg-white border-2 border-purple-400 rounded-2xl p-6 hover:border-purple-500 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-bold">{paper.year} {paper.session}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">{paper.level}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200">{paper.paperCode}</span>
                        </div>
                        <h2 className="font-orbitron font-bold text-lg text-slate-900 mb-1">{paper.subjectName} — Paper {paper.paperCode.split("/")[1]}</h2>
                        <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                          <span><i className="ri-time-line mr-1" />{paper.duration} minutes</span>
                          <span><i className="ri-check-double-line mr-1" />{paper.totalMarks} marks</span>
                          <span><i className="ri-question-answer-line mr-1" />{paper.questions.length} questions</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {paper.topics.map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-200 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectPaper(paper)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white border border-purple-500 flex-shrink-0"
                      >
                        <div className="w-4 h-4 flex items-center justify-center"><i className="ri-play-fill text-sm" /></div>
                        Start Paper
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!subjectId && (
              <div className="mt-8 p-5 bg-purple-900/30 border border-purple-700/30 rounded-2xl">
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  <strong className="text-purple-300">How it works:</strong> Attempt the questions under timed conditions, then submit your answers. StellaScholars AI acts as your examiner — marking each answer and giving you personalised feedback with mark scheme references.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── MARKING SCREEN ─────────────────────────────────────────────────────────
  if (phase === "marking" && selectedPaper) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center px-6">
          <div className="bg-white border-2 border-purple-400 rounded-2xl p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-purple-100 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i className="ri-robot-2-line text-purple-600 text-3xl" />
            </div>
            <h2 className="font-orbitron font-bold text-xl text-slate-900 mb-2">AI Marking in Progress</h2>
            <p className="text-slate-500 text-sm mb-6">StellaScholars AI is marking your answers as an examiner...</p>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-700"
                style={{ width: `${markProgress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">{markProgress}% complete</p>
          </div>
        </main>
      </div>
    );
  }

  // ── EXAM PHASE ─────────────────────────────────────────────────────────────
  if (phase === "exam" && selectedPaper && q) {
    const typeStyle = getTypeLabel(q.type);
    const answered = Object.keys(answers).filter((k) => (answers[k] ?? "").trim().length > 0).length;
    const wordCount = (answers[q.id] ?? "").trim().split(/\s+/).filter(Boolean).length;

    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {/* Exam header */}
          <div className="bg-purple-950/80 border-b border-purple-700/40 px-6 py-3 sticky top-16 z-30">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold whitespace-nowrap ${typeStyle.color}`}>{typeStyle.label}</span>
                <span className="text-xs text-purple-300">Q{currentQ + 1}/{allQuestions.length}</span>
                <span className="text-xs text-purple-400 font-bold">[{q.marks} marks]</span>
              </div>
              <div className="flex-1 h-1.5 bg-purple-900/60 rounded-full max-w-xs overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / allQuestions.length) * 100}%` }} />
              </div>
              <span className="text-xs text-purple-300 whitespace-nowrap">{answered}/{allQuestions.length} answered</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Question card */}
            <div className="bg-white border-2 border-purple-400 rounded-2xl p-7 mb-5">
              <div className="flex items-start gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-purple-100 border border-purple-300 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-orbitron font-bold text-sm text-purple-700">{q.number}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${typeStyle.color}`}>{typeStyle.label}</span>
                    <span className="text-xs text-slate-400 font-semibold">{q.marks} marks</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-slate-900 text-sm leading-relaxed whitespace-pre-line font-medium">{q.question}</p>
              </div>

              {/* Parts (if structured) */}
              {q.parts && q.parts.length > 0 ? (
                <div className="space-y-5">
                  {q.parts.map((part) => (
                    <div key={part.label} className="border-l-2 border-purple-300 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-orbitron font-bold text-sm text-purple-700">({part.label})</span>
                        <span className="text-xs text-slate-400">{part.marks} mark{part.marks !== 1 ? "s" : ""}</span>
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed mb-3">{part.question}</p>
                      <textarea
                        value={answers[`${q.id}_${part.label}`] ?? ""}
                        onChange={(e) => setAnswers((a) => ({ ...a, [`${q.id}_${part.label}`]: e.target.value }))}
                        placeholder={`Write your answer for part (${part.label}) here...`}
                        rows={part.marks <= 2 ? 3 : part.marks <= 4 ? 5 : 8}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {q.type === "essay" && (
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-500">Extended response required</p>
                      <span className={`text-xs font-semibold ${wordCount >= 150 ? "text-emerald-600" : "text-amber-600"}`}>{wordCount} words</span>
                    </div>
                  )}
                  {q.hint && (
                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                      <i className="ri-lightbulb-line mr-1" /><strong>Hint:</strong> {q.hint}
                    </div>
                  )}
                  <textarea
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    placeholder="Write your answer here..."
                    rows={q.type === "essay" ? 14 : q.type === "short" ? 4 : 7}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-600/40 text-purple-300 hover:text-white hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                <i className="ri-arrow-left-line" /> Previous
              </button>

              {/* Question dots */}
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {allQuestions.map((_, i) => {
                  const hasAns = q.parts
                    ? q.parts.some((p) => (answers[`${allQuestions[i].id}_${p.label}`] ?? "").trim().length > 0)
                    : (answers[allQuestions[i].id] ?? "").trim().length > 0;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentQ(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        i === currentQ
                          ? "bg-purple-600 text-white"
                          : hasAns
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-white/10 text-purple-300 hover:bg-white/20"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {currentQ < allQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ((c) => c + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold cursor-pointer whitespace-nowrap transition-all"
                >
                  Next <i className="ri-arrow-right-line" />
                </button>
              ) : (
                <button
                  onClick={handleMarkPaper}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white text-sm font-bold cursor-pointer whitespace-nowrap transition-all"
                >
                  <div className="w-4 h-4 flex items-center justify-center"><i className="ri-robot-2-line text-sm" /></div>
                  Submit for AI Marking
                </button>
              )}
            </div>

            <p className="text-xs text-purple-500/60 text-center mt-4">
              You can navigate between questions freely before submitting
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── RESULTS PHASE ─────────────────────────────────────────────────────────
  if (phase === "results" && selectedPaper) {
    const earned = results.reduce((s, r) => s + r.marks, 0);
    const pct = totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0;
    const grade = pct >= 90 ? "A*" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "U";
    const gradeColor = pct >= 70 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-red-600";

    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          {/* Header */}
          <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-8">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-300 border border-purple-600/40 font-semibold">StellaScholars AI Marked</span>
                  <span className="text-xs text-purple-400">{selectedPaper.paperCode} · {selectedPaper.year}</span>
                </div>
                <h1 className="font-orbitron font-bold text-xl text-white">{selectedPaper.subjectName} Results</h1>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <div className={`font-orbitron font-black text-4xl ${gradeColor}`}>{grade}</div>
                  <p className="text-xs text-purple-400/80 mt-1">Grade</p>
                </div>
                <div className="text-center">
                  <div className={`font-orbitron font-black text-3xl ${gradeColor}`}>{pct}%</div>
                  <p className="text-xs text-purple-400/80 mt-1">{earned}/{totalMarks} marks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 space-y-5">
            {/* Per-question feedback */}
            {allQuestions.map((question, i) => {
              const result = results.find((r) => r.questionId === question.id);
              if (!result) return null;
              const qPct = result.maxMarks > 0 ? Math.round((result.marks / result.maxMarks) * 100) : 0;
              const qColor = qPct >= 80 ? "border-emerald-400" : qPct >= 50 ? "border-amber-400" : "border-red-400";
              const qBg = qPct >= 80 ? "bg-emerald-50" : qPct >= 50 ? "bg-amber-50" : "bg-red-50";

              return (
                <div key={question.id} className={`bg-white border-2 ${qColor} rounded-2xl overflow-hidden`}>
                  {/* Q header */}
                  <div className={`${qBg} px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 border border-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-orbitron font-bold text-xs text-purple-700">{question.number}</span>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getTypeLabel(question.type).color}`}>{getTypeLabel(question.type).label}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`font-orbitron font-bold text-lg ${qPct >= 80 ? "text-emerald-600" : qPct >= 50 ? "text-amber-600" : "text-red-600"}`}>
                        {result.marks}/{result.maxMarks}
                      </span>
                      <span className="text-sm text-slate-500">marks</span>
                    </div>
                  </div>

                  <div className="px-6 py-5 space-y-4">
                    {/* AI Feedback */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center"><i className="ri-robot-2-line text-purple-600 text-sm" /></div>
                        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Examiner Feedback</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{result.feedback}</p>
                    </div>

                    {/* Improvements */}
                    {result.improvements.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">To improve:</p>
                        <ul className="space-y-1.5">
                          {result.improvements.map((imp, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                              <i className="ri-arrow-right-circle-line text-purple-400 mt-0.5 flex-shrink-0 text-sm" />
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mark scheme toggle */}
                    <details className="cursor-pointer group">
                      <summary className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer list-none flex items-center gap-1.5 transition-colors">
                        <i className="ri-arrow-right-s-line group-open:rotate-90 transition-transform text-sm" />
                        View Mark Scheme
                      </summary>
                      <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{question.markScheme}</p>
                      </div>
                    </details>
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => { setPhase("select"); setSelectedPaper(null); }}
                className="flex-1 py-3 bg-white border-2 border-purple-400 rounded-xl text-purple-700 font-semibold text-sm cursor-pointer hover:bg-purple-50 transition-all whitespace-nowrap"
              >
                Try Another Paper
              </button>
              <Link
                to={subjectId ? `/subjects/${subjectId}` : "/subjects"}
                className="flex-1 py-3 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 rounded-xl text-white font-bold text-sm cursor-pointer text-center transition-all whitespace-nowrap"
              >
                Back to Subject
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
