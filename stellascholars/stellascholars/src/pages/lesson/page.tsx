import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { LESSONS, type InteractiveLesson } from "../../mocks/lessons";
import { SUBTOPIC_LESSONS, type SubtopicLesson } from "../../mocks/subtopic-lessons";
import { SUBJECTS, ALEVEL_SUBJECTS } from "../../mocks/subjects";
import { useAuth } from "../../contexts/AuthContext";

// ─── helpers ────────────────────────────────────────────────────────────────

function getAllSubtopicsForTopic(topicId: string) {
  const all = [...SUBJECTS, ...ALEVEL_SUBJECTS];
  for (const subject of all) {
    const topic = subject.topics.find((t) => t.id === topicId);
    if (topic) return topic.subtopics;
    for (const t of subject.topics) {
      if (t.subtopics.some((s) => s.id === topicId)) return t.subtopics;
    }
  }
  return [];
}

function findSubtopicInfo(lessonId: string) {
  const all = [...SUBJECTS, ...ALEVEL_SUBJECTS];
  for (const subject of all) {
    for (const topic of subject.topics) {
      for (const subtopic of topic.subtopics) {
        if (subtopic.id === lessonId)
          return { subjectId: subject.id, subjectName: subject.name, subjectColor: subject.color, topicId: topic.id, topicName: topic.name, subtopicName: subtopic.name };
      }
      if (topic.id === lessonId)
        return { subjectId: subject.id, subjectName: subject.name, subjectColor: subject.color, topicId: topic.id, topicName: topic.name, subtopicName: topic.name };
    }
  }
  return null;
}

// ─── Shared section / quickcheck renderer ──────────────────────────────────

type SectionType = { title: string; content: string; quickCheck?: { question: string; options: string[]; correct: number; explanation: string } };

interface LessonViewProps {
  title: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  keyPoints: string[];
  sections: SectionType[];
  xpReward: number;
  onFinish: () => void;
}

function LessonView({ title, subjectId, subjectName, topicId, keyPoints, sections, xpReward, onFinish }: LessonViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [notes, setNotes] = useState("");

  const section = sections[currentIdx];
  const hasCheck = !!section?.quickCheck;
  const canProceed = !hasCheck || checkSubmitted;
  const progress = Math.round((completed.size / sections.length) * 100);

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= sections.length) return;
    setCurrentIdx(idx);
    setCheckAnswer(null);
    setCheckSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    const nc = new Set(completed);
    nc.add(currentIdx);
    setCompleted(nc);
    if (currentIdx + 1 < sections.length) {
      goTo(currentIdx + 1);
    } else {
      onFinish();
    }
  };

  if (!section) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Section pills */}
          <div className="flex gap-1.5 flex-wrap">
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => { if (i <= currentIdx || completed.has(i)) goTo(i); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  i === currentIdx ? "bg-purple-600/30 border-purple-500/60 text-purple-300"
                  : completed.has(i) ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-white/4 border-white/10 text-slate-500"
                }`}
              >
                {completed.has(i) && <i className="ri-check-line mr-1 text-xs" />}
                {i + 1}. {s.title}
              </button>
            ))}
          </div>

          {/* Section card */}
          <div className="bg-white border-2 border-purple-400 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 border border-purple-200 flex-shrink-0">
                <span className="font-orbitron font-bold text-xs text-purple-700">{currentIdx + 1}</span>
              </div>
              <h2 className="font-orbitron font-semibold text-lg text-slate-900">{section.title}</h2>
            </div>
            <div className="lesson-content text-slate-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>

          {/* Quick Check */}
          {section.quickCheck && (
            <div className={`bg-white border-2 rounded-2xl p-6 transition-all ${
              checkSubmitted
                ? checkAnswer === section.quickCheck.correct ? "border-emerald-400" : "border-red-400"
                : "border-purple-400"
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={`text-base ${
                    checkSubmitted
                      ? checkAnswer === section.quickCheck.correct ? "ri-checkbox-circle-fill text-emerald-500" : "ri-close-circle-fill text-red-500"
                      : "ri-question-line text-purple-500"
                  }`} />
                </div>
                <h3 className="font-orbitron text-xs font-semibold text-purple-600 uppercase tracking-widest">Quick Check</h3>
                {!checkSubmitted && <span className="ml-auto text-xs text-slate-400 italic">Not graded — just to check your understanding</span>}
              </div>
              <p className="text-sm text-slate-900 font-medium mb-4 leading-relaxed">{section.quickCheck.question}</p>
              <div className="space-y-2.5 mb-4">
                {section.quickCheck.options.map((opt, i) => {
                  let cls = "border-slate-200 bg-white hover:border-purple-300 cursor-pointer text-slate-700";
                  if (checkSubmitted) {
                    if (i === section.quickCheck!.correct) cls = "border-emerald-400 bg-emerald-50 cursor-default text-slate-900";
                    else if (i === checkAnswer) cls = "border-red-400 bg-red-50 cursor-default text-slate-700";
                    else cls = "border-slate-100 bg-white opacity-40 cursor-default text-slate-500";
                  } else if (checkAnswer === i) cls = "border-purple-400 bg-purple-50 cursor-pointer text-slate-900";
                  return (
                    <button
                      key={i}
                      onClick={() => !checkSubmitted && setCheckAnswer(i)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}
                    >
                      <span className="font-semibold text-slate-400 mr-2.5">{String.fromCharCode(65 + i)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {!checkSubmitted ? (
                <button
                  onClick={() => checkAnswer !== null && setCheckSubmitted(true)}
                  disabled={checkAnswer === null}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
                >
                  Check My Answer
                </button>
              ) : (
                <div className={`p-3.5 rounded-xl ${checkAnswer === section.quickCheck.correct ? "bg-emerald-50 border border-emerald-200" : "bg-orange-50 border border-orange-200"}`}>
                  <p className={`text-xs font-semibold mb-1.5 ${checkAnswer === section.quickCheck.correct ? "text-emerald-700" : "text-orange-600"}`}>
                    {checkAnswer === section.quickCheck.correct ? "✓ Spot on! Great work." : "Not quite — here's why:"}
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">{section.quickCheck.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => goTo(currentIdx - 1)}
              disabled={currentIdx === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-700/40 text-purple-300 hover:text-white hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap"
            >
              {currentIdx + 1 === sections.length ? "Finish Lesson" : "Next Section"} <i className="ri-arrow-right-line" />
            </button>
          </div>
          {!canProceed && (
            <p className="text-xs text-purple-500/60 text-center">Answer the quick check above to continue</p>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          {/* Key Points */}
          <div className="bg-white border-2 border-purple-400 rounded-2xl p-5">
            <h3 className="font-orbitron text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Key Points</h3>
            <ul className="space-y-2.5">
              {keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <i className="ri-checkbox-circle-line text-purple-500 text-sm" />
                  </div>
                  <span className="text-xs text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: pt }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div className="bg-white border-2 border-purple-400 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-orbitron text-xs font-semibold text-slate-500 uppercase tracking-widest">Progress</h3>
              <span className="font-orbitron font-bold text-xs text-purple-600">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
            <ul className="space-y-2">
              {sections.map((s, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${
                    completed.has(i) ? "bg-emerald-100 border border-emerald-300"
                    : i === currentIdx ? "bg-purple-100 border border-purple-300"
                    : "bg-slate-100 border border-slate-200"
                  }`}>
                    <i className={`text-xs ${
                      completed.has(i) ? "ri-check-line text-emerald-600"
                      : i === currentIdx ? "ri-circle-fill text-purple-500"
                      : "ri-circle-line text-slate-400"
                    }`} />
                  </div>
                  <span className={`text-xs truncate ${
                    i === currentIdx ? "text-slate-900 font-medium"
                    : completed.has(i) ? "text-emerald-600"
                    : "text-slate-400"
                  }`}>{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="bg-white border-2 border-purple-400 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-sticky-note-line text-amber-500 text-sm" /></div>
              <h3 className="font-orbitron text-xs font-semibold text-slate-700 uppercase tracking-widest">My Notes</h3>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write anything you want to remember..."
              maxLength={500}
              rows={5}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">{notes.length}/500</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/quiz/${topicId}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-600/30 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-question-answer-line text-purple-400" /></div>
              <span className="text-xs text-purple-300 font-semibold text-center">Take Quiz</span>
            </Link>
            <Link
              to={`/past-papers/${subjectId}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-900/20 hover:bg-amber-900/30 border border-amber-600/30 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-file-paper-2-line text-amber-400" /></div>
              <span className="text-xs text-amber-300 font-semibold text-center">Past Papers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Finished screen ────────────────────────────────────────────────────────

function FinishedScreen({ title, subjectId, subjectName, topicId, xpReward, sectionCount }: {
  title: string; subjectId: string; subjectName: string; topicId: string; xpReward: number; sectionCount: number;
}) {
  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 flex items-center justify-center px-6">
        <div className="bg-white border-2 border-purple-400 rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-5">
            <i className="ri-check-double-line text-emerald-600 text-3xl" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl text-slate-900 mb-2">Lesson Complete!</h2>
          <p className="text-slate-500 mb-6 text-sm">You've finished <span className="text-purple-600 font-semibold">{title}</span></p>
          <div className="space-y-2 text-left mb-8">
            {([
              ["XP Earned", `+${xpReward} XP`, "text-amber-600"],
              ["Sections", `${sectionCount} completed`, "text-purple-600"],
              ["Subject", subjectName, "text-slate-700"],
            ] as [string, string, string][]).map(([label, val, color]) => (
              <div key={label} className="flex justify-between text-sm p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-500">{label}</span>
                <span className={`font-semibold ${color}`}>{val}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl mb-6">
            <p className="text-xs text-purple-700 font-semibold mb-1">Ready to test yourself?</p>
            <p className="text-xs text-slate-600">The quiz tests the same concepts — see how much you remembered!</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/quiz/${topicId}`}
              className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              Take the Quiz
            </Link>
            <Link
              to={`/subjects/${subjectId}`}
              className="flex-1 text-center py-3 rounded-xl border border-purple-300 text-purple-700 hover:bg-purple-50 text-sm font-semibold cursor-pointer"
            >
              Back to Subject
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Topic Guide fallback (when no specific lesson content) ─────────────────

function TopicGuideView({ info }: { info: NonNullable<ReturnType<typeof findSubtopicInfo>> }) {
  const subtopics = getAllSubtopicsForTopic(info.topicId);
  const [activeSection, setActiveSection] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="bg-[#08082a] border-b border-purple-700/30 px-6 lg:px-10 py-4 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-purple-400/70 mb-2 flex-wrap">
              <Link to="/subjects" className="hover:text-purple-300 cursor-pointer">Subjects</Link>
              <i className="ri-arrow-right-s-line" />
              <Link to={`/subjects/${info.subjectId}`} className="hover:text-purple-300 cursor-pointer">{info.subjectName}</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-purple-200">{info.topicName}</span>
            </div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h1 className="font-orbitron font-bold text-base text-white">{info.topicName} — Study Guide</h1>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-600/30 text-emerald-300 font-semibold whitespace-nowrap">
                <i className="ri-book-2-line mr-1" />{subtopics.length} Subtopics
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-1.5 flex-wrap">
                {subtopics.map((s, i) => (
                  <button key={s.id} onClick={() => setActiveSection(i)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                      i === activeSection ? "bg-purple-600/30 border-purple-500/60 text-purple-300"
                      : "bg-white/4 border-white/8 text-slate-400 hover:border-white/20 hover:text-slate-300"
                    }`}>
                    {i + 1}. {s.name}
                  </button>
                ))}
              </div>

              {subtopics[activeSection] && (
                <>
                  <div className="bg-white border-2 border-purple-400 rounded-2xl p-7">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 border border-purple-200 flex-shrink-0">
                        <span className="font-orbitron font-bold text-xs text-purple-700">{activeSection + 1}</span>
                      </div>
                      <h2 className="font-orbitron font-semibold text-lg text-slate-900">{subtopics[activeSection].name}</h2>
                    </div>
                    <div className="space-y-4 text-slate-800">
                      <p className="text-sm leading-relaxed">This section covers <strong>{subtopics[activeSection].name}</strong> — part of <strong>{info.topicName}</strong> in {info.subjectName}.</p>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                        <p className="text-xs font-semibold text-purple-700 mb-2 uppercase tracking-wide">How to Study This</p>
                        <p className="text-sm text-slate-700 leading-relaxed">Go through your class notes and textbook for <strong>{subtopics[activeSection].name}</strong>. Focus on key definitions, formulas, and worked examples. Then test yourself using the quiz — trying to recall information is more effective than rereading.</p>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">Exam Tip</p>
                        <p className="text-sm text-slate-700 leading-relaxed">For {info.subjectName} questions on {subtopics[activeSection].name}: read the question carefully, show all working, use correct units, and check your answer makes sense.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button onClick={() => setActiveSection((i) => Math.max(0, i - 1))} disabled={activeSection === 0}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-700/40 text-purple-300 hover:text-white hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap">
                      <i className="ri-arrow-left-line" /> Previous
                    </button>
                    {activeSection < subtopics.length - 1 ? (
                      <button onClick={() => setActiveSection((i) => Math.min(subtopics.length - 1, i + 1))}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-semibold transition-all cursor-pointer text-sm whitespace-nowrap">
                        Next <i className="ri-arrow-right-line" />
                      </button>
                    ) : (
                      <Link to={`/subjects/${info.subjectId}`}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-semibold text-sm whitespace-nowrap cursor-pointer">
                        Done! <i className="ri-check-line" />
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-5">
              <div className="bg-white border-2 border-purple-400 rounded-2xl p-5">
                <h3 className="font-orbitron text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">All Subtopics</h3>
                <ul className="space-y-2">
                  {subtopics.map((s, i) => (
                    <li key={s.id}>
                      <button onClick={() => setActiveSection(i)}
                        className={`w-full flex items-center gap-2.5 text-left text-xs py-1.5 transition-colors cursor-pointer ${
                          i === activeSection ? "text-purple-600 font-semibold" : "text-slate-600 hover:text-purple-500"
                        }`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          i === activeSection ? "bg-purple-100 border border-purple-300" : "bg-slate-100 border border-slate-200"
                        }`}>
                          <i className={`text-xs ${i === activeSection ? "ri-circle-fill text-purple-500" : "ri-circle-line text-slate-400"}`} />
                        </div>
                        {s.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-purple-400 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 flex items-center justify-center"><i className="ri-sticky-note-line text-amber-500 text-sm" /></div>
                  <h3 className="font-orbitron text-xs font-semibold text-slate-700 uppercase tracking-widest">My Notes</h3>
                </div>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type your notes here..."
                  maxLength={500} rows={5}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all resize-none" />
                <p className="text-xs text-slate-400 mt-1">{notes.length}/500</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link to={`/quiz/${info.topicId}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-600/30 transition-all cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center"><i className="ri-question-answer-line text-purple-400" /></div>
                  <span className="text-xs text-purple-300 font-semibold text-center">Take Quiz</span>
                </Link>
                <Link to={`/past-papers/${info.subjectId}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-900/20 hover:bg-amber-900/30 border border-amber-600/30 transition-all cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center"><i className="ri-file-paper-2-line text-amber-400" /></div>
                  <span className="text-xs text-amber-300 font-semibold text-center">Past Papers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user, recordStudySession } = useAuth();
  const startTime = useRef(Date.now());

  const [finished, setFinished] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);

  // Priority: static topic lesson → subtopic lesson → topic guide fallback
  const staticLesson: InteractiveLesson | undefined = LESSONS[lessonId ?? ""];
  const subtopicLesson: SubtopicLesson | undefined = !staticLesson ? SUBTOPIC_LESSONS[lessonId ?? ""] : undefined;
  const subtopicInfo = (!staticLesson && !subtopicLesson) ? findSubtopicInfo(lessonId ?? "") : null;

  const handleFinish = (xpReward: number, title: string) => {
    if (!xpAwarded) {
      const minutesStudied = Math.max(1, Math.round((Date.now() - startTime.current) / 60000));
      recordStudySession({ minutes: minutesStudied, xp: xpReward });
      setXpAwarded(true);
    }
    setFinished(true);
  };

  // ── not found ──
  if (!staticLesson && !subtopicLesson && !subtopicInfo) {
    return (
      <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-file-unknow-line text-4xl text-slate-600 mb-4 block" />
            <p className="text-slate-400">Lesson not found.</p>
            <Link to="/subjects" className="mt-4 inline-block text-purple-400 hover:text-purple-300 text-sm">← Back to Subjects</Link>
          </div>
        </main>
      </div>
    );
  }

  // ── topic guide (no lesson content at all) ──
  if (subtopicInfo && !staticLesson && !subtopicLesson) {
    return <TopicGuideView info={subtopicInfo} />;
  }

  // Resolve data for whichever lesson type we have
  const isStaticLesson = !!staticLesson;
  const lessonData = staticLesson
    ? {
        title: staticLesson.title,
        subjectId: staticLesson.subjectId,
        subjectName: staticLesson.subjectName,
        topicId: staticLesson.topicId,
        keyPoints: staticLesson.keyPoints,
        sections: staticLesson.sections as SectionType[],
        xpReward: staticLesson.xpReward,
        sectionCount: staticLesson.sections.length,
      }
    : (() => {
        const info = findSubtopicInfo(lessonId ?? "");
        const sl = subtopicLesson!;
        return {
          title: `${info?.subtopicName ?? lessonId} — Step-by-Step Lesson`,
          subjectId: info?.subjectId ?? "maths",
          subjectName: info?.subjectName ?? "",
          topicId: info?.topicId ?? lessonId ?? "",
          keyPoints: sl.keyPoints,
          sections: sl.sections as SectionType[],
          xpReward: 25,
          sectionCount: sl.sections.length,
        };
      })();

  // ── finished screen ──
  if (finished) {
    return (
      <FinishedScreen
        title={lessonData.title}
        subjectId={lessonData.subjectId}
        subjectName={lessonData.subjectName}
        topicId={lessonData.topicId}
        xpReward={lessonData.xpReward}
        sectionCount={lessonData.sectionCount}
      />
    );
  }

  // ── lesson ──
  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Sticky header */}
        <div className="bg-[#08082a] border-b border-purple-700/30 px-6 lg:px-10 py-4 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-purple-400/70 mb-2 flex-wrap">
              <Link to="/subjects" className="hover:text-purple-300 cursor-pointer">Subjects</Link>
              <i className="ri-arrow-right-s-line" />
              <Link to={`/subjects/${lessonData.subjectId}`} className="hover:text-purple-300 cursor-pointer">{lessonData.subjectName}</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-purple-200">{lessonData.title}</span>
            </div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h1 className="font-orbitron font-bold text-base text-white">{lessonData.title}</h1>
                <p className="text-xs text-purple-400/70 mt-0.5">
                  <i className="ri-time-line mr-1" />{isStaticLesson ? (staticLesson as InteractiveLesson).estimatedMinutes : subtopicLesson?.estimatedMinutes ?? 15} min &nbsp;·&nbsp;
                  <i className="ri-star-line mr-1 text-amber-400" />+{lessonData.xpReward} XP &nbsp;·&nbsp;
                  {lessonData.sectionCount} sections
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/40 text-purple-300 whitespace-nowrap">
                  <i className="ri-book-open-line mr-1" />Lesson Mode
                </span>
              </div>
            </div>
          </div>
        </div>

        <LessonView
          title={lessonData.title}
          subjectId={lessonData.subjectId}
          subjectName={lessonData.subjectName}
          topicId={lessonData.topicId}
          keyPoints={lessonData.keyPoints}
          sections={lessonData.sections}
          xpReward={lessonData.xpReward}
          onFinish={() => handleFinish(lessonData.xpReward, lessonData.title)}
        />
      </main>
    </div>
  );
}
